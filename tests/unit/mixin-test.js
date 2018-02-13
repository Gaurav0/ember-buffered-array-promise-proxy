import EmberObject from '@ember/object';
import { resolve } from 'rsvp';
import BufferedArrayPromiseMixin from 'ember-buffered-array-promise-proxy/mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | mixin', function(hooks) {
  hooks.beforeEach(function() {
    let BufferedArrayPromise = EmberObject.extend(BufferedArrayPromiseMixin);
    this.subject = BufferedArrayPromise.create({ content: resolve(['A', 'B']) });
  });

  test('You can create and use a buffered array promise from mixin', function(assert) {
    assert.expect(2);

    assert.ok(this.subject, 'created successfully');

    return this.subject.then(buffer => {
      assert.deepEqual(buffer.toArray(), ['A', 'B'], 'used sucessfully');
      return resolve();
    });
  });

  test('You can call discardBufferedChanges directly', function(assert) {
    assert.expect(1);

    return this.subject.discardBufferedChanges().then(() => {
      assert.ok(true, 'calling discardBufferedChanges did not error');
      return resolve();
    });
  });

  test('You can call toArray directly', function(assert) {
    assert.expect(1);

    return this.subject.toArray().then(result => {
      assert.deepEqual(result, ['A', 'B'], 'called toArray() directly');
      return resolve();
    });
  });

  test('You can call objectAt directly', function(assert) {
    assert.expect(1);

    this.subject.objectAt(1).then(result => {
      assert.equal(result, 'B', 'called objectAt() directly');
    });
  });
});
