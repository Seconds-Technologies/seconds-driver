function withOpacityValue(variable) {
	return ({ opacityValue }) => {
		if (opacityValue === undefined) {
			return `rgb(var(${variable}))`;
		}
		return `rgb(var(${variable}) / ${opacityValue})`;
	};
}

module.exports = {
	corePlugins: require("tailwind-rn/unsupported-core-plugins"),
	content: ["./App.js", "./app/screens/**/*.{js,jsx}", "./app/components/**/*.{js,jsx}", "./app/containers/**/*.{js,jsx}"],
	theme: {
		extend: {
			opacity: {
				'10': '0.1',
				'20': '0.2',
				'30': '0.3',
				'40': '0.4',
				'60': '0.6',
				'70': '0.7',
				'80': '0.8',
				'90': '0.9',
			},
			colors: {
				primary: `rgb(148, 0, 211)`,
				secondary: `rgb(249 249 249)`,
				new: `rgb(244 67 54)`,
				pending: `rgb(153 51 204)`,
				dispatching: `rgba(255 122 0)`,
				/*dispatching: {
					50: `rgba(255 122 0 0.1)`,
					100: `rgba(255 122 0 0.2)`,
					200: `rgba(255 122 0 0.3)`,
					300: `rgba(255 122 0 0.4)`,
					400: `rgba(255 122 0 0.5)`,
					500: `rgba(255 122 0 0.6)`,
					600: `rgba(255 122 0 0.7)`,
					700: `rgba(255 122 0 0.8)`,
					800: `rgba(255 122 0 0.9)`,
					900: `rgba(255 122 1)`
				},*/
				"en-route": `rgb(66 133 244)`,
				completed: `rgb(0 255 25)`,
				cancelled: `rgb(86 86 86)`,
				danger: `rgb(255, 65, 54)`
			}
		}
	},
	plugins: []
};
