import * as multilineArrays from 'prettier-plugin-multiline-arrays';

export default {
  plugins: [multilineArrays],
  singleQuote: true,
  trailingComma: 'all',
  objectWrap: 'preserve',
  multilineArraysWrapThreshold: 0,
};
