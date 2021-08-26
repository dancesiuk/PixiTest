import Utils from "./Util";

export interface GameObjectInterface {
    update();
}

export class GameObject implements GameObjectInterface {
    private _frames: number = 0;
    private _lifeUpdateRef;
    private _lastUpdate;

    constructor() {
        this._animate();
    }

    private _animate() {
        var _self = this;
        this._frames++;

        var _now = (performance || Date).now();
        var _startTime = this._lastUpdate || 0;

        // FPS
        // var _diff = _now - _startTime;
        // if (_diff > 1E3) {
        //     this._lastUpdate = _now;
        //     var _fps = Math.min(1E3 * this._frames / _diff, 60);
        //     // console.log('_fps', _fps, this._frames, 60 / Utils.gameConfig.frameRate);
        // }

        if (this._frames >= 60 / Utils.gameConfig.frameRate) {
            this._frames = 0;
            _self.update();
        }
        cancelAnimationFrame(_self._lifeUpdateRef);
        _self._lifeUpdateRef = requestAnimationFrame(function () {
            _self._animate.call(_self);
        });
    }
    update() { }
}