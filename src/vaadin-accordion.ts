import { customElement } from 'lit-element';
import { AccordionBase } from './vaadin-accordion-base';
import { AccordionMixin } from './vaadin-accordion-mixin';
import './vaadin-accordion-panel';

/**
 * `<vaadin-accordion>` is a Web Component component implementing the accordion widget: a vertically
 * stacked set of expandable panels that wraps several instances of the `<vaadin-accordion-panel>`
 * element.
 *
 * Panel headings function as controls that enable users to open (expand) or hide (collapse) their
 * associated sections of content. The user can toggle panels by mouse click, Enter and Space keys.
 *
 * Only one panel can be opened at a time, opening a new one forces
 * previous panel to close and hide its content.
 *
 * The component supports keyboard navigation and is aligned with the
 * [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/#accordion).
 *
 * @element vaadin-accordion
 *
 * @slot - Slot fot the `<vaadin-accordion-panel>` elements.
 *
 * @fires opened-changed - Fired when the `opened` property changes.
 */
@customElement('vaadin-accordion')
export class VaadinAccordion extends AccordionMixin(AccordionBase) {
  static is = 'vaadin-accordion';

  static get version() {
    return '2.0.0-alpha4';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vaadin-accordion': VaadinAccordion;
  }
}
