import Observer from 'utils/Observer';

/**
 * Class Controller.
 * @class
 */
class Controller {

    /**
     * Make a new Controller.
     * @constructs
     */
    constructor() {
        this._toggles = [];
        this._groupHandlers = [];
    }

    /**
     * Add the Toggle to the array and subscribe with the Observer for optional group handling
     * @public
     * @param toggle
     */
    register(toggle) {

        this._toggles.push(toggle);

        if (toggle.group) {

            let handleGroupFn = toggle => this._handleGroup(toggle);

            // Subscribe and store the groupHandler in a way we can retrieve it with a toggle reference
            Observer.subscribe(toggle, toggle.activeEvent, handleGroupFn);
            this._groupHandlers[this._toggles.indexOf(toggle)] = handleGroupFn;

        }

    }

	/**
     * Unregister the toggle from the array. Useful for unloading the toggle module.
     * @param toggle
     */
    unregister(toggle) {

        // retrieve index of the given toggle
        let index = this._toggles.indexOf(toggle);

        this._toggles.splice(index, 1);

        if (toggle.group){

            // Retrieve the respective groupHandler function
            let handleGroupFn = this._groupHandlers[index];

            // Unsubscribe and remove the groupHandler
            Observer.unsubscribe(toggle, toggle.activeEvent, handleGroupFn);
            this._groupHandlers.splice(index, 1);

        }

    }

    /**
     * Helper method for exposing Toggles.
     * @public
     * @param {String} targets
     */
    getToggles(targets) {

        if (!targets) { return []; }

        return targets.split(',').map(element => {
            return this._getToggle(element);
        });

    }

    /**
     * Helper method for getting a toggle by id.
     * @private
     * @param {String} element
     */
    _getToggle(element) {
        return this._toggles.find(toggle => toggle.id === element);
    }

    /**
     * If a toggle is a group member deactivate the active toggle within the same group first.
     * @private
     * @param toggle
     */
    _handleGroup(toggle) {
        this._toggles.forEach((item) => {
            if (item !== toggle && item.group === toggle.group && item.active) {
                item.deactivate();
            }
        })
    }

}

// export as a Singleton
export default new Controller();
