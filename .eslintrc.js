module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
    parserOptions: {
        parser: "babel-eslint",
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-useless-escape": "off", // 防止 Unnecessary escape character 報錯
        "prettier/prettier": [
            "error",
            {
                useTabs: false,
                tabWidth: 4,
                endOfLine: "auto",
            },
        ],
    },
};
