import { direction, foodLevel, position } from "../lib/Interfaces";
import { GameObject, GameObjectInterface } from "../lib/GameObject";
import { Graphics, Sprite } from "pixi.js";



export default class Snake extends GameObject implements GameObjectInterface {
    private _snake: Sprite;
    private _step: number = 1;
    private _edge: position = { x: 0, y: 0 };
    private _position: position = { x: 0, y: 0 };
    private _currentDir: direction = direction.RIGHT;
    private _body: Graphics[] = [];
    private _bodyGriphic: Graphics;

    constructor() {
        super();
        this._snake = new Sprite();
    }

    private _createBody(pos): Graphics {
        var _bodyGriphic = new Graphics();
        _bodyGriphic.beginFill(0xffffff);
        _bodyGriphic.drawRect(0, 0, 10, 10);
        _bodyGriphic.endFill();

        _bodyGriphic.x = pos.x;
        _bodyGriphic.y = pos.y;

        return _bodyGriphic;
    }
    private _transformHead(_body: Graphics): Graphics {
        var _eyeColor = 0x000000;
        _body.clear();
        _body.beginFill(0xffffff);
        _body.drawRect(0, 0, 10, 10);
        _body.endFill();

        switch (this._currentDir) {
            case direction.UP:
                _body.beginFill(_eyeColor);
                _body.drawRect(2, 2, 2, 2);
                _body.endFill();

                _body.beginFill(_eyeColor);
                _body.drawRect(6, 2, 2, 2);
                _body.endFill();
                break;
            case direction.DOWN:
                _body.beginFill(_eyeColor);
                _body.drawRect(2, 6, 2, 2);
                _body.endFill();

                _body.beginFill(_eyeColor);
                _body.drawRect(6, 6, 2, 2);
                _body.endFill();
                break;
            case direction.RIGHT:
                _body.beginFill(_eyeColor);
                _body.drawRect(2, 2, 2, 2);
                _body.endFill();

                _body.beginFill(_eyeColor);
                _body.drawRect(6, 6, 4, 2);
                _body.endFill();
                break;
            case direction.LEFT:
                _body.beginFill(_eyeColor);
                _body.drawRect(6, 2, 2, 2);
                _body.endFill();

                _body.beginFill(_eyeColor);
                _body.drawRect(0, 6, 4, 2);
                _body.endFill();
                break;
        }

        return _body;
    }
    private _updateBodyPosition(_movement): position[] {
        var _newPosition: position[] = [];

        for (var i = 0; i < this._body.length; i++) {
            var _body = this._body[i];
            var _pos: position = { x: 0, y: 0 }
            if (i < 1) {
                // handle first element new position
                _pos.x = _body.x + _movement.x * this._step;
                _pos.y = _body.y + _movement.y * this._step;
            } else {
                // update the next element with prev element position
                var _prevBody = this._body[i - 1];
                _pos.x = _prevBody.x;
                _pos.y = _prevBody.y;
            }

            _pos = this._isOverEdge(_pos);
            _newPosition.push(_pos);
        }
        return _newPosition;
    }

    private _isOverEdge(_pos) {
        if (_pos.x < 0) {
            _pos.x = this._edge.x - this._step;
        }
        if (_pos.x > this._edge.x - this._step) {
            _pos.x = 0;
        }
        if (_pos.y < 0) {
            _pos.y = this._edge.y - this._step;
        }
        if (_pos.y > this._edge.y - this._step) {
            _pos.y = 0;
        }
        return _pos;
    }

    addBody(_pos: position, _foodLevel: foodLevel) {
        // this._renderBody();
        var _level: number;
        switch (_foodLevel) {
            case foodLevel.LEVEL1: _level = 1; break;
            case foodLevel.LEVEL2: _level = 5; break;
            case foodLevel.LEVEL3: _level = 20; break;
        }
        for (var i = 0; i < _level; i++) {
            var _bodyImage = this._createBody(_pos);
            this._body.push(_bodyImage);
            this._snake.addChild(_bodyImage);
        }
    }

    move(dir: direction) {
        var _self = this;
        var _movement: position = { x: 0, y: 0 };
        this._currentDir = dir;

        switch (dir) {
            case direction.UP: _movement.x = 0; _movement.y = -1; break;
            case direction.DOWN: _movement.x = 0; _movement.y = 1; break;
            case direction.LEFT: _movement.x = -1; _movement.y = 0; break;
            case direction.RIGHT: _movement.x = 1; _movement.y = 0; break;
        }
        var _newPosition: position[] = this._updateBodyPosition(_movement);

        this._body.map(function (_body, i) {
            _body.x = _newPosition[i].x;
            _body.y = _newPosition[i].y;
            if (i < 1) {
                _body = _self._transformHead(_self._body[i]);
            }
        })
    }
    update() { }

    set step(val: number) {
        this._step = val;
    }
    set edge(val: position) {
        this._edge = val;
    }
    get snake(): Sprite {
        return this._snake;
    }
    get head(): position {
        return { x: this._body[0].x, y: this._body[0].y };
    }
}