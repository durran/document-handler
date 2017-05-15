const { expect } = require('chai');
const { DocumentHandler, PropertyState } = require('../');

const OLD = 'old name';
const NEW = 'new name';

describe('DocumentHandler', () => {
  describe('#set', () => {
    context('when the property does not yet exist', () => {
      const doc = {};
      const handler = new DocumentHandler();
      const proxy = new Proxy(doc, handler);

      before(() => {
        proxy.name = NEW;
      });

      it('sets the property on the proxy', () => {
        expect(proxy.name).to.equal(NEW);
      });

      it('sets the property on the target', () => {
        expect(doc.name).to.equal(NEW);
      });

      it('flags the property as added', () => {
        expect(handler.states.name.name).to.equal(PropertyState.ADDED);
      });
    });

    context('when the property exists', () => {
      context ('when the value is changed', () => {
        const doc = { name: OLD };
        const handler = new DocumentHandler();
        const proxy = new Proxy(doc, handler);

        before(() => {
          proxy.name = NEW;
        });

        it('sets the property on the proxy', () => {
          expect(proxy.name).to.equal(NEW);
        });

        it('sets the property on the target', () => {
          expect(doc.name).to.equal(NEW);
        });

        it('flags the property as edited', () => {
          expect(handler.states.name.name).to.equal(PropertyState.EDITED);
        });

        it('sets the original value on the state', () => {
          expect(handler.states.name.originalValue).to.equal(OLD);
        });
      });

      context('when the value is not changed', () => {
        const doc = { name: OLD };
        const handler = new DocumentHandler();
        const proxy = new Proxy(doc, handler);

        before(() => {
          proxy.name = OLD;
        });

        it('keeps the value on the proxy', () => {
          expect(proxy.name).to.equal(OLD);
        });

        it('keeps the value on the target', () => {
          expect(doc.name).to.equal(OLD);
        });

        it('does not create a state for the property', () => {
          expect(handler.states.name).to.equal(undefined);
        });
      });

      context('when the value is changed from a new value to the original', () => {
        const doc = { name: OLD };
        const handler = new DocumentHandler();
        const proxy = new Proxy(doc, handler);

        before(() => {
          proxy.name = NEW;
          proxy.name = OLD;
        });

        it('keeps the value on the proxy', () => {
          expect(proxy.name).to.equal(OLD);
        });

        it('keeps the value on the target', () => {
          expect(doc.name).to.equal(OLD);
        });

        it('does not create a state for the property', () => {
          expect(handler.states.name).to.equal(undefined);
        });
      });
    });
  });
});