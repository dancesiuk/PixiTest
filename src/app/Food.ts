import { Graphics, Sprite } from "pixi.js";
import { GameObject } from "../lib/GameObject";
import { position } from "../lib/Interfaces";

export default class Food extends GameObject {
    private _food: Sprite;
    private _gridSize: number;
    private _map: Array<Array<position>>;

    constructor() {
        super();
        this._food = new Sprite();
    }
    private _createFoodImage(pos): Graphics {
        var _bodyGriphic = new Graphics();
        _bodyGriphic.beginFill(0xff0000);
        _bodyGriphic.drawRect(0, 0, 10, 10);
        _bodyGriphic.endFill();

        // _bodyGriphic.x = pos.x;
        // _bodyGriphic.y = pos.y;
        return _bodyGriphic;
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
        var _pos = this._getRandomPosition();
        this._food.addChild(this._createFoodImage(_pos));
        this._food.x = _pos.x;
        this._food.y = _pos.y;
    }
    eaten() {
        var _pos = this._getRandomPosition();
        this._food.x = _pos.x;
        this._food.y = _pos.y;
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