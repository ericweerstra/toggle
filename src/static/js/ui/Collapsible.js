import Observer from 'conditioner/utils/Observer';
import Toggle from 'toggle/Toggle';

const INIT_SELECTOR = 'collapsible-init',
      INNER_SELECTOR = '.collapsible-inner',
      OPEN_SELECTOR = 'collapsible-open',
      TRANSITION_PROP = 'height',
      TRANSITION_END_EVENT = 'transitionEnd';

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
        this._expanded = false;

        // check for inner element
        let innerElement = this._element.querySelector(INNER_SELECTOR);
        if (!innerElement) {
            return;
        }

        let marginBottom = parseInt(window.getComputedStyle(innerElement, null).getPropertyValue('margin-bottom').replace('px', ''));

        this._height = innerElement.offsetHeight + marginBottom;
        this._toggle = new Toggle(element, options);
        this._windowWidth = window.innerWidth;

        this._onActiveFn = () => this._expand();
        this._onInActiveFn = () => this._collapse();
        this._onResizeFn = () => this._onResize();
        this._transitionEndFn = e => this._onTransitionEnd(e);

        this._initialize();

    }

    /**
     * Initialize
     * @private
     */
    _initialize() {

        // set once
        this._element.style.height = 0;
        this._element.classList.remove(INIT_SELECTOR);

        Observer.subscribe(this._toggle, this._toggle.activeEvent, this._onActiveFn);
        Observer.subscribe(this._toggle, this._toggle.inActiveEvent, this._onInActiveFn);

        if (this._toggle.active) { this._toggle.activate(); }

        // bind listeners
        window.addEventListener('resize', this._onResizeFn);
        this._element.addEventListener(TRANSITION_END_EVENT, this._transitionEndFn);

    }

    /**
     * Check if Toggle is active and either expand or collapse.
     * @private
     */
    _setHeight() {
        !this._expanded ? this._expand() : this._collapse();
    }

    /**
     * Set the style height property with the original height value.
     * @private
     */
    _expand() {
        this._element.style.height = this._height + 'px';
        this._expanded = true;
    }

    /**
     * Set the style height property to zero after reset and reflow.
     * @private
     */
    _collapse() {
        this.reset();
        let reflow = this._element.offsetHeight; // reflow is needed with some css animation or transitions
        this._element.style.height = 0;
        this._expanded = false;
    }

    /**
     * Reset on resize
     * @private
     */
    _onResize() {
        if (window.innerWidth !== this._windowWidth) {
            this.reset();
            this._expanded ? this._expand() : this._collapse();
            this._windowWidth = window.innerWidth;
        }
    }

    /**
     * Handle transition end
     * @private
     */
    _onTransitionEnd(e) {
        if (e.propertyName === TRANSITION_PROP) {
            if (this._toggle.active) {
                this._element.classList.add(OPEN_SELECTOR);
                this._element.style.height = 'auto';
            }
            else {
                Observer.publish(this, TRANSITION_END_EVENT);
            }
        }
    }

    /**
     * Reset method needed for window resizing.
     * @public
     */
    reset() {
        this._element.classList.remove(OPEN_SELECTOR);
        this._element.removeAttribute('style');
        this._height = this._element.offsetHeight;
        this._element.style.height = this._height + 'px';
    }

    /**
     * Expose the transition end event.
     * @public
     */
    get transitionEndEvent() {
        return TRANSITION_END_EVENT;
    }

    /**
     * Unload and reset everything if conditions no longer apply.
     * @method unload
     * @public
     */
    unload() {

        this._toggle.unload();
        this._element.classList.remove(OPEN_SELECTOR);
        this._element.removeAttribute('style');

        Observer.unsubscribe(this._toggle, this._toggle.activeEvent, this._onActiveFn);
        Observer.unsubscribe(this._toggle, this._toggle.inActiveEvent, this._onInActiveFn);

        window.removeEventListener('resize', this._onResizeFn);
        this._element.removeEventListener(TRANSITION_END_EVENT, this._transitionEndFn);

    }

}

export default Collapsible;
