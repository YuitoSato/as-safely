import {
  asSafely,
  isBigint,
  isBoolean,
  isDate,
  isNull,
  isNumber,
  isString,
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
});

describe('isString', () => {
  test('type assertion should be succeeded when string is provided', () => {
    const unknown: unknown = 'str';
    let str: string = '';
    if (isString(unknown)) {
      str = unknown;
    }
    expect(str).toStrictEqual('str');
  });

  test('type assertion should be failed when string is not provided', () => {
    const unknown: unknown = 1;
    let str: string = '';
    if (isString(unknown)) {
      str = unknown;
    }
    expect(str).toStrictEqual('');
  });
});

describe('isBoolean', () => {
  test('type assertion should be succeeded when boolean is provided', () => {
    const unknown: unknown = true;
    let boolean: boolean = false;
    if (isBoolean(unknown)) {
      boolean = unknown;
    }
    expect(boolean).toStrictEqual(true);
  });

  test('type assertion should be failed when boolean is not provided', () => {
    const unknown: unknown = 1;
    let boolean: boolean = false;
    if (isBoolean(unknown)) {
      boolean = unknown;
    }
    expect(boolean).toStrictEqual(false);
  });
});

describe('isNumber', () => {
  test('type assertion should be succeeded when number is provided', () => {
    const unknown: unknown = 1;
    let number: number = 0;
    if (isNumber(unknown)) {
      number = unknown;
    }
    expect(number).toStrictEqual(1);
  });

  test('type assertion should be failed when number is not provided', () => {
    const unknown: unknown = '1';
    let number: number = 0;
    if (isNumber(unknown)) {
      number = unknown;
    }
    expect(number).toStrictEqual(0);
  });
});

describe('isSymbol', () => {
  test('type assertion should be succeeded when symbol is provided', () => {
    const unknown: unknown = Symbol(1);
    let symbol: symbol = Symbol(0);
    if (isSymbol(unknown)) {
      symbol = unknown;
    }
    expect(symbol).toStrictEqual(unknown);
  });

  test('type assertion should be failed when symbol is not provided', () => {
    const unknown: unknown = 1;
    let symbol: symbol = Symbol(0);
    if (isSymbol(unknown)) {
      symbol = unknown;
    }
    expect(symbol).toStrictEqual(symbol);
  });
});

describe('isBigint', () => {
  test('type assertion should be succeeded when bigint is provided', () => {
    const unknown: unknown = BigInt('1');
    let bigint: bigint = BigInt('0');
    if (isBigint(unknown)) {
      bigint = unknown;
    }
    expect(bigint).toStrictEqual(BigInt('1'));
  });

  test('type assertion should be failed when bigint is not provided', () => {
    const unknown: unknown = 1;
    let bigint: bigint = BigInt('0');

    if (isBigint(unknown)) {
      bigint = unknown;
    }
    expect(bigint).toStrictEqual(BigInt('0'));
  });
});

describe('isUndefined', () => {
  test('type assertion should be succeeded when undefined is provided', () => {
    const unknown: unknown = undefined;
    let undefinedValue: undefined | number = 1;
    if (isUndefined(unknown)) {
      undefinedValue = unknown;
    }
    expect(undefinedValue).toStrictEqual(undefined);
  });

  test('type assertion should be failed when undefined is not provided', () => {
    const unknown: unknown = '1';
    let undefinedValue: undefined | number = 1;
    if (isUndefined(unknown)) {
      undefinedValue = unknown;
    }
    expect(undefinedValue).toStrictEqual(1);
  });
});

describe('isNull', () => {
  test('type assertion should be succeeded when null is provided', () => {
    const unknown: unknown = null;
    let nullValue: null | number = 1;
    if (isNull(unknown)) {
      nullValue = unknown;
    }
    expect(nullValue).toStrictEqual(null);
  });

  test('type assertion should be failed when null is not provided', () => {
    const unknown: unknown = '1';
    let nullValue: null | number = 1;
    if (isNull(unknown)) {
      nullValue = unknown;
    }
    expect(nullValue).toStrictEqual(1);
  });
});

describe('isDate', () => {
  test('type assertion should be succeeded when date is provided', () => {
    const unknown: unknown = new Date(2021, 1, 1);
    let date: Date = new Date(2020, 1, 1);
    if (isDate(unknown)) {
      date = unknown;
    }
    expect(date.getFullYear()).toStrictEqual(2021);
  });

  test('type assertion should be failed when date is not provided', () => {
    const unknown: unknown = 1;
    let date: Date = new Date(2020, 1, 1);
    if (isDate(unknown)) {
      date = unknown;
    }
    expect(date.getFullYear()).toStrictEqual(2020);
  });
});
