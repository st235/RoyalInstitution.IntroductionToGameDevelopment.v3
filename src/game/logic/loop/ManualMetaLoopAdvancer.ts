import MetaLoopAdvancer from "./MetaLoopAdvancer";

class ManualMetaLoopAdancer extends MetaLoopAdvancer {
    private _shouldAdance: boolean;

    constructor() {
        super();
        this._shouldAdance = false;
    }

    shouldAdvance(_: number): boolean {
        if (this._shouldAdance) {
            this._shouldAdance = false;
            return true;
        }
        return false;
    }

    advance() {
        this._shouldAdance = true;
    }

    static create(): ManualMetaLoopAdancer {
        return new ManualMetaLoopAdancer();
    }
};

export default ManualMetaLoopAdancer;
