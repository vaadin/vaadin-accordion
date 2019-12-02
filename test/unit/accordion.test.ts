import { expect, fixture, html, nextFrame } from '@vaadin/vaadin-component-dev-dependencies/testing.js';
import { arrowDown } from '@vaadin/vaadin-component-dev-dependencies/keys.js';
import { VaadinAccordion } from '../../src/vaadin-accordion';
import { VaadinAccordionPanel } from '../../src/vaadin-accordion-panel';

const { sinon } = window;

describe('accordion', () => {
  let accordion: VaadinAccordion;
  let items: VaadinAccordionPanel[];

  beforeEach(async () => {
    accordion = await fixture(html`
      <vaadin-accordion>
        <vaadin-accordion-panel>
          <div slot="summary">Panel 1</div>
          <button>Button</button>
        </vaadin-accordion-panel>
        <vaadin-accordion-panel>
          <div slot="summary">Panel 2</div>
          Content 2
        </vaadin-accordion-panel>
        <vaadin-accordion-panel>
          <div slot="summary">Panel 3</div>
          Content 3
        </vaadin-accordion-panel>
      </vaadin-accordion>
    `);

    items = accordion.items;
  });

  function getSummary(idx: number) {
    return accordion.items[idx].shadowRoot!.querySelector('[part="summary"]') as HTMLDivElement;
  }

  describe('custom element definition', () => {
    let tagName: string;

    beforeEach(() => {
      tagName = accordion.tagName.toLowerCase();
    });

    it('should be defined in custom element registry', () => {
      expect(customElements.get(tagName)).to.be.ok;
      expect(accordion instanceof VaadinAccordion).to.be.ok;
    });

    it('should have a valid static "is" getter', () => {
      expect(customElements.get(tagName).is).to.equal(tagName);
    });

    it('should have a valid version number', () => {
      expect(customElements.get(tagName).version).to.match(/^(\d+\.)?(\d+\.)?(\d+)(-(alpha|beta)\d+)?$/);
    });
  });

  describe('focus', () => {
    let summary;

    beforeEach(() => accordion.focus());

    it('should set focus-ring attribute on the panel when moving focus', () => {
      summary = getSummary(0);
      arrowDown(summary);
      expect(accordion.items[1].hasAttribute('focus-ring')).to.be.true;
    });

    it('should not move focus on keydown event from the panel content', () => {
      const spy = sinon.spy(accordion.items[1], 'focus');
      const button = accordion.items[0].querySelector('button') as HTMLButtonElement;
      arrowDown(button);
      expect(spy).to.not.be.called;
    });

    it('should not throw when calling focus before element is attached', () => {
      const focus = () => document.createElement('vaadin-accordion').focus();
      expect(focus()).to.not.throw;
    });
  });

  describe('opened', () => {
    it('should open the first panel by default', () => {
      expect(accordion.opened).to.equal(0);
      expect(items[0].opened).to.be.true;
    });

    it('should update `opened` to new index when other panel is opened', async () => {
      getSummary(1).click();
      await accordion.updateComplete;
      expect(items[1].opened).to.be.true;
      expect(accordion.opened).to.equal(1);
    });

    it('should close currently opened panel when another one is opened', async () => {
      getSummary(1).click();
      await accordion.updateComplete;
      expect(items[1].opened).to.be.true;
      expect(items[0].opened).to.be.false;
    });

    it('should set `opened` to null when the opened panel is closed', async () => {
      getSummary(0).click();
      await accordion.updateComplete;
      expect(items[0].opened).to.be.false;
      expect(accordion.opened).to.equal(null);
    });

    it('should close currently opened panel when `opened` set to null', async () => {
      accordion.opened = null;
      await accordion.updateComplete;
      expect(items[0].opened).to.be.false;
    });

    it('should close currently opened panel when `opened` set to undefined', async () => {
      accordion.opened = undefined;
      await accordion.updateComplete;
      expect(items[0].opened).to.be.false;
    });

    it('should not change opened state if panel has been removed', async () => {
      const panel = accordion.items[1];
      accordion.removeChild(panel);
      await nextFrame();
      panel.opened = true;
      await accordion.updateComplete;
      expect(accordion.opened).to.equal(0);
    });
  });

  describe('a11y', () => {
    it('should pass accessibility test', async () => {
      await expect(accordion).to.be.accessible();
    });
  });
});
