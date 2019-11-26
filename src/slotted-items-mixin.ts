import { LitElement, property, PropertyValues } from 'lit-element';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T = object> = new (...args: any[]) => T;

export interface SlottedItemsInterface {
  items: HTMLElement[];
}

export abstract class SlottedItemsClass extends LitElement {
  protected _itemsChanged?(items: HTMLElement[], oldItems: HTMLElement[]): void;

  protected _filterItems?(): HTMLElement[];
}

export type SlottedItemsConstructor = Constructor<SlottedItemsClass & SlottedItemsInterface>;

export const SlottedItemsMixin = <T extends Constructor<SlottedItemsClass>>(base: T): SlottedItemsConstructor & T => {
  class SlottedItems extends base {
    @property({ attribute: false, hasChanged: () => true })
    protected _items: HTMLElement[] = [];

    get items(): HTMLElement[] {
      return this._items;
    }

    connectedCallback() {
      super.connectedCallback();

      this._items = this._filterItems();
    }

    protected update(props: PropertyValues) {
      if (props.has('_items')) {
        this._itemsChanged(this._items, (props.get('_items') || []) as HTMLElement[]);
      }

      super.update(props);
    }

    protected firstUpdated(props: PropertyValues) {
      super.firstUpdated(props);

      const slot = this.renderRoot.querySelector('slot');
      if (slot) {
        slot.addEventListener('slotchange', () => {
          this._items = this._filterItems();
        });
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected _itemsChanged(items: HTMLElement[], _oldItems: HTMLElement[]) {
      this.dispatchEvent(
        new CustomEvent('items-changed', {
          detail: {
            value: items
          }
        })
      );
    }

    protected _filterItems() {
      return Array.from(this.children) as HTMLElement[];
    }
  }

  return SlottedItems;
};

declare global {
  interface HTMLElementEventMap {
    'items-changed': CustomEvent;
  }
}
