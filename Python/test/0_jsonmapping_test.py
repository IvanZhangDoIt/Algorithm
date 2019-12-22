import json
from src.jsonmapping import rule_converter

def test_rule_converter_1():
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
    assert json.dumps(expected) == json.dumps(output)

def test_rule_converter_2():
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
    output = rule_converter(input, mapping_rules)
    assert json.dumps(expected) == json.dumps(output)