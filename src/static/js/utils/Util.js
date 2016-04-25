
/**
 * General utils.
 * @class
 */
class Util {

    /**
     * Getting an item from a Array if it matches a certain filter.
     * @public
     * @static
     * @param {Array} items
     * @param {Function} filter
     */
    static getItem(items, filter) {
        let i = 0, l = items.length, item;
        for (; i < l; i++) {
            item = items[i];
            if (filter(item)) {
                return item;
            }
        }
    }

    /**
     * Check if a DOM element matches a certain attribute and the attribute value.
     * @public
     * @static
     * @param {String} attribute
     * @param {String} name
     */
    static checkProperty(attribute, name) {
        return function(element) {
            return element[attribute] === name;
        }
    }

    /**
     * Force a reflow
     * @public
     * @static
     * @param {Object} element
     */
    static reflow(element) {
        let reflow = element.offsetHeight;
    }

}

export default Util;
