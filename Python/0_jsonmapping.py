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
            obj = result
            length = len(output_attribute_chain)
            for i in range(length):
                key = output_attribute_chain[i]
                if key not in obj.keys():
                    obj[key] = value if (i==length-1) else {}
                obj = obj[key]
        else:
            result[output_attribute] = value

        print("input_attribute is {}, output_attribute is {}".format(input_attribute, output_attribute))

    return result

def test(input, mapping_rules, expected):
    print("\nThe input is :\n{}".format(input))
    print("\nThe mapping rule is:\n{}".format(mapping_rules))
    output = rule_converter(input, mapping_rules)
    print("The ouput is : \n{}".format(output))
    print("-------------------------------------------\nTest result is: {} \n -----------------------------------------".format(json.dumps(expected) == json.dumps(output)))

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
    expected =     {
        "o_a": 12,
        "o_b": {
        "o_b_a": "abc"
        },
        "o_c": "value of i_c"
    }
    test(input,mapping_rules, expected)

    input = {
        'i_a': {
            'i_a_a': 'value of i_a_a',
            'i_a_b': 'value of i_a_b',
            'i_a_c': 'value of i_a_c',
        },
        'i_b': 'abc',
        'i_c': 'value of i_c',
        'i_d': 'value of i_d',
    }
    mapping_rules = {
        'i_a.i_a_a': 'o_a.o_a_a',
        'i_a.i_a_b': 'o_a.o_a_b',
        'i_a.i_a_c': 'o_a.o_a_c',
        'i_b': 'o_b',
        'i_c': 'o_c',
        'i_d': 'o_d',
    }
    expected =   {
        "o_a": {
        "o_a_a": "value of i_a_a",
        "o_a_b": "value of i_a_b",
        "o_a_c": "value of i_a_c"
        },
        "o_b": "abc",
        "o_c": "value of i_c",
        "o_d": "value of i_d"
    }
    test(input,mapping_rules, expected)