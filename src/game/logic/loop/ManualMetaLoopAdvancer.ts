import MetaLoopAdvancer from "./MetaLoopAdvancer";

class ManualMetaLoopAdancer extends MetaLoopAdvancer {

    private _shouldAdance: boolean;
    private _autoAdavanceIntervalMs?: number;
    private _lastKnownUpdateCycleMs: number;

    constructor() {
        super();
        this._shouldAdance = false;
        this._lastKnownUpdateCycleMs = 0;
    }

    shouldAdvance(currentTimeMs: number): boolean {
        const enoughTimeElapsed = this._autoAdavanceIntervalMs &&
            (currentTimeMs - this._lastKnownUpdateCycleMs) > this._autoAdavanceIntervalMs;

        if (enoughTimeElapsed || this._shouldAdance) {
            this._shouldAdance = false;
            this._lastKnownUpdateCycleMs = currentTimeMs;
            return true;
        }
        return false;
    }

    setAutoAdvance(autoAdavanceIntervalMs?: number) {
        this._autoAdavanceIntervalMs = autoAdavanceIntervalMs;
    }

    advance() {
        this._shouldAdance = true;
    }

    static create(): ManualMetaLoopAdancer {
        return new ManualMetaLoopAdancer();
    }
};

export default ManualMetaLoopAdancer;
