export function comparingByStringField(fieldName) {
    return (o1, o2) => o1[fieldName].localeCompare(o2[fieldName]);
}

export const comparingByLabel = comparingByStringField('label');

export function withStringField(fieldName, fieldValue) {
    return o => o[fieldName] === fieldValue;
}

export function withLabel(label) {
    return withStringField('label', label);
}

export function not(predicate) {
    return o => !predicate(o);
}
