module.exports = {
  webpack: function (config) {
    config.module.rules.forEach(
      (e) =>
        Array.isArray(e.oneOf) &&
        e.oneOf.forEach(
          (e) =>
            Array.isArray(e.use) &&
            e.use.forEach((el) => {
              if (el.loader && el.loader.includes("sass-loader")) {
                // el.options.fdsfsd.fdsfsd = 5;
                el.options.additionalData = `@import "${__dirname.replace(
                  /\\/g,
                  "/"
                )}/src/styles/lib.scss";`;
              }
            })
        )
    );
    return config;
  },
};
