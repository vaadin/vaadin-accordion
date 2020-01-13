# &lt;vaadin-accordion&gt;

[&lt;vaadin-accordion&gt;](https://vaadin.com/components/vaadin-accordion) is a Web Component implementing the vertically stacked set of expandable panels, part of the [Vaadin components](https://vaadin.com/components).

[Live Demo ↗](https://vaadin.com/components/vaadin-accordion/html-examples)
|
[API documentation ↗](https://vaadin.com/components/vaadin-accordion/html-api)

[![npm version](https://badgen.net/npm/v/@vaadin/vaadin-accordion)](https://www.npmjs.com/package/@vaadin/vaadin-accordion)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/vaadin/vaadin-accordion)
[![Build Status](https://travis-ci.org/vaadin/vaadin-accordion.svg?branch=master)](https://travis-ci.org/vaadin/vaadin-accordion)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/vaadin/web-components?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Published on Vaadin Directory](https://img.shields.io/badge/Vaadin%20Directory-published-00b4f0.svg)](https://vaadin.com/directory/component/vaadinvaadin-accordion)
[![Stars on vaadin.com/directory](https://img.shields.io/vaadin-directory/stars/vaadinvaadin-accordion.svg)](https://vaadin.com/directory/component/vaadinvaadin-accordion)

> ⚠️ This is a pre-release version built with [`LitElement`](https://github.com/Polymer/lit-element), part of the [next generation of Vaadin web components](https://vaadin.com/blog/next-generation-vaadin-components).
>
> Looking for Vaadin 14 compatible version? Please see the following branches:
> - [1.0 branch](https://github.com/vaadin/vaadin-accordion/tree/1.0)
> - [1.1 branch](https://github.com/vaadin/vaadin-accordion/tree/1.1)

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

[<img src="https://raw.githubusercontent.com/vaadin/vaadin-accordion/master/screenshot.png" alt="Screenshot of vaadin-accordion" width="900">](https://vaadin.com/components/vaadin-accordion)


## Installation

Install `vaadin-accordion`:

```sh
npm i @vaadin/vaadin-accordion --save
```

Once installed, import it in your application:

```js
import '@vaadin/vaadin-accordion/vaadin-accordion.js';
```

## Getting started

Vaadin components use the Lumo theme by default.

To use the Material theme, import the correspondent file from the `theme/material` folder.

## Entry points

- The component with the Lumo theme:

  `theme/lumo/vaadin-accordion.js`

- The component with the Material theme:

  `theme/material/vaadin-accordion.js`

- Alias for `theme/lumo/vaadin-accordion.js`:

  `vaadin-accordion.js`


## Running demos and API docs in a browser

1. Fork the `vaadin-accordion` repository and clone it locally.

1. Make sure you have [npm](https://www.npmjs.com/) installed.

1. When in the `vaadin-accordion` directory, run `npm install` to install dependencies.

1. Run `npm start`, browser will automatically open the component API documentation.

## Running tests from the command line

- When in the `vaadin-accordion` directory, run `npm test`

- To debug tests in the browser, run `npm run test:debug`

## Following the coding style

We are using [ESLint](http://eslint.org/) for linting TypeScript code. You can check if your code is following our standards by running `npm run lint`, which will automatically lint all `.ts` files.


## Big Thanks

Cross-browser Testing Platform and Open Source <3 Provided by [Sauce Labs](https://saucelabs.com).


## Contributing

To contribute to the component, please read [the guideline](https://github.com/vaadin/vaadin-core/blob/master/CONTRIBUTING.md) first.


## License

Apache License 2.0

Vaadin collects development time usage statistics to improve this product. For details and to opt-out, see https://github.com/vaadin/vaadin-usage-statistics.
