import { html, css, customElement, property, PropertyValues } from 'lit-element';
import { VaadinElement } from '@vaadin/element-base/vaadin-element.js';
import { KeyboardDirectionMixin, $focus, $isPrev, $isNext, $onKeydown } from './keyboard-direction-mixin';
import { SlottedItemsMixin, $itemsChanged, $filterItems } from './slotted-items-mixin';
import { VaadinAccordionPanel } from './vaadin-accordion-panel';

declare global {
  interface HTMLElementEventMap {
    'opened-changed': CustomEvent;
  }
}

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
export class VaadinAccordion extends KeyboardDirectionMixin(SlottedItemsMixin(VaadinElement)) {
  static is = 'vaadin-accordion';

  static get version() {
    return '1.0.1';
  }

  /**
   * Index of the currently opened panel. First panel is opened by
   * default. Only one panel can be opened at the same time.
   * Setting `null` or `undefined` closes all the accordion panels.
   */
  @property({ type: Number }) opened?: number | null = 0;

  protected _boundOpenedChanged = this._onOpenedChanged.bind(this) as EventListener;

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

  get items(): VaadinAccordionPanel[] {
    return super.items as VaadinAccordionPanel[];
  }

  protected updated(props: PropertyValues) {
    super.updated(props);

    if (props.has('opened') || props.has('_items')) {
      this._updatePanels(this.items, this.opened);
    }

    if (props.has('opened')) {
      this.dispatchEvent(
        new CustomEvent('opened-changed', {
          detail: { value: this.opened }
        })
      );
    }
  }

  [$filterItems]() {
    return Array.from(this.querySelectorAll(VaadinAccordionPanel.is)) as HTMLElement[];
  }

  [$focus](item: HTMLElement) {
    super[$focus](item);
    item.setAttribute('focus-ring', '');
  }

  [$isNext](key: string) {
    return key === 'ArrowDown';
  }

  [$isPrev](key: string) {
    return key === 'ArrowUp';
  }

  [$itemsChanged](panels: HTMLElement[], oldPanels: HTMLElement[]) {
    super[$itemsChanged](panels, oldPanels);

    panels
      .filter(panel => !oldPanels.includes(panel))
      .forEach(panel => {
        panel.addEventListener('opened-changed', this._boundOpenedChanged);
      });

    oldPanels
      .filter(panel => !panels.includes(panel))
      .forEach(panel => {
        panel.removeEventListener('opened-changed', this._boundOpenedChanged);
      });
  }

  [$onKeydown](event: KeyboardEvent) {
    // only check keyboard events on summary, not on the content
    const summary = event.composedPath()[0] as HTMLElement;
    if (summary && summary.getAttribute('part') === 'summary') {
      super[$onKeydown](event);
    }
  }

  private _onOpenedChanged(event: CustomEvent) {
    this._updateOpened(event);
  }

  private _updatePanels(panels: VaadinAccordionPanel[], opened?: number | null) {
    if (panels) {
      const panelToOpen = opened == null ? null : panels[opened];
      panels.forEach(panel => {
        panel.opened = panel === panelToOpen; // eslint-disable-line no-param-reassign
      });
    }
  }

  private _updateOpened(event: CustomEvent) {
    const target = event.composedPath()[0] as VaadinAccordionPanel;
    const panels = this.items;
    const idx = panels.indexOf(target);
    if (event.detail.value) {
      this.opened = idx;

      panels.forEach(panel => {
        if (panel !== target && panel.opened) {
          panel.opened = false; // eslint-disable-line no-param-reassign
        }
      });
    } else if (!panels.some(panel => panel.opened)) {
      this.opened = null;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vaadin-accordion': VaadinAccordion;
  }
}
