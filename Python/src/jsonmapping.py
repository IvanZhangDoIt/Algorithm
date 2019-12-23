import json

def rule_converter(input: dict, mapping_rules: dict):
    splitter = '.'
    result = {}
    for (input_attribute, output_attribute) in mapping_rules.items():
        value = 'Not Assigned'
        if(splitter in input_attribute):
            # with splitter, it's a layered value.
            input_attributes_chain = input_attribute.split(splitter)
            obj = input
            # get the deepest attribute
            for attr in input_attributes_chain:
                obj = obj[attr]
            value = obj
        else: 
            # splitter not found, get the value directly
            value = input[input_attribute]
        print("\nThe input value is : {}".format(value))

        if (splitter in output_attribute):
            # with splitter, it's a layered value.
            output_attribute_chain = output_attribute.split(splitter)
            obj = result
            length = len(output_attribute_chain)
            for i in range(length):
                key = output_attribute_chain[i]
                if key not in obj.keys():
                    # key not exist, create a new object or set it to the value as it's in the deepest layer.
                    obj[key] = value if (i==length-1) else {}
                obj = obj[key]
        else:
            # output attribute has no splitter, set the value directly
            result[output_attribute] = value
    return result

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
    output = rule_converter(input, mapping_rules)
    print("Ouput is: \n {}".format(output))