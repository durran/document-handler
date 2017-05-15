## Document Handler

[![Build Status](https://travis-ci.org/durran/document-handler.svg?branch=master)](https://travis-ci.org/durran/document-handler)

A handler for Javascript `Proxy` objects that tracks document modifications,
additions, and deletions.

### Usage

#### Creating The Handler & Proxy

Create a new `DocumentHandler` and use it as the proxy's handler:

```js
const DocumentHandler = require('document-handler');

const obj = { band: 'Aphex Twin', genre: 'Electronic' };
const handler = new DocumentHandler();
const proxy = new Proxy(obj, handler);
```

#### Editing Properties

Setting of properties on the `Proxy` creates a state object for
each edited property:

```js
proxy.band = 'Richard James'
proxy.band // Returns 'Richard James'
obj.band // Returns 'Richard James'
handler.isEdited() // Returns true
handler.states.band.name // Returns DocumentHandler.EDITED
handler.states.band.originalValue // Returns 'Aphex Twin'
```

#### Deleting Properties

Deleting properties from the `Proxy` creates a state object for
each deleted property.

```js
delete proxy.band;
proxy.band // Returns undefined
obj.band // Returns undefined
handler.isEdited() // Returns true
handler.states.band.name // Returns DocumentHandler.DELETED
handler.states.band.originalValue // Returns 'Aphex Twin'
```
