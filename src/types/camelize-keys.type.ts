type Camelize<T extends string> = T extends `${infer A}_${infer B}` ? `${A}${Camelize<Capitalize<B>>}` : T;

export type CamelizeKeys<T extends object> = {
    [key in keyof T as key extends string ? Camelize<key> : key]: T[key];
}
