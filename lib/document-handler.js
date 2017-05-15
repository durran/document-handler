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
  set(target, name, value, receiever) {
    if (!target.hasOwnProperty(name)) {
      this.states[name] = new PropertyState(PropertyState.ADDED);
    } else {
      this.states[name] = new PropertyState(PropertyState.EDITED, target[name]);
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
