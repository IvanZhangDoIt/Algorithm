/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable camelcase */
/* jshint esversion: 6 */
import {converter} from '../src/0_jsonmapping';
import {assert} from 'chai';

// const converter = require('../src/0_jsonmapping');
// const assert = require('chai').assert;

describe('Convert Test', function() {
  context('multi layers', function() {
    it('Throw exception', function() {
      const input = {
        i_a: {
          i_a_a: 'value of i_a_a',
          i_a_b: 'value of i_a_b',
          i_a_c: 'value of i_a_c',
        },
        i_b: 'abc',
        i_c: 'value of i_c',
        i_d: 'value of i_d',
      };

      const mappingRules = {
        'i_a.i_a_a': 'o_a',
        'i_a.i_a_b': 'o_a.o_a_b',
        'i_a.i_a_c': 'o_a.o_a_c',
        i_b: 'o_b.o_b_a',
        i_c: 'o_c',
        i_d: 'o_d',
      };

      assert.throws(
        () => converter(input, mappingRules),
        TypeError,
        "Cannot create property 'o_a_b' on string 'value of i_a_a'",
      );
    });

    it('Asymetric two layers 2', function() {
      const input = {
        i_a: {
          i_a_a: 'value of i_a_a',
          i_a_b: 'value of i_a_b',
          i_a_c: 'value of i_a_c',
        },
        i_b: 'abc',
        i_c: 'value of i_c',
        i_d: 'value of i_d',
      };

      const mappingRules = {
        'i_a.i_a_a': 'o_a',
        i_b: 'o_b.o_b_a',
        i_c: 'o_c',
        i_d: 'o_d',
      };

      const expectedResult = {
        o_a: 'value of i_a_a',
        o_b: {
          o_b_a: 'abc',
        },
        o_c: 'value of i_c',
        o_d: 'value of i_d',
      };

      const output = converter(input, mappingRules);
      assert.deepEqual(output, expectedResult);
    });

    it('two layer, multi values1', function() {
      const input = {
        i_a: {
          i_a_a: 'value of i_a_a',
          i_a_b: 'value of i_a_b',
          i_a_c: 'value of i_a_c',
        },
        i_b: 'value of i_b',
        i_c: 'value of i_c',
        i_d: 'value of i_d',
      };

      const mappingRules = {
        'i_a.i_a_a': 'o_a.o_a_a',
        'i_a.i_a_b': 'o_a.o_a_b',
        'i_a.i_a_c': 'o_a.o_a_c',
        i_b: 'o_b',
        i_c: 'o_c',
        i_d: 'o_d',
      };

      const expectedResult = {
        o_a: {
          o_a_a: 'value of i_a_a',
          o_a_b: 'value of i_a_b',
          o_a_c: 'value of i_a_c',
        },
        o_b: 'value of i_b',
        o_c: 'value of i_c',
        o_d: 'value of i_d',
      };
      const output = converter(input, mappingRules);
      assert.deepEqual(output, expectedResult);
    });
  });
});
