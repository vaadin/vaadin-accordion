gemini.suite('vaadin-accordion', function(rootSuite) {
  function wait(actions, find) {
    return actions
      .waitForJSCondition(function(window) {
        return window.webComponentsAreReady;
      }, 80000);
  }

  function goToAboutBlank(actions, find) {
    // Firefox stops responding on socket after a test, workaround:
    return actions.executeJS(function(window) {
      window.location.href = 'about:blank'; // just go away, please!
    });
  }

  rootSuite
    .before(wait)
    .after(goToAboutBlank);

  ['lumo', 'material'].forEach(theme => {
    gemini.suite(`details-tests-${theme}`, function(suite) {
      suite
        .setUrl(`/details.html?theme=${theme}`)
        .setCaptureElements('#details-tests')
        .capture(`vaadin-details`);
    });
  });

});
