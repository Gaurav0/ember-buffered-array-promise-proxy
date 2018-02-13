import DS from 'ember-data';

const { PromiseArray, PromiseObject } = DS;

export function promiseArray(promise) {
  return PromiseArray.create({
    promise
  });
}

export function promiseObject(promise) {
  return PromiseObject.create({
    promise
  });
}
