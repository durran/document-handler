const ADDED = 'added';
const EDITED = 'edited';
const DELETED = 'deleted';

/**
 * Represents the state of a single property in a document.
 */
class PropertyState {

  /**
   * Instantiate the new state.
   *
   * @param {String} state - The current state.
   * @param {Object} originalValue - The original value of the property.
   */
  constructor(name, originalValue) {
    this.name = name;
    this.originalValue = originalValue;
  }
}

module.exports = PropertyState;
module.exports.ADDED = ADDED;
module.exports.EDITED = EDITED;
module.exports.DELETED = DELETED;
