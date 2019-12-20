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

    console.log('The mapping key value is:');
    console.log(inputAttribute, outputAttribute);

    if (inputAttribute.indexOf(splitter) === -1) {
      // not found
      console.log('The input attributes: without comma:', inputAttribute);
      value = input[inputAttribute];
      console.log('The value get is : ' + value);
    } else {
      console.log('The input attributes: with comma:', inputAttribute);
      const inputAttributesChain = inputAttribute.split(splitter);
      let obj = input;
      for (const attr of inputAttributesChain) {
        obj = obj[attr];
      }
      value = obj;
      console.log('The value get is : ' + value);
    }

    if (outputAttribute.indexOf(splitter) === -1) {
      console.log('The outputAttributes: without comma:', outputAttribute);
      result[outputAttribute] = value;
      console.log('The result is : ', result);
    } else {
      console.log('The outputAttributes: with comma:', outputAttribute);
      const outputAttributeChain = outputAttribute.split(splitter);
      let obj = value;
      for (const attr of outputAttributeChain.reverse()) {
        let temp = {};
        temp[attr] = obj;
        obj = temp;
      }
      result = Object.assign(obj, result);
      console.log('The result is : ', result);
    }
  }
  return result;
}
