
import Mixin from '@ember/object/mixin';
import PromiseProxyMixin from '@ember/object/promise-proxy-mixin';
import { get } from '@ember/object';
import { isArray } from '@ember/array';
import { assert } from '@ember/debug';
import { resolve } from 'rsvp';
import BufferedArrayProxy from 'ember-buffered-array-proxy/proxy';
import { promiseArray } from './utils/promises';

let then = function(method) {
  return function() {
    let args = [...arguments];
    return this.then(bufferedArray => {
      return bufferedArray[method](...args);
    });
  };
};

let thenContent = function(method) {
  return function() {
    let args = [...arguments];
    return this.then(bufferedArray => {
      return bufferedArray[method](...args);
    });
  };
};

let promiseAlias = function(property) {
  return function() {
    return this._promise[property](...arguments);
  };
};

export default Mixin.create(PromiseProxyMixin, {

  discardChanges: promiseAlias('discardChanges'),
  discardBufferedChanges: promiseAlias('discardBufferedChanges'),
  toArray: promiseAlias('toArray'),
  objectAt: promiseAlias('objectAt'),

  then: promiseAlias('then'),
  'catch': promiseAlias('catch'),
  'finally': promiseAlias('finally'),
  reason: promiseAlias('reason'),
  isPending: promiseAlias('isPending'),
  isSettled: promiseAlias('isSettled'),
  isRejected: promiseAlias('isRejected'),
  isFulfilled: promiseAlias('isFulfilled'),

  init() {
    this._super(...arguments);

    let content = get(this, 'content') || [];
    let promise;

    if (content.then) {
      promise = content;
    } else {
      promise = resolve(content);
    }

    promise = promise.then(content => {
      assert('promise must return content that is an array or array-like object', isArray(content));

      let bufferedArrayProxy = BufferedArrayProxy.create({ content });

      return bufferedArrayProxy;
    });
    promise = promiseArray(promise);

    promise.discardChanges = promise.discardBufferedChanges = then('discardBufferedChanges').bind(promise);
    promise.toArray = thenContent('toArray').bind(promise);
    promise.objectAt = thenContent('objectAt').bind(promise);

    this._promise = promise;
  }
});
