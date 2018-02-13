ember-buffered-array-promise-proxy
==============================================================================

This addon combines the concepts of ember-data's PromiseProxyMixin and PromiseManyArray
with the concepts of ember-buffered-array-proxy to create a promise version of a buffered
array proxy. This is useful when you are dealing with a PromiseManyArray from an async
hasMany relationship.

This addon is currently a work in progress. Please help by contributing.

Installation
------------------------------------------------------------------------------

```
ember install ember-buffered-array-promise-proxy
```

Usage
------------------------------------------------------------------------------

```sh
ember install ember-buffered-array-proxy
```

```js
import BufferedArrayPromiseProxy from 'ember-buffered-array-promise-proxy/proxy';

const content = [ 'A' ];
const promiseArray = BufferedArrayPromiseProxy.create({ content: RSVP.resolve(content) });

promiseArray.then(buffer => {
  buffer.get('firstObject'); // => 'A'
  buffer.addObject('B');

  buffer.objectAt(1); // => 'B'
  buffer.toArray(); // => ['A', 'B']

  buffer.get('hasChanges'); // => true
  buffer.get('changes'); // => (get an object describing the changes) -- { added: ['B'], removed: [] }

  buffer.applyBufferedChanges();

  buffer.toArray(); // => ['A', 'B']
  content.toArray(); // => ['A', 'B']
  buffer.get('hasChanges'); // => false

  buffer.removeObject('A');
  buffer.get('changes'); // => { added: [], removed: ['A'] }
  buffer.hasChanged(); // => true

  buffer.discardBufferedChanges();

  buffer.toArray(); // => ['A', 'B']
  content.toArray(); // => ['A', 'B']
  buffer.hasChanged(); // => false
});
```

You can also use a few of these methods without using `then`:

```js
promiseArray.discardChanges();
promiseArray.discardpromiseArrayedChanges();
promiseArray.objectAt(1);
promiseArray.toArray();
```

Or you can even use this awesome computed property macro:

```js
import { bufferedArrayPromise } from 'ember-buffered-array-promise-proxy/cp-macros';

// ...

bufferedPromisePosts: bufferedArrayPromise('posts')
```


Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd ember-buffered-array-promise-proxy`
* `yarn install`

### Linting

* `yarn lint:js`
* `yarn lint:js --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `yarn test` – Runs `ember try:each` to test your addon against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
