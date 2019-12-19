/*jshint esversion: 6 */

function converter(input, mapping_rules){
    let result = {};
    const splitter = '.';
    for(let key in  mapping_rules){
        let input_attribute = key;
        let output_attribute = mapping_rules[key];
        let value = {};

        console.log("The mapping key value is:");
        console.log(input_attribute, output_attribute);
        
        
        if(input_attribute.indexOf(splitter) == -1) {//not found
            console.log("The input attributes: without comma:",input_attribute);
            value = input[input_attribute];
            console.log("The value get is : " + value);
        }
        else{
            console.log("The input attributes: with comma:",input_attribute);
            let input_attributes_chain = input_attribute.split(splitter);
            obj = input;
            for(const attr of input_attributes_chain){
                obj = obj[attr];
            }
            value = obj;
            console.log("The value get is : " + value);
        }

        if(output_attribute.indexOf(splitter) == -1){
            console.log("The output_attributes: without comma:", output_attribute);
            result[output_attribute] = value;
            console.log("The result is : ", result);
        }
        else{
            console.log("The output_attributes: with comma:", output_attribute);
            let output_attribute_chain = output_attribute.split(splitter);
            obj = value;
            for(const attr of output_attribute_chain.reverse()){
                temp = {};
                temp[attr] = obj;
                obj = temp;
            }
            result = Object.assign(obj,result);
            console.log("The result is : ", result);
        }
    }
    return result;
}

input = {
    'i_a': {
        'i_a_a': 12,
        'i_a_b': 'value of i_a_b'
    },
    'i_b': "abc"
};

mapping_rules = {
    'i_a.i_a_a': 'o_a',
    'i_b': 'o_b.o_b_a'
};

console.log(`The input is: \n`);
console.log(input);

console.log("The mapping rule is: \n");
console.log(mapping_rules);

output = converter(input, mapping_rules);
console.log('The output is: \n');
console.log(JSON.stringify(output));