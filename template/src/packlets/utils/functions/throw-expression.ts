/**
 * An expression that will throw the given error message.
 * Useful when you want to assert that a value is undefined.
 *
 * Example:
 *
 * ```
 * // will throw because the function returns null
 * returnsNull("argument") ?? throwExpression("the function returned undefined !")
 *
 * // will NOT throw because the function returns neither null nor undefined
 * returnsSomething("hi") ?? throwExpression("the function returned undefined !")
 * ```
 *
 * [Stackoverflow source](https://stackoverflow.com/a/65666402/4564097)
 */
export function throwExpression(errorMessage: string): never {
  throw new Error(errorMessage);
}
