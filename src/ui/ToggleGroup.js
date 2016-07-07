import Toggle from 'toggle/Toggle';
import Trigger from 'toggle/Trigger';
import Collapsible from 'ui/Collapsible';

/**
 * Default values for attribute and states.
 * @constant
 */
const TRIGGER_METHOD = 'switch',
      TOGGLE_TYPE = 'Toggle',
      TYPES = {
          Toggle: Toggle,
          Collapsible: Collapsible
      };

/**
 * Class ToggleGroup that handles base functionality for ToggleGroups like Tabs and Accordions.
 * @class
 */
class ToggleGroup {

    /**
     * Make a new ToggleGroup.
     * @constructs
     * @param element
     * @param options
     */
    constructor(element, options) {

        this._element = element;
        this._options = options;

        this._initialize();

    }

    /**
     * Initialize
     * @private
     */
    _initialize() {

        // collect the dom elements and options
        let triggerElements = document.querySelectorAll(this._options.triggerSelector),
            panelElements =  document.querySelectorAll(this._options.panelSelector),
            triggerMethod = this._options.triggerMethod || TRIGGER_METHOD,
            toggleType = this._options.toggleType || TOGGLE_TYPE,
            id = this._element.id || '',
            i = 0, l = triggerElements.length,
            panelElement, triggerElement, panel;

        for (; i < l; i++) {

            panelElement = panelElements[i];
            triggerElement = triggerElements[i];

            // check if the elements are containing ids
            this._checkId(panelElement, 'panel', i);
            this._checkId(triggerElement, 'trigger', i);

            // create instances for triggers and toggles according to the options
            new TYPES[toggleType](panelElement, {"group":id + "-group","attribute":"aria-hidden","activeState":"false","inActiveState":"true"});
            new Trigger(triggerElement, {"targets":panelElement.id,"group":id + "-panel-group","attribute":"aria-selected","method":triggerMethod,"toggle":"true"});

        }

    }

    /**
     * Check if the element contains an id otherwise create and set one.
     * @private
     */
    _checkId(element, addition, index) {

        if (!element.id) {
            element.id = this._element.id + '-' + addition + '-' + index;
        }

    }

}

export default ToggleGroup;
