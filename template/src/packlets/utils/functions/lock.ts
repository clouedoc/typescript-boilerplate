import AsyncLock from 'async-lock';

export const lock: AsyncLock = new AsyncLock();
