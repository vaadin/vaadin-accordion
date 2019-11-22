import { LitElement, customElement } from 'lit-element';
import { expect, fixture, html, nextFrame } from '@vaadin/vaadin-component-dev-dependencies/testing.js';
import { SlottedItemsMixin } from '../../src/slotted-items-mixin';

const { sinon } = window;

@customElement('sim-element')
class SimElement extends SlottedItemsMixin(LitElement) {
  render() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <slot></slot>
    `;
  }
}

describe('SlottedItemsMixin', () => {
  let element: SimElement;

  beforeEach(async () => {
    element = await fixture(html`
      <sim-element>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </sim-element>
    `);
  });

  describe('items', () => {
    it('should set `items` to the array of child nodes', () => {
      expect(element.items).to.be.an('array');
      expect(element.items.length).to.be.equal(3);
    });

    it('should update `items` value when removing nodes', async () => {
      element.removeChild(element.items[2]);
      await element.updateComplete;
      expect(element.items.length).to.be.equal(2);
    });

    it('should update `items` value when adding nodes', async () => {
      const div = document.createElement('div');
      element.appendChild(div);
      await element.updateComplete;
      expect(element.items.length).to.be.equal(4);
    });

    it('should fire `items-changed` event on items change', async () => {
      const spy = sinon.spy();
      element.addEventListener('items-changed', spy);
      const div = document.createElement('div');
      element.appendChild(div);
      await nextFrame();
      expect(spy).to.be.calledOnce;
      expect(spy.firstCall.args[0]).to.be.instanceOf(CustomEvent);
      expect(spy.firstCall.args[0].detail.value).to.deep.equal(element.items);
    });
  });
});
