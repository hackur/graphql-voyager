import * as _ from 'lodash';

export function stringifyWrappers(wrappers) {
  return _.reduce(wrappers, ([left, right], wrapper) => {
    switch (wrapper) {
      case 'NON_NULL':
        return [left, right + '!'];
      case 'LIST':
        return ['[' + left, right + ']'];
    }
  }, ['', '']);
}

export function buildId(...parts) {
  return parts.join('::');
}

export function extractTypeId(id:string) {
  let [tag, type] = id.split('::');
  return buildId('TYPE', type);
}

export function isSystemType(type) {
  return _.startsWith(type.name, '__');
}

export function isBuiltInScalarType(type) {
  return [
    'Int',
    'Float',
    'String',
    'Boolean',
    'ID'
  ].indexOf(type.name) !== -1;
}

export function isScalarType(type) {
  return (type.kind === 'SCALAR' || type.kind === 'ENUM');
}

export function isInputObjectType(type) {
  return (type.kind === 'INPUT_OBJECT');
}