import { Graphics, Sprite } from "pixi.js";
import { GameObject } from "../lib/GameObject";
import { foodLevel, position } from "../lib/Interfaces";

export default class Food extends GameObject {
    private _food: Sprite;
    private _foodLevel: foodLevel;
    private _gridSize: number;
    private _map: Array<Array<position>>;

    constructor() {
        super();
        this._food = new Sprite();
    }
    private _createFoodImage(pos): Graphics {
        var _color: number = this._getFoodColorByLevel();

        var _bodyGriphic = new Graphics();
        _bodyGriphic.name = "mGraphic";
        _bodyGriphic.beginFill(_color);
        _bodyGriphic.drawRect(0, 0, 10, 10);
        _bodyGriphic.endFill();

        return _bodyGriphic;
    }
    private _updateFoodImage() {
        var _graphic: Graphics = this._food.getChildByName('mGraphic') as Graphics;
        var _color = this._getFoodColorByLevel();

        _graphic.beginFill(_color);
        _graphic.drawRect(0, 0, 10, 10);
        _graphic.endFill();
    }
    private _getFoodColorByLevel(): number {
        var _color: number;
        switch (this._foodLevel) {
            case foodLevel.LEVEL1: _color = 0xff0000; break;
            case foodLevel.LEVEL2: _color = 0xffff00; break;
            case foodLevel.LEVEL3: _color = 0xaa00ff; break;
        }
        return _color;
    }
    private _getRandomPosition(): position {
        var _pos: position = { x: 0, y: 0 };
        var _col = Math.floor(Math.random() * this._map.length);
        var _row = Math.floor(Math.random() * this._map[0].length);

        // console.log('this._map', this._map, this._map.length, _col, _row);
        _pos = this._map[_col][_row];

        return _pos;
    }
    createFood() {
        this._foodLevel = Math.floor(Math.random() * Object.keys(foodLevel).length / 2);
        var _pos = this._getRandomPosition();
        this._food.addChild(this._createFoodImage(_pos));
        this._food.x = _pos.x;
        this._food.y = _pos.y;
        // console.log('this._foodLevel', this._foodLevel);
    }
    eaten() {
        var _curentfooLevel = this._foodLevel;
        this._foodLevel = Math.floor(Math.random() * Object.keys(foodLevel).length / 2);
        var _pos = this._getRandomPosition();
        this._food.x = _pos.x;
        this._food.y = _pos.y;

        this._updateFoodImage();
        return _curentfooLevel;
    }

    set gridSize(val: number) {
        this._gridSize = val;
    }
    set map(val: Array<Array<position>>) {
        this._map = val;
    }
    get food() {
        return this._food;
    }
}