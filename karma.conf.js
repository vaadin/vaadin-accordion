const { createKarmaConfig, merge } = require('@vaadin/vaadin-component-dev-dependencies/karma-config.js');

module.exports = config => {
  config.set(
    merge(createKarmaConfig(), {
      coverageIstanbulReporter: {
        thresholds: {
          global: {
            statements: 100,
            branches: 92,
            functions: 100,
            lines: 100
          }
        }
      }
    })
  );

  return config;
};
