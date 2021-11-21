module.exports = {
    // mode: "jit",
    // purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: {
                    100: "#EEEAF9",
                    300: "#C6B7EA",
                    400: "#9D83DB",
                    500: "#7550CC",
                    700: "#37206D",
                    900: "#0D081A",
                },
                secondary: {
                    pink: "#FFCCAC",
                    blue: "78CCDE",
                    yellow: "FFF0B7",
                },
                status: {
                    error: "#FB5B44",
                    warning: "#F0873B",
                    success: "#4DF04A",
                },
                grey: {
                    200: "#F5F5F5",
                    300: "#EEEFF1",
                    400: "#CACCD2",
                    500: "#A6AAB4",
                    600: "#6F7585",
                    700: "#545963",
                    800: "#36393F",
                },
                gradients: {
                    100: "#7F56D9",
                    200: "#53389E",
                    400: "#7F56D9",
                    500: "#42307D",
                    800: "#6A45C5",
                    900: "#493289",
                },
                line: "#d0d0d0",
                keyboard: {
                    red: "#FB5B44;",
                    blue: "#448DFB",
                    green: "#59DD86",
                    brown: "#D4A274",
                    orange: "#FB9232",
                    yellow: "#ECC94C",
                    gray: "#6F7585",
                    purple: "#37206D",
                },
                light: "#F5F5F5",
                black: "#0D081A",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
