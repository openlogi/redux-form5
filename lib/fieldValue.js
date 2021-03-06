'use strict';

exports.__esModule = true;
exports.makeFieldValue = makeFieldValue;
exports.isFieldValue = isFieldValue;
var flag = '_isFieldValue';
var isObject = function isObject(object) {
  return typeof object === 'object';
};

function makeFieldValue(object) {
  if (object && isObject(object)) {
    // This flag has to be enumerable, because otherwise it is not possible
    // to serialize object with this field.
    // The consequence is you lose information that particular field is
    // field or nested group of fields, so you're not able to fetch
    // field value from state when it has been affected in some way
    // by serializing/using immutable and so on.
    // @fixme marking field as leaf should be made in other way
    Object.defineProperty(object, flag, { value: true, enumerable: true });
  }
  return object;
}

function isFieldValue(object) {
  return !!(object && isObject(object) && object[flag]);
}