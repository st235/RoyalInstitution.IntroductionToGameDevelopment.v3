function LoadFunction<T, R>(rawFunctionCode: string): ((t: T) => R) | undefined {
    return eval?.(`"use strict";(${rawFunctionCode})`);
}

function LoadTupleFunction<T1, T2, R>(rawFunctionCode: string): ((t1: T1, t2: T2) => R) | undefined {
    return eval?.(`"use strict";(${rawFunctionCode})`);
}

export { LoadFunction, LoadTupleFunction };
