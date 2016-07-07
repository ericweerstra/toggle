import Controller from 'toggle/Controller';
import Observer from 'conditioner/utils/Observer';

/**
 * Default values for attribute and states.
 * @constant
 */
const ATTRIBUTE = 'data-toggle-active',
      ACTIVE_STATE = 'true',
      INACTIVE_STATE = 'false',
      ACTIVE_EVENT = 'active',
      INACTIVE_EVENT = 'inactive';

/**
 * Class Toggle.
 * @class
 */
class Toggle {

    /**
     * Make a new Toggle.
     * @constructs
     * @param element
     * @param options
     */
    constructor(element, options) {

        this._element = element;
        this._options = options || {};
        this._options.attribute = this._options.attribute || ATTRIBUTE;
        this._options.activeState = this._options.activeState || ACTIVE_STATE;
        this._options.inActiveState = this._options.inActiveState || INACTIVE_STATE;
        this._id = this._element.id;
        this.active = false;

        this._initialize();

    }

    /**
     * Initialize
     * @private
     */
    _initialize() {

        let attr = this._element.getAttribute(this._options.attribute);

        if (!attr) {
            this.attribute = this._options.inActiveState;
        }
        else if (attr === this._options.activeState) {
            this.active = true;
        }

        Controller.register(this);

    }

    switch() {
        !this.active ? this.activate() : this.deactivate();
    }

    /**
     * Activating the toggle by changing the attribute active value.
     * @public
     */
    activate() {
        this.attribute = this._options.activeState;
        this.active = true;
        Observer.publish(this, ACTIVE_EVENT, this);
    }

    /**
     * Deactivating the toggle by changing the attribute inactive value.
     * @public
     */
    deactivate() {
        this.attribute = this._options.inActiveState;
        this.active = false;
        Observer.publish(this, INACTIVE_EVENT, this);
    }

    /**
     * Set te active attribute on the DOM element.
     * @public
     * @param {String} name
     */
    set attribute(name) {
        this._element.setAttribute(this._options.attribute, name);
    }

    /**
     * Expose the id.
     * @public
     */
    get id() {
        return this._id;
    }

    /**
     * Expose the group name.
     * @public
     */
    get group() {
        return this._options.group;
    }

    /**
     * Expose the toggle active event.
     * @public
     */
    get activeEvent() {
        return ACTIVE_EVENT;
    }

    /**
     * Expose the toggle inactive event.
     * @public
     */
    get inActiveEvent() {
        return INACTIVE_EVENT;
    }

    /**
     * Unload and reset everything if conditions no longer apply.
     * @method unload
     * @public
     */
    unload() {

        Controller.unregister(this);
        this._element.removeAttribute(this._options.attribute);

    }

}

export default Toggle;
