declare let URLSearchParams: any;
/**
 * basic type
 * null undefined array object string boolean
 * @param value value to be checked
 * @returns boolean
 */
const [isFunction, isNull, isUndefined, isArray, isObject, isBoolean, isString, isSymbol, isURLSearchParams] =
    ['Function', 'Null', 'Undefined', 'Array', 'Object', 'Boolean', 'String', 'Symbol', 'URLSearchParams'].map(type => {
        return (value: any): boolean => {
            return Object.prototype.toString.call(value).indexOf(type) !== -1;
        }
    })

export {
    isArray,
    isBoolean,
    isFunction,
    isNull,
    isObject,
    isString,
    isSymbol,
    isURLSearchParams,
    isUndefined,
};

export default {
    isArray,
    isBoolean,
    isFunction,
    isNull,
    isObject,
    isString,
    isSymbol,
    isURLSearchParams,
    isUndefined,
};