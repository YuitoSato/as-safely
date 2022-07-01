const asSafely = <RESULT extends TARGET, TARGET = unknown, OR_ELSE = RESULT, RESULT2 = RESULT>(
  obj: TARGET,
  condition:
    | ((obj: unknown) => obj is RESULT)
    | [(obj: unknown) => obj is RESULT, (obj: unknown) => obj is RESULT2],
  // eslint-disable-next-line no-unused-vars
  orElse?: (obj: TARGET) => OR_ELSE
): RESULT | RESULT2 | OR_ELSE => {
  if (!Array.isArray(condition) && condition(obj)) {
    return obj as RESULT;
  }
  if (Array.isArray(condition) && condition.length > 0 && condition.some((c) => c(obj))) {
    return obj as RESULT | RESULT2;
  }
  if (orElse != null) {
    return orElse(obj);
  }
  throw new Error(
    `type assertion is failed. object type: ${typeof obj}. object keys: ${obj && Object.keys(obj)}`
  );
};

const isString = (obj: unknown): obj is string => typeof obj === 'string';
const isBoolean = (obj: unknown): obj is boolean => typeof obj === 'boolean';
const isNumber = (obj: unknown): obj is number => typeof obj === 'number';
const isSymbol = (obj: unknown): obj is symbol => typeof obj === 'symbol';
const isBigint = (obj: unknown): obj is bigint => typeof obj === 'bigint';
const isUndefined = (obj: unknown): obj is undefined => typeof obj === 'undefined';
const isNull = (obj: unknown): obj is null => obj === null;
const isDate = (obj: unknown): obj is Date => obj instanceof Date && !isNaN(obj.getTime());
const isArray = <ELEMENT = unknown>(elementCondition: (element: unknown) => element is ELEMENT) => {
  return (obj: unknown): obj is ELEMENT[] => Array.isArray(obj) && obj.every(elementCondition);
};

export {
  asSafely,
  isString,
  isBoolean,
  isNumber,
  isSymbol,
  isBigint,
  isUndefined,
  isNull,
  isDate,
  isArray,
};
