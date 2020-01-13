[![npm version](https://badgen.net/npm/v/@vaadin/vaadin-accordion)](https://www.npmjs.com/package/@vaadin/vaadin-accordion)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/vaadin/vaadin-accordion)
[![Build Status](https://travis-ci.org/vaadin/vaadin-accordion.svg?branch=master)](https://travis-ci.org/vaadin/vaadin-accordion)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/vaadin/web-components?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Published on Vaadin Directory](https://img.shields.io/badge/Vaadin%20Directory-published-00b4f0.svg)](https://vaadin.com/directory/component/vaadinvaadin-accordion)
[![Stars on vaadin.com/directory](https://img.shields.io/vaadin-directory/stars/vaadinvaadin-accordion.svg)](https://vaadin.com/directory/component/vaadinvaadin-accordion)

# &lt;vaadin-accordion&gt;

[&lt;vaadin-accordion&gt;](https://vaadin.com/components/vaadin-accordion) is a Web Component providing accordion functionality, part of the [Vaadin components](https://vaadin.com/components).

[<img src="https://raw.githubusercontent.com/vaadin/vaadin-accordion/master/screenshot.png" alt="Screenshot of vaadin-accordion" width="900">](https://vaadin.com/components/vaadin-accordion)

## Example Usage

```html
<vaadin-accordion>
  <vaadin-accordion-panel theme="filled">
    <div slot="summary">Accordion Panel 1</div>
    <div>Accordion is a set of expandable sections.</div>
  </vaadin-accordion-panel>
  <vaadin-accordion-panel theme="filled">
    <div slot="summary">Accordion Panel 2</div>
    <div>Only one accordion panel can be opened.</div>
  </vaadin-accordion-panel>
</vaadin-accordion>
```
