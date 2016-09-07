const DOMHelpers = {

	reflow(element) {
		return element.offsetHeight;
	},

	setPrefixedStyle(element, property, value) {
		const prefixes = ['', '-webkit-', '-moz-', '-ms-'];
		prefixes.forEach(prefix => element.style[prefix + property] = value);
	}

};

export default DOMHelpers;