gemini.suite('vaadin-accordion', function(rootSuite) {
  function wait(actions) {
    actions.wait(7000);
  }

  rootSuite
    .before(wait);
  ['lumo', 'material'].forEach(theme => {
    gemini.suite(`accordion-${theme}`, suite => {
      suite
        .setUrl(`accordion.html?theme=${theme}`)
        .setCaptureElements('#accordion-tests')
        .capture(`vaadin-accordion`);
    });

    gemini.suite(`${theme}-theme`, suite => {
      suite
        .setUrl(`${theme}-theme.html`)
        .setCaptureElements('#accordion-tests')
        .capture(`vaadin-accordion`);
    });
  });
});
