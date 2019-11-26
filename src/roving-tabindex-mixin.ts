import { LitElement } from 'lit-element';
import { KeyboardDirectionInterface, getAvailableIndex, isFocusable, $focus } from './keyboard-direction-mixin';
import { $itemsChanged, SlottedItemsInterface } from './slotted-items-mixin';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T = object> = new (...args: any[]) => T;

const $setFocusable = Symbol('setFocusable');

const $setTabindex = Symbol('setTabindex');

export interface RovingTabindexInterface {
  [$setFocusable](idx: number): void;
  [$setTabindex](item: HTMLElement): void;
}

export type RovingTabindexConstructor = Constructor<RovingTabindexInterface>;

export const RovingTabindexMixin = <
  T extends Constructor<KeyboardDirectionInterface & SlottedItemsInterface & LitElement>
>(
  base: T
): T & RovingTabindexConstructor => {
  class RovingTabindex extends base {
    focus() {
      const first = (this.querySelector('[tabindex="0"]') as HTMLElement) || (this.items.length ? this.items[0] : null);
      if (first) {
        first.focus();
      }
    }

    [$itemsChanged](items: HTMLElement[], oldItems: HTMLElement[]) {
      super[$itemsChanged](items, oldItems);

      if (items) {
        const { focused } = this;
        this[$setFocusable](focused && this.contains(focused) ? items.indexOf(focused as HTMLElement) : 0);
      }
    }

    [$setFocusable](idx: number) {
      const index = getAvailableIndex(this.items, idx, 1, isFocusable);
      this[$setTabindex](this.items[index] || this.items[0]);
    }

    [$setTabindex](item: HTMLElement) {
      this.items.forEach((el: HTMLElement) => {
        // eslint-disable-next-line no-param-reassign
        el.tabIndex = el === item ? 0 : -1;
      });
    }

    [$focus](item: HTMLElement) {
      super[$focus](item);
      this[$setTabindex](item);
    }
  }

  return RovingTabindex;
};
