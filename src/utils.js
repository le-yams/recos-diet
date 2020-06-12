
export function comparingByStringField(fieldName) {
    return (o1, o2) => o1[fieldName].localeCompare(o2[fieldName]);
}

export function comparingByNumberField(fieldName) {
    return (o1, o2) => o1[fieldName] - o2[fieldName];
}

export const comparingByLabel = comparingByStringField('label');

export const comparingByIndex = comparingByNumberField('index');

export function withStringField(fieldName, fieldValue) {
    return o => o[fieldName] === fieldValue;
}

export function withLabel(label) {
    return withStringField('label', label);
}

export function not(predicate) {
    return o => !predicate(o);
}

export function safeArrayConcat(array1, array2) {
    var result;
    if (!array1) {
        result = array2
    } else if (!array2) {
        result = array1
    } else {
        result = array1.concat(array2);
    }
    if (result) {
        return result;
    } else {
        return [];
    }
}