## Document Handler

[![Build Status](https://travis-ci.org/durran/document-handler.svg?branch=master)](https://travis-ci.org/durran/document-handler)

A handler for Javascript `Proxy` objects that tracks document modifications,
additions, and deletions.

### Usage

Create a new `DocumentHandler` and use it as the proxy's handler:

```js
const DocumentHandler = require('document-handler');

const obj = { band: 'Aphex Twin', genre: 'Electronic' };
const handler = new DocumentHandler();
const proxy = new Proxy(obj, handler);
```

Setting of properties on the proxy creates a state object for
each edited property:

```js
proxy.band = 'Richard James'
proxy.band // Returns 'Richard James'
obj.band // Returns 'Richard James'
handler.states.band.name // Returns DocumentHandler.EDITED
handler.states.band.originalValue // Returns 'Aphex Twin'
```
