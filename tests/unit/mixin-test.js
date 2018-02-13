import EmberObject, { get } from '@ember/object';
import { resolve } from 'rsvp';
import BufferedArrayPromiseMixin from 'ember-buffered-array-promise-proxy/mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | mixin', function() {

  test('You can create and use a buffered array promise from mixin', function (assert) {
    let BufferedArrayPromise = EmberObject.extend(BufferedArrayPromiseMixin);
    let subject = BufferedArrayPromise.create({ content: resolve(['A', 'B']) });
    assert.ok(subject, 'created successfully');

    return subject.then(buffer => {
      assert.deepEqual(get(buffer, 'content').toArray(), ['A', 'B'], 'used sucessfully');
      return resolve();
    });
  });
});
