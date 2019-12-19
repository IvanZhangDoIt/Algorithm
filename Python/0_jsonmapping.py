import json

def rule_converter(input: dict, mapping_rules: dict):
    splitter = '.'
    result = {}
    for (input_attribute, output_attribute) in mapping_rules.items():
        value = 'Not Assigned'
        if(splitter in input_attribute):
            input_attributes_chain = input_attribute.split(splitter)
            obj = input
            for attr in input_attributes_chain:
                obj = obj[attr]
            value = obj
        else: 
            value = input[input_attribute]
        print("\nThe input value is : {}".format(value))

        if (splitter in output_attribute):
            output_attribute_chain = output_attribute.split(splitter)
            obj = value
            for attr in output_attribute_chain[::-1]:
                temp = {}
                temp[attr] = obj
                obj = temp.copy()
            result.update(temp)
        else:
            result[output_attribute] = value

        print("input_attribute is {}, output_attribute is {}".format(input_attribute, output_attribute))

    return json.dumps(result, sort_keys=True)

if __name__ == "__main__":
    input = {
        'i_a': {
            'i_a_a': 12,
            'i_a_b': 'value of i_a_b'
        },
        'i_b': "abc",
        'i_c': "value of i_c"
    }
    mapping_rules = {
        'i_a.i_a_a': 'o_a',
        'i_b': 'o_b.o_b_a',
        'i_c': 'o_c'
    }

    print("\nThe input is :\n{}".format(input))
    print("\nThe mapping rule is:\n{}".format(mapping_rules))
    output = rule_converter(input, mapping_rules)
    print("\nThe ouput is :\n{}".format(output))