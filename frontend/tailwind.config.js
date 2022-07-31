module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#4392F1",
				dark: "#344055",
				grey: {
					100: "#E8ECF1",
					200: "#B8C0D8",
				},
				light: "#ffffff",
				tertiary: "#FE5F55",
			},
			fontFamily: {
				main: ["Nunito"],
			},
			backgroundImage: {
				concert: "url('../public/img/concert-with-filter.jpeg')",
			},
			gridTemplateColumns: {
				autofit: "repeat(auto-fit, 20rem)",
			},
		},
	},
	plugins: [],
};
