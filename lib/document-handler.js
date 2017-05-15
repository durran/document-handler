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
   * Intercepts the set calls to the target of the proxy.
   */
  set(target, name, value) {
    if (!target.hasOwnProperty(name)) {
      // If the property does not exist, no state will exist so we create a new
      // one with no original value set. This is because an added element did
      // not previously exist.
      this.states[name] = new PropertyState(PropertyState.ADDED);
    } else {
      if (!this.states.hasOwnProperty(name) && target[name] !== value) {
        // If a state doesn't exist for the property, it simply means it has not
        // been attempted to be modified, so we only add one if the new value
        // is different from the original.
        this.states[name] = new PropertyState(PropertyState.EDITED, target[name]);
      } else {

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
}

module.exports = DocumentHandler;
