const { expect } = require('chai');
const { PropertyState } = require('../../');

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

const itFlagsThePropertyAsAdded = (handler, name) => {
  it('flags the property as added', () => {
    expect(handler.states[name].name).to.equal(PropertyState.ADDED);
  });
};

const itFlagsThePropertyAsDeleted = (handler, name) => {
  it('flags the property as deleted', () => {
    expect(handler.states[name].name).to.equal(PropertyState.DELETED);
  });
};

const itFlagsThePropertyAsEdited = (handler, name) => {
  it('flags the property as edited', () => {
    expect(handler.states[name].name).to.equal(PropertyState.EDITED);
  });
};

module.exports.itFlagsTheDocumentAsEdited = itFlagsTheDocumentAsEdited;
module.exports.itFlagsTheDocumentAsClean = itFlagsTheDocumentAsClean;
module.exports.itFlagsThePropertyAsAdded = itFlagsThePropertyAsAdded;
module.exports.itFlagsThePropertyAsDeleted = itFlagsThePropertyAsDeleted;
module.exports.itFlagsThePropertyAsEdited = itFlagsThePropertyAsEdited;
