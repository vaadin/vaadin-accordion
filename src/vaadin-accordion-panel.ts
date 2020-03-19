import { customElement } from 'lit-element';
import { DetailsMixin } from '@vaadin/vaadin-details/src/vaadin-details-mixin.js';
import { AccordionPanelBase } from './vaadin-accordion-panel-base';

/**
 * The accordion panel element.
 */
@customElement('vaadin-accordion-panel')
export class VaadinAccordionPanel extends DetailsMixin(AccordionPanelBase) {
  static is = 'vaadin-accordion-panel';
}

declare global {
  interface HTMLElementTagNameMap {
    'vaadin-accordion-panel': VaadinAccordionPanel;
  }
}
