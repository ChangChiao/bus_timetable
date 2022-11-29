module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
    outputDir: "docs",
    productionSourceMap: false,
    chainWebpack: (config) => {
        config.plugins.delete("optimize-css");
    },
};
