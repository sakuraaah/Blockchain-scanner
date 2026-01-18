export class HandledError extends Error {
  readonly handled = true;
  cause?: unknown;

  constructor(message: string, cause?: unknown) {
    super(message);
    this.name = 'HandledError';
    this.cause = cause;
  }
}

export const isHandledError = (e: unknown): e is HandledError =>
  typeof e === 'object' && e !== null && (e as any).handled === true;
