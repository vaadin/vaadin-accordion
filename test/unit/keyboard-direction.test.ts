import { LitElement, customElement } from 'lit-element';
import { expect, fixture, html } from '@vaadin/vaadin-component-dev-dependencies/testing.js';
import {
  arrowDown,
  arrowLeft,
  arrowRight,
  arrowUp,
  end,
  home
} from '@vaadin/vaadin-component-dev-dependencies/keys.js';
import { KeyboardDirectionMixin } from '../../src/keyboard-direction-mixin';
import { SlottedItemsMixin } from '../../src/slotted-items-mixin';

@customElement('kdm-element')
class KdmElement extends KeyboardDirectionMixin(SlottedItemsMixin(LitElement)) {
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

describe('KeyboardDirectionMixin', () => {
  let element: KdmElement;
  let items: HTMLElement[];

  beforeEach(async () => {
    element = await fixture(html`
      <kdm-element>
        <div tabindex="0">Foo</div>
        <div tabindex="0">Bar</div>
        <div disabled tabindex="-1">Bay</div>
        <div tabindex="0">Baz</div>
      </kdm-element>
    `);

    element.focus();
    items = element.items;
  });

  it('should set focused to first item by default', () => {
    expect(element.focused).to.equal(items[0]);
  });

  it('should not move focus when "ctrl" is pressed on "arrow-down" key', () => {
    arrowDown(element, 'ctrl');
    expect(element.focused).to.equal(items[0]);
  });

  it('should not move focus when "meta" is pressed on "arrow-down" key', () => {
    arrowDown(element, 'meta');
    expect(element.focused).to.equal(items[0]);
  });

  it('should move focus to next item on "arrow-down" key', () => {
    arrowDown(element);
    expect(element.focused).to.equal(items[1]);
  });

  it('should move focus to next item on "arrow-right" key', () => {
    arrowRight(element);
    expect(element.focused).to.equal(items[1]);
  });

  it('should move focus to prev item on "arrow-up" key', () => {
    arrowDown(element);
    arrowUp(element);
    expect(element.focused).to.equal(items[0]);
  });

  it('should move focus to prev item on "arrow-left" key', () => {
    arrowRight(element);
    arrowLeft(element);
    expect(element.focused).to.equal(items[0]);
  });

  it('should move focus to last item on "end" keydown', () => {
    end(element);
    expect(element.focused).to.equal(items[3]);
  });

  it('should move focus to the first item on "home" key', () => {
    end(element);
    home(element);
    expect(element.focused).to.equal(items[0]);
  });

  it('should move focus to the first enabled item on "home" key', () => {
    end(element);
    items[0].setAttribute('disabled', '');
    home(element);
    expect(element.focused).to.equal(items[1]);
  });

  it('should move focus to the closest enabled item on "end" key', () => {
    element.items[3].setAttribute('disabled', '');
    end(element);
    expect(element.focused).to.equal(items[1]);
  });

  it('should move focus to the first item on "arrow-down" key on the last item', () => {
    end(element);
    arrowDown(element);
    expect(element.focused).to.equal(items[0]);
  });

  it('should move focus to the last item on "arrow-up" key on the first item', () => {
    arrowUp(element);
    expect(element.focused).to.equal(items[3]);
  });

  it('should ignore and skip items with "disabled" attribute when moving focus', () => {
    arrowDown(element);
    arrowDown(element);
    expect(element.focused).to.equal(items[3]);
  });

  it('should ignore and skip items with "hidden" attribute when moving focus', () => {
    element.items[1].setAttribute('hidden', '');
    arrowDown(element);
    expect(element.focused).to.equal(items[3]);
  });

  it('should not throw when calling focus before element is attached', () => {
    expect(() => {
      document.createElement('rtm-element').focus();
    }).to.not.throw(Error);
  });
});
