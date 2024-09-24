export function flow<A, B, C>(fa: (a: A) => B, fb: (b: B) => C): (a: A) => C;
export function flow<A, B, C, D>(fa: (a: A) => B, fb: (b: B) => C, fc: (c: C) => D): (a: A) => D;
export function flow<A, B, C, D>(fa: (a: A) => B, fb: (b: B) => C, fc: (b: C) => D): (a: A) => D;
export function flow<A, B, C, D, E>(fa: (a: A) => B, fb: (b: B) => C, fc: (c: C) => D, fd: (c: D) => E): (a: A) => E;
export function flow(...fns: Array<(...args: Array<any>) => any>) {
  return (a: any) => fns.reduce(
    (acc, fn) => fn(acc),
    a,
  );
}

export function pipe<A, B>(a: A, fb: (a: A) => B): B;
export function pipe<A, B, C>(a: A, fb: (a: A) => B, fc: (a: B) => C): C;
export function pipe<A, B, C, D>(a: A, fb: (a: A) => B, fc: (a: B) => C, fd: (a: C) => D): D;
export function pipe<A, B, C, D, E>(a: A, fb: (a: A) => B, fc: (a: B) => C, fd: (a: C) => D, fe: (a: D) => E): E;
export function pipe<A, B, C, D, E, F>(a: A, fb: (a: A) => B, fc: (a: B) => C, fd: (a: C) => D, fe: (a: D) => E, ff: (a: E) => F): F;
export function pipe<A, B, C, D, E, F, G>(a: A, fb: (a: A) => B, fc: (a: B) => C, fd: (a: C) => D, fe: (a: D) => E, ff: (a: E) => F, fg: (a: F) => G): G;
export function pipe(a: any, ...fns: Array<(...args: Array<any>) => any>) {
  // @ts-ignore
  return flow.apply(null, fns)(a);
}

export const mapObjectKeys = (mapFn: (key: string) => string) => (object: Object) => {
  if (Array.isArray(object)) {
    return object;
  }

  const newObject = Object.create(null);

  Object.entries(object).forEach(([key, value]) => {
    newObject[mapFn(key)] = value;
  });

  return newObject;
};
