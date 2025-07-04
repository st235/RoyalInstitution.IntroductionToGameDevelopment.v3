import MetaLoopAdvancer from "./MetaLoopAdvancer";

const _DEFAULT_META_LOOP_ADVANCEMENT_THRESHOLD_MS = 150;

class DefaultMetaLoopAdancer extends MetaLoopAdvancer {
    private readonly _metaLoopUpdateCycleMs: number;
    private _lastKnownUpdateCycleMs: number;

    constructor(metaLoopUpdateCycleMs: number) {
        super();
        this._metaLoopUpdateCycleMs = metaLoopUpdateCycleMs;
        this._lastKnownUpdateCycleMs = 0;
    }

    shouldAdvance(currentTimeMs: number): boolean {
        if ((currentTimeMs - this._lastKnownUpdateCycleMs) > this._metaLoopUpdateCycleMs) {
            this._lastKnownUpdateCycleMs = currentTimeMs;
            return true;
        }
        return false;
    }

    static create(metaLoopUpdateCycleMs?: number): DefaultMetaLoopAdancer {
        return new DefaultMetaLoopAdancer(metaLoopUpdateCycleMs ?? _DEFAULT_META_LOOP_ADVANCEMENT_THRESHOLD_MS);
    }
};

export default DefaultMetaLoopAdancer;
