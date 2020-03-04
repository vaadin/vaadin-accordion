import { LitElement, property, PropertyValues } from 'lit-element';
import { Constructor } from '@vaadin/mixin-utils';
import { KeyboardDirectionMixin } from '@vaadin/keyboard-direction-mixin';
import { KeyboardClass } from '@vaadin/keyboard-mixin/keyboard-class';
import { SlottedItemsMixin, SlottedItemsInterface } from '@vaadin/slotted-items-mixin';
import { VaadinAccordionPanel } from './vaadin-accordion-panel';

declare global {
  interface HTMLElementEventMap {
    'opened-changed': CustomEvent;
  }
}

export interface AccordionInterface {
  opened: number | null | undefined;
}

export type Accordion = Constructor<AccordionInterface & SlottedItemsInterface & KeyboardClass>;

export const AccordionMixin = <T extends Constructor<LitElement & KeyboardClass>>(base: T): T & Accordion => {
  class Accordion extends KeyboardDirectionMixin(SlottedItemsMixin(base)) {
    /**
     * Index of the currently opened panel. First panel is opened by
     * default. Only one panel can be opened at the same time.
     * Setting `null` or `undefined` closes all the accordion panels.
     */
    @property({ type: Number }) opened: number | null | undefined = 0;

    protected _boundOpenedChanged = this._onOpenedChanged.bind(this) as EventListener;

    protected updated(props: PropertyValues) {
      super.updated(props);

      if (props.has('opened') || props.has('items')) {
        this._updatePanels(this.items as VaadinAccordionPanel[], this.opened);
      }

      if (props.has('opened')) {
        this.dispatchEvent(
          new CustomEvent('opened-changed', {
            detail: { value: this.opened }
          })
        );
      }
    }

    protected _filterItems() {
      return Array.from(this.children).filter(
        (node): node is VaadinAccordionPanel => node instanceof VaadinAccordionPanel
      );
    }

    protected get _vertical() {
      return true;
    }

    protected _itemsChanged(panels: VaadinAccordionPanel[], oldPanels: VaadinAccordionPanel[]) {
      super._itemsChanged && super._itemsChanged(panels, oldPanels);

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

    protected _onKeyDown(event: KeyboardEvent) {
      // only check keyboard events on summary, not on the content
      const summary = event.composedPath()[0] as HTMLElement;
      if (summary && summary.getAttribute('part') === 'summary' && super._onKeyDown) {
        super._onKeyDown(event);
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

        panels.forEach((item: HTMLElement) => {
          const panel = item as VaadinAccordionPanel;
          if (panel !== target && panel.opened) {
            panel.opened = false; // eslint-disable-line no-param-reassign
          }
        });
      } else if (!panels.some((panel: HTMLElement) => (panel as VaadinAccordionPanel).opened)) {
        this.opened = null;
      }
    }
  }

  return Accordion;
};
