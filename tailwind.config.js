function withOpacityValue(variable) {
	return ({ opacityValue }) => {
		if (opacityValue === undefined) {
			return `rgb(var(${variable}))`
		}
		return `rgb(var(${variable}) / ${opacityValue})`
	}
}

module.exports = {
	corePlugins: require('tailwind-rn/unsupported-core-plugins'),
	content: [
		'./App.js',
		'./app/screens/**/*.{js,jsx}',
		'./app/components/**/*.{js,jsx}',
	],
	theme: {
		extend: {
			colors: {
				primary: `rgb(148, 0, 211)`,
				secondary: `rgb(249 249 249)`,
				danger: `rgb(255, 65, 54)`
			}
		},
	},
	plugins: [],
}
