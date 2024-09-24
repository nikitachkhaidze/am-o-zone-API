type Camelize<T extends string> = T extends `${infer A}_${infer B}` ? `${A}${Camelize<Capitalize<B>>}` : T;

export type CamelizeKeys<T> = { [P in keyof T as Camelize<P & string>]: T[P] };

export type CamelizeKeysDeep<T> = { [P in keyof T as Camelize<P & string>]:
    T[P] extends object ? CamelizeKeys<T[P]> : T[P] }
