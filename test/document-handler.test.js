const { expect } = require('chai');
const SharedExamples = require('./shared/examples');
const DocumentHandler = require('../');

const OLD = 'old name';
const NEW = 'new name';

describe('DocumentHandler', () => {
  describe('#deleteProperty', () => {
    context('when the property exists', () => {
      context('when the property has not been edited', () => {
        const doc = { name: OLD };
        const handler = new DocumentHandler();
        const proxy = new Proxy(doc, handler);

        before(() => {
          delete proxy.name;
        });

        it('deletes the property from the proxy', () => {
          expect(proxy.name).to.equal(undefined);
        });

        it('deletes the property from the target', () => {
          expect(doc.name).to.equal(undefined);
        });

        it('sets the original value on the state', () => {
          expect(handler.states.name.originalValue).to.equal(OLD);
        });

        SharedExamples.itFlagsThePropertyAsDeleted(handler, 'name');
        SharedExamples.itFlagsTheDocumentAsEdited(handler);
      });

      context('when the property has been edited', () => {
        const doc = { name: OLD };
        const handler = new DocumentHandler();
        const proxy = new Proxy(doc, handler);

        before(() => {
          proxy.name = NEW;
          delete proxy.name;
        });

        it('deletes the property from the proxy', () => {
          expect(proxy.name).to.equal(undefined);
        });

        it('deletes the property from the target', () => {
          expect(doc.name).to.equal(undefined);
        });

        it('sets the original value on the state', () => {
          expect(handler.states.name.originalValue).to.equal(OLD);
        });

        SharedExamples.itFlagsThePropertyAsDeleted(handler, 'name');
        SharedExamples.itFlagsTheDocumentAsEdited(handler);
      });
    });
  });

  describe('#isEdited', () => {
    context('when the document has edits', () => {
      const doc = { name: OLD };
      const handler = new DocumentHandler();
      const proxy = new Proxy(doc, handler);

      before(() => {
        delete proxy.name;
      });

      SharedExamples.itFlagsTheDocumentAsEdited(handler);
    });

    context('when the document has no edits', () => {
      const doc = { name: OLD };
      const handler = new DocumentHandler();
      const proxy = new Proxy(doc, handler);

      SharedExamples.itFlagsTheDocumentAsClean(handler);
    });
  });

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

      SharedExamples.itFlagsThePropertyAsAdded(handler, 'name');
      SharedExamples.itFlagsTheDocumentAsEdited(handler);
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

        it('sets the original value on the state', () => {
          expect(handler.states.name.originalValue).to.equal(OLD);
        });

        SharedExamples.itFlagsThePropertyAsEdited(handler, 'name');
        SharedExamples.itFlagsTheDocumentAsEdited(handler);
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

        SharedExamples.itFlagsTheDocumentAsClean(handler);
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

        SharedExamples.itFlagsTheDocumentAsClean(handler);
      });
    });
  });
});
