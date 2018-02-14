import { get } from '@ember/object';
import computed from 'ember-macro-helpers/computed';
import BufferedProxy from 'ember-buffered-proxy/proxy';
import BufferedArrayProxy from 'ember-buffered-array-proxy/proxy';
import BufferedArrayPromiseProxy from './proxy';

export function buffered(property) {
  return computed(property, function() {
    let content = get(this, property);
    if (content) {
      return BufferedProxy.create({ content });
    }
  });
}

export function bufferedArray(property) {
  return computed(property, function() {
    let content = get(this, property);
    if (content) {
      return BufferedArrayProxy.create({ content });
    }
  });
}

export function bufferedArrayPromise(property) {
  return computed(property, function() {
    let content = get(this, property);
    if (content) {
      return BufferedArrayPromiseProxy.create({ content });
    }
  });
}
