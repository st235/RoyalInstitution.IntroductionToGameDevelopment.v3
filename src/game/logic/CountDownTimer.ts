type OnTickListener =  (remainingTimeMs: number) => void;
type OnCompleteListener = () => void;

class CountDownTimer {

    private _remainingTimeMs: number;
    private _tickRefreshMs: number;
    private _lastKnownUpdateTick: number;
    private _isRunning: boolean;

    private _onTickListener?: OnTickListener;
    private _onCompleteListener?: OnCompleteListener;

    constructor() {
        this._remainingTimeMs = 0;
        this._tickRefreshMs = 0;
        this._lastKnownUpdateTick = 0;
        this._isRunning = false;
    }

    setOnTickListener(listener: OnTickListener) {
        this._onTickListener = listener;
    }

    start(timeMs: number, tickRefreshMs: number, onCompleteListener: OnCompleteListener) {
        this._remainingTimeMs = timeMs;
        this._tickRefreshMs = tickRefreshMs;
        this._lastKnownUpdateTick = -1;
        this._onCompleteListener = onCompleteListener;
        this._isRunning = true;
    }

    update(dtMs: number) {
        if (!this._isRunning) {
            return;
        }

        this._remainingTimeMs = Math.max(0, this._remainingTimeMs - dtMs);
        const tickRefreshMilestone = Math.ceil(this._remainingTimeMs / this._tickRefreshMs);

        if (tickRefreshMilestone != this._lastKnownUpdateTick) {
            this._onTickListener?.(this._remainingTimeMs);
            this._lastKnownUpdateTick = tickRefreshMilestone;
        }

        if (this._remainingTimeMs <= 0) {
            this._onCompleteListener?.();
            this._isRunning = false;
        }
    }
}

export default CountDownTimer;
