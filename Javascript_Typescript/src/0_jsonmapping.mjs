/* eslint-disable camelcase */
/* jshint esversion: 6 */

/**
 *
 * @param {*} input
 * @param {*} mappingRules
 * @return {*}
 */
export function converter(input, mappingRules) {
  let result = {};
  const splitter = '.';
  for (const key in mappingRules) {
    const inputAttribute = key;
    const outputAttribute = mappingRules[key];
    let value = {};

    if (inputAttribute.indexOf(splitter) === -1) {
      //splitter not found, get the value directly
      value = input[inputAttribute];
    } else {
      //with splitter, it's a layered value.
      const inputAttributesChain = inputAttribute.split(splitter);
      let obj = input;
      //get the deepest attribute
      for (const attr of inputAttributesChain) {
        obj = obj[attr];
      }
      value = obj;
    }


    if (outputAttribute.indexOf(splitter) === -1) {
      //output attribute has no splitter, set the value directly
      result[outputAttribute] = value;
    } else {
      //with splitter, it's a layered value.
      const outputAttributeChain = outputAttribute.split(splitter);
      let obj = result;
      const chainLen = outputAttributeChain.length;
      for (let index = 0; index < chainLen; index++) {
        const keyChain = outputAttributeChain[index];
        if(!Object.keys(obj).includes(keyChain)){
          // key not exist, create a new object or set it to the value as it's in the deepest layer.
          obj[keyChain] = index===chainLen-1 ? value : {};
        }
        obj = obj[keyChain];
      }
    }
  }
  return result;
}
