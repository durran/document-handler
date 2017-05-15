const PropertyState = require('./property-state');

/**
 * The handler for the proxy.
 */
class DocumentHandler {

  /**
   * Instantiate the handler with empty states.
   */
  constructor() {
    this.states = {};
  }

  /**
   * Intercepts function calls.
   */
  apply(target, thisArg, argumentsList) {

  }

  /**
   * Intercepts the get calls to the target of the proxy.
   */
  get(target, name) {
    return target[name];
  }

  /**
   * Returns whether or not the document has been edited via the handler.
   *
   * @returns {Boolean} If the document is edited.
   */
  isEdited() {
    return Object.keys(this.states).length > 0;
  }

  /**
   * Intercepts the set calls to the target of the proxy.
   *
   * @param {Object} target - The target of the proxy.
   * @param {String} name - The name of the property.
   * @param {Object} value - The value being set on the target.
   */
  set(target, name, value) {
    if (!target.hasOwnProperty(name)) {
      // If the property does not exist, no state will exist so we create a new
      // one with no original value set. This is because an added element did
      // not previously exist.
      this.states[name] = new PropertyState(PropertyState.ADDED);
    } else {
      if (this._isNewEditedState(target, name, value)) {
        // If a state doesn't exist for the property, it simply means it has not
        // been attempted to be modified, so we only add one if the new value
        // is different from the original.
        this.states[name] = new PropertyState(PropertyState.EDITED, target[name]);
      } else if (this._isExistingUnchangedState(name, value)) {
        // If the state exists but the value being set is equal to the original
        // value we can remove the state information, since nothing is changed.
        delete this.states[name];
      }
    }
    return target[name] = value;
  }

  /**
   * Intercepts delete calls to the target of the proxy.
   */
  deleteProperty(target, name) {
    return delete target[name];
  }

  _isNewEditedState(target, name, value) {
    return !this.states.hasOwnProperty(name) && target[name] !== value;
  }

  _isExistingUnchangedState(name, value) {
    return this.states.hasOwnProperty(name) && this.states[name].originalValue === value;
  }
}

module.exports = DocumentHandler;
