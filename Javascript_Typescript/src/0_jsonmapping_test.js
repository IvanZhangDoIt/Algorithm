/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable camelcase */
/* jshint esversion: 6 */
import {converter} from './index.mjs';

function test(input, mappingRules) {
  console.log('--------------------------------------------');
  console.log(`The input is: \n`);
  console.log(input);
  console.log('--------------------------------------------');

  console.log('The mapping rule is: \n');
  console.log(mappingRules);
  console.log('--------------------------------------------');

  const output = converter(input, mappingRules);
  console.log('--------------------------------------------');
  console.log('The output is: \n');
  console.log(JSON.stringify(output));
}

let input;
let mappingRules;

input = {
  i_a: {
    i_a_a: 'value of i_a_a',
    i_a_b: 'value of i_a_b',
    i_a_c: 'value of i_a_c',
  },
  i_b: 'abc',
  i_c: 'value of i_c',
  i_d: 'value of i_d',
};
// mappingRules = {
//   'i_a.i_a_a': 'o_a',
//   'i_a.i_a_b': 'o_a.o_a_b',
//   'i_a.i_a_c': 'o_a.o_a_c',
//   i_b: 'o_b.o_b_a',
//   i_c: 'o_c',
//   i_d: 'o_d',
// };
mappingRules = {
  'i_a.i_a_a': 'o_a.o_a_a',
  'i_a.i_a_b': 'o_a.o_a_b',
  'i_a.i_a_c': 'o_a.o_a_c',
  i_b: 'o_b',
  i_c: 'o_c',
  i_d: 'o_d',
};
test(input, mappingRules);

// input = {
//   partyName: '1111frfd',
//   logo: '',
//   contact: {
//     firstName: 'Bot',
//     lastName: 'oo',
//     email: 'bot@automatation.com',
//     phoneNumber: '291220029',
//   },
//   postAddress: {
//     streetName: '4 Kearnville',
//     cityName: 'Auckland',
//     countrySubentity: 'Auckland',
//     country: {value: 'AF', label: 'Afghanistan', id: 3},
//     postalZone: '0618',
//   },
//   description_type: {value: 'CARR', label: 'Carriers', id: 3},
// };

// mappingRules = {};

//test(input, mappingRules);
