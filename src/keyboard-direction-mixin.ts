import { LitElement, PropertyValues } from 'lit-element';
import { SlottedItemsInterface } from './slotted-items-mixin';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T = object> = new (...args: any[]) => T;

export const $onKeydown = Symbol('onKeydown');

export const $isPrevKey = Symbol('isPrevKey');

export const $isNextKey = Symbol('isNextKey');

export const $focus = Symbol('focus');

export interface KeyboardDirectionInterface {
  items: HTMLElement[];
  focused: Element | null;
  [$onKeydown](event: KeyboardEvent): void;
  [$isPrevKey](key: string): boolean;
  [$isNextKey](key: string): boolean;
  [$focus](item: HTMLElement): void;
}

export type ItemCondition = (item: Element) => boolean;

export const isFocusable: ItemCondition = (item: Element) =>
  !item.hasAttribute('disabled') && !item.hasAttribute('hidden');

export type KeyboardDirectionConstructor = Constructor<KeyboardDirectionInterface>;

/**
 * Returns index of the next item that satisfies the given condition,
 * based on the index of the current item and a numeric increment.
 *
 * @param {Element[]} items - array of items to iterate over
 * @param {number} index - index of the current item
 * @param {number} increment - numeric increment, can be either 1 or -1
 * @param {ItemCondition} condition - function that accepts item as a parameter
 */
export const getAvailableIndex = (
  items: Element[],
  index: number,
  increment: number,
  condition: ItemCondition
): number => {
  const totalItems = items.length;
  let idx = index;
  for (let i = 0; typeof idx === 'number' && i < totalItems; i += 1, idx += increment || 1) {
    if (idx < 0) {
      idx = totalItems - 1;
    } else if (idx >= totalItems) {
      idx = 0;
    }

    const item = items[idx];
    if (condition(item)) {
      return idx;
    }
  }
  return -1;
};

export const KeyboardDirectionMixin = <T extends Constructor<SlottedItemsInterface & LitElement>>(
  base: T
): KeyboardDirectionConstructor & T => {
  class KeyboardDirection extends base {
    focus() {
      const first = this.items.length ? this.items[0] : null;

      if (first) {
        first.focus();
      }
    }

    get focused() {
      const root = (this.getRootNode() as unknown) as DocumentOrShadowRoot;
      return root ? (root.activeElement as HTMLElement) : null;
    }

    protected firstUpdated(props: PropertyValues) {
      super.firstUpdated(props);

      this.addEventListener('keydown', (event: KeyboardEvent) => {
        this[$onKeydown](event);
      });
    }

    [$onKeydown](event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey) {
        return;
      }

      const { key } = event;
      const { items, focused } = this;
      const currentIdx = items.findIndex(item => focused === item);

      let idx;
      let increment;

      if (this[$isPrevKey](key)) {
        increment = -1;
        idx = currentIdx - 1;
      } else if (this[$isNextKey](key)) {
        increment = 1;
        idx = currentIdx + 1;
      } else if (key === 'Home') {
        increment = 1;
        idx = 0;
      } else if (key === 'End') {
        increment = -1;
        idx = items.length - 1;
      }

      idx = getAvailableIndex(items, idx as number, increment as number, isFocusable);
      if (idx >= 0) {
        event.preventDefault();
        const item = items[idx] as HTMLElement;
        if (item) {
          this[$focus](item);
        }
      }
    }

    [$isPrevKey](key: string) {
      return key === 'ArrowUp' || key === 'ArrowLeft';
    }

    [$isNextKey](key: string) {
      return key === 'ArrowDown' || key === 'ArrowRight';
    }

    [$focus](item: HTMLElement) {
      item.focus();
    }
  }

  return KeyboardDirection;
};
