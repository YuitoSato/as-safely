const asSafely = <RESULT extends TARGET, TARGET = unknown, OR_ELSE = RESULT>(
  obj: TARGET,
  condition: (obj: unknown) => obj is RESULT,
  orElse?: (obj: TARGET) => OR_ELSE
): RESULT | OR_ELSE => {
  if (condition(obj)) {
    return obj;
  }
  if (orElse != null) {
    return orElse(obj);
  }
  throw new Error(
    `type assertion is failed. object type: ${typeof obj}. object keys: ${Object.keys(obj)}`
  );
};

const isString = (obj: unknown): obj is string => typeof obj === 'string';
const isBoolean = (obj: unknown): obj is boolean => typeof obj === 'boolean';
const isNumber = (obj: unknown): obj is number => typeof obj === 'number';
const isSymbol = (obj: unknown): obj is symbol => typeof obj === 'symbol';
const isBigint = (obj: unknown): obj is bigint => typeof obj === 'bigint';
const isUndefined = (obj: unknown): obj is undefined => typeof obj === 'undefined';
const isNull = (obj: unknown): obj is null => obj === null;
const isDate = (obj: unknown): obj is Date => obj instanceof Date;

export { asSafely, isString, isBoolean, isNumber, isSymbol, isBigint, isUndefined, isNull, isDate };
