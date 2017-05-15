const { expect } = require('chai');
const { DocumentHandler, PropertyState } = require('../');

const OLD = 'old name';
const NEW = 'new name';

describe('DocumentHandler', () => {
  const itFlagsTheDocumentAsEdited = (handler) => {
    it('flags the document as edited', () => {
      expect(handler.isEdited()).to.equal(true);
    });
  };

  const itFlagsTheDocumentAsClean = (handler) => {
    it('flags the document as clean', () => {
      expect(handler.isEdited()).to.equal(false);
    });
  };

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

      itFlagsTheDocumentAsEdited(handler);
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

        itFlagsTheDocumentAsEdited(handler);
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

        itFlagsTheDocumentAsClean(handler);
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

        itFlagsTheDocumentAsClean(handler);
      });
    });
  });
});
