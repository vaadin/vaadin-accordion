import { html, css } from 'lit-element';
import { VaadinElement } from '@vaadin/element-base/vaadin-element.js';

export class AccordionBase extends VaadinElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }

      :host([hidden]) {
        display: none !important;
      }
    `;
  }

  protected render() {
    return html`
      <slot></slot>
    `;
  }
}
