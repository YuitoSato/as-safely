import {
  asSafely,
  isArray,
  isBigint,
  isBoolean,
  isDate,
  isNull,
  isNumber,
  isString,
  isStringArray,
  isSymbol,
  isUndefined,
} from './as-safely';

describe('asSafely', () => {
  describe('when string is provided', () => {
    it('should predict type when type assertion is succeeded', () => {
      const unknownStr: unknown = 'str';
      const str: string = asSafely(unknownStr, isString);
      expect(str).toStrictEqual(unknownStr);
    });

    it('should predict type when the passed object contains the target type', () => {
      const unknownStr: string | number = 'str';
      const str: string = asSafely(unknownStr, isString);
      expect(str).toStrictEqual(unknownStr);
    });

    it('should throw an error when type assertion is failed', () => {
      const unknownNumber: unknown = 1;
      expect(() => asSafely(unknownNumber, isString)).toThrow(
        `type assertion is failed. object type: number. object keys: `
      );
    });

    it('should return undefined when type assertion is failed and orElse returns undefined', () => {
      const unknownNumber: unknown = 1;
      const strOrUndefined: string | undefined = asSafely(unknownNumber, isString, () => undefined);
      expect(strOrUndefined).toStrictEqual(undefined);
    });
  });

  describe('when custom type is provided', () => {
    type Hoge = {
      str: string;
      num: number;
    };

    const isHoge = (obj: unknown): obj is Hoge => {
      const hoge = obj as Hoge;
      return hoge.str != null && hoge.num != null;
    };

    it('should predict custom type when type assertion is succeeded', () => {
      const unknown: unknown = {
        str: 'str',
        num: 1,
      };
      const hoge: Hoge = asSafely(unknown, isHoge);
      expect(hoge).toStrictEqual({
        str: 'str',
        num: 1,
      });
    });

    it('should throw an error when type assertion is failed', () => {
      const unknown: unknown = {
        str2: 'str',
        num2: 1,
      };
      expect(() => asSafely(unknown, isString)).toThrow(
        `type assertion is failed. object type: object. object keys: str2,num2`
      );
    });
  });

  describe('when multiple conditions are provided', () => {
    it('should predict type when type assertion is succeeded', () => {
      const unknownUndefined = undefined as unknown;
      expect(asSafely(unknownUndefined, [isString, isUndefined])).toStrictEqual(undefined);
      const unknownString = '1' as unknown;
      expect(asSafely(unknownString, [isString, isUndefined])).toStrictEqual('1');
    });

    it('should throw an error when type assertion is failed', () => {
      const unknown = 1 as unknown;
      expect(() => asSafely(unknown, [isString, isUndefined])).toThrow(
        `type assertion is failed. object type: number. object keys: `
      );
    });
  });
});

describe('isString', () => {
  test('should return true when string is provided', () => {
    const unknown: unknown = 'str';
    expect(isString(unknown)).toStrictEqual(true);
  });

  test('should return false when string is not provided', () => {
    const unknown: unknown = 1;
    expect(isString(unknown)).toStrictEqual(false);
  });
});

describe('isBoolean', () => {
  test('should return true when boolean is provided', () => {
    const unknown: unknown = true;
    expect(isBoolean(unknown)).toStrictEqual(true);
  });

  test('should return false when boolean is not provided', () => {
    const unknown: unknown = 1;
    expect(isBoolean(unknown)).toStrictEqual(false);
  });
});

describe('isNumber', () => {
  test('should return true when number is provided', () => {
    const unknown: unknown = 1;
    expect(isNumber(unknown)).toStrictEqual(true);
  });

  test('should return false when number is not provided', () => {
    const unknown: unknown = '1';
    expect(isNumber(unknown)).toStrictEqual(false);
  });
});

describe('isSymbol', () => {
  test('should return true when symbol is provided', () => {
    const unknown: unknown = Symbol(1);
    expect(isSymbol(unknown)).toStrictEqual(true);
  });

  test('should return false when symbol is not provided', () => {
    const unknown: unknown = 1;
    expect(isSymbol(unknown)).toStrictEqual(false);
  });
});

describe('isBigint', () => {
  test('should return true when bigint is provided', () => {
    const unknown: unknown = BigInt('1');
    expect(isBigint(unknown)).toStrictEqual(true);
  });

  test('should return false when bigint is not provided', () => {
    const unknown: unknown = 1;
    expect(isBigint(unknown)).toStrictEqual(false);
  });
});

describe('isUndefined', () => {
  test('should return true when undefined is provided', () => {
    const unknown: unknown = undefined;
    expect(isUndefined(unknown)).toStrictEqual(true);
  });

  test('should return false when undefined is not provided', () => {
    const unknown: unknown = '1';
    expect(isUndefined(unknown)).toStrictEqual(false);
  });
});

describe('isNull', () => {
  test('should return true when null is provided', () => {
    const unknown: unknown = null;
    expect(isNull(unknown)).toStrictEqual(true);
  });

  test('should return false when null is not provided', () => {
    const unknown: unknown = '1';
    expect(isNull(unknown)).toStrictEqual(false);
  });
});

describe('isDate', () => {
  test('should return true when date is provided', () => {
    const unknown: unknown = new Date(2021, 1, 1);
    expect(isDate(unknown)).toStrictEqual(true);
  });

  test('should return false when date is not provided', () => {
    const unknown: unknown = 1;
    expect(isDate(unknown)).toStrictEqual(false);
  });
});

describe('isArray', () => {
  test('should return true when array is provided', () => {
    const unknown: unknown = ['a', 'b'];
    expect(isArray(unknown)).toStrictEqual(true);
  });

  test('should return true when empty array is provided', () => {
    const unknown: unknown = [];
    expect(isArray(unknown)).toStrictEqual(true);
  });

  test('should return false when array is not provided', () => {
    const unknown: unknown = 1;
    expect(isArray(unknown)).toStrictEqual(false);
  });
});

describe('isStringArray', () => {
  test('should return true when string array is provided', () => {
    const unknown: unknown = ['a', 'b'];
    expect(isStringArray(unknown)).toStrictEqual(true);
  });

  test('should return true when empty array is provided', () => {
    const unknown: unknown = [];
    expect(isStringArray(unknown)).toStrictEqual(true);
  });

  test('should return false when string array is not provided', () => {
    const unknown: unknown = ['a', 1];
    expect(isStringArray(unknown)).toStrictEqual(false);
  });
});
