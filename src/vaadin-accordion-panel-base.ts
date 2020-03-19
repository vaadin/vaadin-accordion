import { VaadinElement } from '@vaadin/element-base/vaadin-element.js';
import { detailsStyles } from '@vaadin/vaadin-details/src/vaadin-details-css.js';

export class AccordionPanelBase extends VaadinElement {
  static get styles() {
    return detailsStyles;
  }
}
