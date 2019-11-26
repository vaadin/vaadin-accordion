import { LitElement } from 'lit-element';
import {
  KeyboardDirectionClass,
  KeyboardDirectionInterface,
  getAvailableIndex,
  isFocusable
} from './keyboard-direction-mixin';
import { SlottedItemsClass, SlottedItemsInterface } from './slotted-items-mixin';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T = object> = new (...args: any[]) => T;

export abstract class RovingTabIndexClass extends LitElement {
  protected _setFocusable?(idx: number): void;

  protected _setTabIndex?(item: HTMLElement): void;
}

export type RovingTabIndexConstructor = Constructor<RovingTabIndexClass>;

export const RovingTabIndexMixin = <
  T extends Constructor<
    KeyboardDirectionClass &
      KeyboardDirectionInterface &
      SlottedItemsClass &
      SlottedItemsInterface &
      RovingTabIndexClass
  >
>(
  base: T
): T & RovingTabIndexConstructor => {
  class RovingTabIndex extends base {
    focus() {
      const first = (this.querySelector('[tabindex="0"]') as HTMLElement) || (this.items.length ? this.items[0] : null);
      if (first) {
        first.focus();
      }
    }

    protected _itemsChanged(items: HTMLElement[], oldItems: HTMLElement[]) {
      super._itemsChanged && super._itemsChanged(items, oldItems); // eslint-disable-line no-unused-expressions

      if (items) {
        const { focused } = this;
        this._setFocusable(focused && this.contains(focused) ? items.indexOf(focused as HTMLElement) : 0);
      }
    }

    protected _setFocusable(idx: number) {
      const index = getAvailableIndex(this.items, idx, 1, isFocusable);
      this._setTabIndex(this.items[index]);
    }

    protected _setTabIndex(item: HTMLElement) {
      this.items.forEach((el: HTMLElement) => {
        // eslint-disable-next-line no-param-reassign
        el.tabIndex = el === item ? 0 : -1;
      });
    }

    protected _focus(item: HTMLElement) {
      super._focus && super._focus(item); // eslint-disable-line no-unused-expressions
      this._setTabIndex(item);
    }
  }

  return RovingTabIndex;
};
