import Controller from 'toggle/Controller';
import Toggle from 'toggle/Toggle';

/**
 * Default values event and method
 * @constant
 */
const EVENT = 'click',
      METHOD = 'switch';


class Trigger {

    /**
     * Make a new Trigger.
     * @constructs
     * @param element
     * @param options
     */
    constructor(element, options) {

        this._element = element;
        this._options = options;
        this._toggle = null;
        this._targets = null;
        this._triggerFn = null;

        this._intitialize();

    }

    /**
     * Initialize
     * @private
     */
    _intitialize() {

        // get optional event and method from options or use default
        let event = this._options.event || EVENT;

        if (this._options.toggle) {
            this._toggle = new Toggle(this._element, this._options);
        }

        // if there is a element bind events
        if (this._element) {
            this._triggerFn = e => this._trigger(e);
            this._element.addEventListener(event, this._triggerFn);
        }

    }

	/**
     * Handles trigger event
     * @param e
     * @private
     */
    _trigger(e) {

        let method = this._options.method || METHOD,
            preventDefault = this._options.preventDefault !== false ? true : this._options.preventDefault;

        if (e.type === 'click' && preventDefault) {
            e.preventDefault();
        }

        if (!this._targets) { this._setTargets(); }
        this._targets.forEach((element, index) => {

            // check if there are multiple methods otherwise use one
            let arr = method.split(','),
                i = arr.length > 1 ? index : 0;

            element[method.split(',')[i]]();

        });

    }

    /**
     * Get the toggle targets
     * @private
     */
    _setTargets() {

        // get targets through controller
        this._targets = Controller.getToggles(this._options.targets);
        if (this._toggle) { this._targets.push(this._toggle); }

    }

    /**
     * Expose targets
     * @public
     */
    getTargets() {
        return this._targets;
    }

    /**
     * Unload and reset everything if conditions no longer apply.
     * @method unload
     * @public
     */
    unload() {

        if (this._options.toggle) {
            this._toggle.unload();
        }

        if (this._element) {
            // get optional event and method from options or use default
            let event = this._options.event || EVENT;

            this._element.removeEventListener(event, this._triggerFn);
        }

    }

}

export default Trigger;
