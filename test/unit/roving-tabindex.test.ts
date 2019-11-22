import { LitElement, customElement } from 'lit-element';
import { expect, fixture, html } from '@vaadin/vaadin-component-dev-dependencies/testing.js';
import {
  arrowDown,
  arrowLeft,
  arrowRight,
  arrowUp,
  end,
  home,
  tab
} from '@vaadin/vaadin-component-dev-dependencies/keys.js';
import { KeyboardDirectionMixin } from '../../src/keyboard-direction-mixin';
import { RovingTabindexMixin } from '../../src/roving-tabindex-mixin';
import { SlottedItemsMixin } from '../../src/slotted-items-mixin';

const { sinon } = window;

@customElement('rtm-element')
class RtmElement extends RovingTabindexMixin(KeyboardDirectionMixin(SlottedItemsMixin(LitElement))) {
  render() {
    return html`
      <style>
        :host {
          display: block;
        }

        div {
          display: flex;
          flex-direction: column;
        }
      </style>
      <div>
        <slot></slot>
      </div>
    `;
  }
}

describe('RovingTabindexMixin', () => {
  let element: RtmElement;
  let items: HTMLElement[];

  const expectTabindex = (order: number[]) => {
    order.forEach((val, idx) => expect(items[idx].tabIndex).to.be.equal(val));
  };

  beforeEach(async () => {
    element = await fixture(html`
      <rtm-element>
        <div>Foo</div>
        <div>Bar</div>
        <div disabled>Bay</div>
        <div>Baz</div>
      </rtm-element>
    `);

    element.focus();
    items = element.items;
  });

  it('should set tabIndex to -1 to all items, except the first one', () => {
    expectTabindex([0, -1, -1, -1]);
  });

  it('should not move tabIndex when "ctrl" is pressed on "arrow-down" key', () => {
    arrowDown(element, 'ctrl');
    expectTabindex([0, -1, -1, -1]);
  });

  it('should not move tabIndex when "meta" is pressed on "arrow-down" key', () => {
    arrowDown(element, 'meta');
    expectTabindex([0, -1, -1, -1]);
  });

  it('should move tabIndex to next item on "arrow-down" key', () => {
    arrowDown(element);
    expectTabindex([-1, 0, -1, -1]);
  });

  it('should move tabIndex to next item on "arrow-right" key', () => {
    arrowRight(element);
    expectTabindex([-1, 0, -1, -1]);
  });

  it('should move tabIndex to prev item on "arrow-up" key', () => {
    arrowDown(element);
    arrowUp(element);
    expectTabindex([0, -1, -1, -1]);
  });

  it('should move tabIndex to prev item on "arrow-left" key', () => {
    arrowRight(element);
    arrowLeft(element);
    expectTabindex([0, -1, -1, -1]);
  });

  it('should move tabIndex to last item on "end" keydown', () => {
    end(element);
    expectTabindex([-1, -1, -1, 0]);
  });

  it('should move tabIndex to the first item on "home" key', () => {
    end(element);
    home(element);
    expectTabindex([0, -1, -1, -1]);
  });

  it('should move tabIndex to the first enabled item on "home" key', () => {
    end(element);
    items[0].setAttribute('disabled', '');
    home(element);
    expectTabindex([-1, 0, -1, -1]);
  });

  it('should move tabIndex to the closest enabled item on "end" key', () => {
    element.items[3].setAttribute('disabled', '');
    end(element);
    expectTabindex([-1, 0, -1, -1]);
  });

  it('should move tabIndex to the first item on "arrow-down" key on the last item', () => {
    end(element);
    arrowDown(element);
    expectTabindex([0, -1, -1, -1]);
  });

  it('should move tabIndex to the last item on "arrow-down" key on the first item', () => {
    arrowUp(element);
    expectTabindex([-1, -1, -1, 0]);
  });

  it('should ignore and skip items with "disabled" attribute when moving tabIndex', () => {
    arrowDown(element);
    arrowDown(element);
    expectTabindex([-1, -1, -1, 0]);
  });

  it('should not throw when calling focus before element is attached', () => {
    expect(() => {
      document.createElement('rtm-element').focus();
    }).to.not.throw(Error);
  });

  it('should re-focus previously focused item when moving focus back', async () => {
    arrowDown(element);
    tab(element);
    const spy = sinon.spy(element.items[1], 'focus');
    element.focus();
    await element.updateComplete;
    expect(spy).to.be.calledOnce;
    expectTabindex([-1, 0, -1, -1]);
  });

  it('should set tabIndex to -1 on the newly added item', async () => {
    const item = document.createElement('div');
    element.appendChild(item);
    await element.updateComplete;
    expect(item.tabIndex).to.equal(-1);
  });
});
