function LoadFunction<A1, R>(rawFunctionCode: string): ((a1: A1) => R) | undefined {
    try {
        return eval?.(`"use strict";(${rawFunctionCode})`);
    } catch(e) {
        console.error(e);
        return undefined;
    }
}

function LoadTupleFunction<A1, A2, R>(rawFunctionCode: string): ((a1: A1, a2: A2) => R) | undefined {
    try {
        return eval?.(`"use strict";(${rawFunctionCode})`);
    } catch(e) {
        console.error(e);
        return undefined;
    }
}

function LoadTripleFunction<A1, A2, A3, R>(rawFunctionCode: string): ((a1: A1, a2: A2, a3: A3) => R) | undefined {
    try {
        return eval?.(`"use strict";(${rawFunctionCode})`);
    } catch(e) {
        console.error(e);
        return undefined;
    }
}

function LoadQuadrupleFunction<A1, A2, A3, A4, R>(rawFunctionCode: string): ((a1: A1, a2: A2, a3: A3, a4: A4) => R) | undefined {
    try {
        return eval?.(`"use strict";(${rawFunctionCode})`);
    } catch(e) {
        console.error(e);
        return undefined;
    }
}

export { LoadFunction, LoadTupleFunction, LoadTripleFunction, LoadQuadrupleFunction };
