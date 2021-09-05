# as-safely
A library for safe type assertion in TypeScript.

The function asSafely throws an exception if it fails to check the type at runtime. This function will also perform type checking when transpiling to JavaScript whenever possible.

With this library, you can eliminate dangerous Type Assertions in your project.

# Install 
```
npm install as-safely
```

# Quickstart

```ts
import { asSafely, isString, isArray, isNumber } from './as-safely';

const str1: string = asSafely('1' as unknown, isString);
// => OK

const strOrUndefined: string | undefined = asSafely(undefined as unknown, [isString, isUndefined]);
// => OK

const numberArray: number[] = asSafely([1, 2] as unknown, isArray(isNumber));
// => OK

const str2: string = asSafely(1, isString);
// => detects a transpile error.

const str3: string = asSafely(1 as unknown, isString);
// => throws a runtime error.

const str4: string = asSafely<string>(1, isString);
// => forces to predict an object as string. This will throw a runtime error.

const strOrUndefined2: string | undefined = asSafely(1 as unknown, isString, () => undefined);
// => not throws a runtime error and returns undefined.

const strWithCustomError: string = asSafely(1 as unknown, isString, (obj) => {
    console.error(obj);
    throw new Error('custom error') 
});
// => throws a custom error.
```
