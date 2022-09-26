import delay from 'delay';

export interface IStrongRange {
  min: number;
  max: number;
}

/**
 * @returns a random integer between min and max
 */
export function randomInteger({ min, max }: IStrongRange): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @returns a random float between the given min and max
 */
export function randomFloat({ min, max }: IStrongRange): number {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  return Math.random() * (max - min) + min;
}

/**
 * @param percentage the chance percentage that the function will return true
 */
export function chance(percentage: number): boolean {
  const number: number = randomInteger({ min: 0, max: 100 });
  return number < percentage;
}

/**
 * Wait for an amount of time specified between min and max.
 * @param range the range to wait for, in milliseconds
 */
export async function randomWait(range: IStrongRange): Promise<void> {
  return delay(randomInteger(range));
}
