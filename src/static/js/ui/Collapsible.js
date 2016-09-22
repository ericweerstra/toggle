import { reflow, setPrefixedStyle } from 'utils/DOMHelpers';
import Observer from 'utils/Observer';
import Toggle from 'toggle/Toggle';

const TRANSITION_PROP = 'height';
const TRANSITION_END_EVENT = 'transitionend';
const COLLAPSIBLE_MOTION_CLASS = 'collapsible-transition';

/**
 * Class Collapsible.
 * @class
 */
class Collapsible {

    /**
     * Make a new Collapsible.
     * @constructs
     * @param element
     * @param options
     */
	constructor(element, options) {
		
		this._element = element;
		this._options = options || {};
		
		// check for inner element
		this._collapsingElement = this._createCollapsingElement();
		
		this._toggle = new Toggle(element, this._options);
		
		this._initialize();
		
	}

    /**
     * Initialize
     * @private
     */
	_initialize() {
		
		this._expand = this._expand.bind(this);
		this._collapse = this._collapse.bind(this);
		this._onTransitionEnd = this._onTransitionEnd.bind(this);
		
		// bind listeners
		Observer.subscribe(this._toggle, this._toggle.activeEvent, this._expand);
		Observer.subscribe(this._toggle, this._toggle.inActiveEvent, this._collapse);
		this._collapsingElement.addEventListener(TRANSITION_END_EVENT, this._onTransitionEnd);

		this._setHeight(0);

		if (this._toggle.active) {
			this._expand();
		}
		
	}
	
	/**
	 * Setup the containing element, which sets the Collapsible height
	 * @returns {Element} - Returns the newly created wrapper element
	 * @private
	 */
	_createCollapsingElement() {
		
		const collapsingElement = document.createElement('div');
		
		collapsingElement.classList.add(COLLAPSIBLE_MOTION_CLASS);

		this._element.parentNode.insertBefore(collapsingElement, this._element);
		collapsingElement.appendChild(this._element);
		
		return collapsingElement;
		
	}
	
	/**
	 * Check if Toggle is active and either expand or collapse.
	 * @returns {number} - Returns the height the collapsible would have
	 * @private
	 */
	_getHeight() {
		return this._element.offsetHeight;
	}
	
	/**
	 * Set height, while skipping transitions
	 * @param {String} value - the height style value to set the Collapsible to
	 * @private
	 */
	_setHeight(value) {

		// Disable transitions
		setPrefixedStyle(this._collapsingElement, 'transition', 'none');

		// Set height
		this._collapsingElement.style.height = value;
		reflow(this._collapsingElement);

		// Enable transitions
		setPrefixedStyle(this._collapsingElement, 'transition', '');
		
	}
	
	/**
	 * Set the height to the amount of pixels, or directly set it to auto when transitionend event is unsupported
	 * @private
	 */
	_expand() {
		this._collapsingElement.style.height = this._getHeight() + 'px';
	}
	
	/**
	 * Get the height and transition this height to 0
	 * @private
	 */
	_collapse() {
		this._setHeight(this._getHeight() + 'px');
		this._collapsingElement.style.height = 0;
	}
	
	/**
	 * Set height to auto when the transition has ended, to make sure the Collapsible stays as responsvie as possible
	 * @param {Event} e - Event object
	 * @private
	 */
	_onTransitionEnd(e) {

		if (e.propertyName === TRANSITION_PROP && this._toggle.active) {
			this._setHeight('auto');
		}

	}
	
	/**
	 * Unload and reset everything if conditions no longer apply.
	 */
	unload() {

		this._element.removeAttribute('style');

		Observer.unsubscribe(this._toggle, this._toggle.activeEvent, this._expand);
		Observer.unsubscribe(this._toggle, this._toggle.inActiveEvent, this._collapse);

		this._toggle.unload();
		this._collapsingElement.parentNode.insertBefore(this._element, this._collapsingElement);
		this._collapsingElement.parentNode.removeChild(this._collapsingElement);

		this._element.removeEventListener(TRANSITION_END_EVENT, this._onTransitionEnd);

	}

}

export default Collapsible;