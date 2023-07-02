const withPlugins = require("next-compose-plugins");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

const config = {
    trailingSlash: true,
    output: "export",
};

module.exports = withPlugins([[withBundleAnalyzer]], config);
