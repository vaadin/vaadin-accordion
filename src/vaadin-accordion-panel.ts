import { customElement } from 'lit-element';
import { VaadinAccordionPanelBase } from './vaadin-accordion-panel-base';

/**
 * The accordion panel element.
 */
@customElement('vaadin-accordion-panel')
export class VaadinAccordionPanel extends VaadinAccordionPanelBase {
  static is = 'vaadin-accordion-panel';
}

declare global {
  interface HTMLElementTagNameMap {
    'vaadin-accordion-panel': VaadinAccordionPanel;
  }
}
