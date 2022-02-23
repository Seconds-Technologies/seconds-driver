module.exports = {
	corePlugins: require("tailwind-rn/unsupported-core-plugins"),
	content: ["./App.js", "./app/screens/**/*.{js,jsx}", "./app/components/**/*.{js,jsx}", "./app/containers/**/*.{js,jsx}"],
	theme: {
		extend: {
			opacity: {
				10: "0.1",
				20: "0.2",
				30: "0.3",
				40: "0.4",
				60: "0.6",
				70: "0.7",
				80: "0.8",
				90: "0.9"
			},
			colors: {
				primary: `rgb(148, 0, 211)`,
				secondary: `rgb(249 249 249)`,
				danger: `rgb(255, 65, 54)`,
				new: {
					DEFAULT: `rgb(244, 67, 54)`,
					50: "#FEE6E4",
					100: "#FCD4D1",
					200: "#FAB0AA",
					300: "#F88B83",
					400: "#F6675D",
					500: "#F44336",
					600: "#E51B0D",
					700: "#B0150A",
					800: "#7B0F07",
					900: "#460804"
				},
				pending: {
					DEFAULT: `rgb(153 51 204)`,
					50: "#E2C6F1",
					100: "#DAB6ED",
					200: "#CA95E4",
					300: "#BA74DC",
					400: "#A954D4",
					500: "#9933CC",
					600: "#77289F",
					700: "#561D72",
					800: "#341145",
					900: "#120618"
				},
				dispatching: {
					DEFAULT: `rgba(255 122 0)`,
					50: "#FFDAB8",
					100: "#FFCFA3",
					200: "#FFBA7A",
					300: "#FFA552",
					400: "#FF8F29",
					500: "#FF7A00",
					600: "#C75F00",
					700: "#8F4400",
					800: "#572900",
					900: "#1F0F00"
				},
				"en-route": {
					DEFAULT: `rgb(66 133 244)`,
					50: "#F0F5FE",
					100: "#DCE9FD",
					200: "#B6D0FB",
					300: "#8FB7F8",
					400: "#699EF6",
					500: "#4285F4",
					600: "#0E63F0",
					700: "#0B4DBB",
					800: "#083786",
					900: "#052151"
				},
				completed: {
					DEFAULT: `rgb(0, 255 25)`,
					50: "#B8FFBF",
					100: "#A3FFAC",
					200: "#7AFF87",
					300: "#52FF63",
					400: "#29FF3E",
					500: "#00FF19",
					600: "#00C714",
					700: "#008F0E",
					800: "#005709",
					900: "#001F03"
				},
				cancelled: {
					DEFAULT: `rgb(86 86 86)`,
					50: "#B2B2B2",
					100: "#A8A8A8",
					200: "#939393",
					300: "#7F7F7F",
					400: "#6A6A6A",
					500: "#565656",
					600: "#3A3A3A",
					700: "#1E1E1E",
					800: "#020202",
					900: "#000000"
				}
			}
		}
	},
	plugins: []
};
