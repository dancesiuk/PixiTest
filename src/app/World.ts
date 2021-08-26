import { position } from "../lib/Interfaces";

import { Graphics, Sprite } from "pixi.js";
import { GameObject } from "../lib/GameObject";

export default class World extends GameObject {
    private _gridSize: number = 10;
    private _worldSize: any = {};
    private _gridMapSprit: Sprite;
    private _map: Array<Array<position>> = [];

    constructor() {
        super();
    }
    private _createGrid(cols: number, rows: number) {
        this._createMap(cols, rows);

        var _gridLine: Graphics = this._createGridLines(cols, rows);
        this._gridMapSprit = new Sprite();
        this._gridMapSprit.addChild(_gridLine);
    }
    private _createMap(cols: number, rows: number) {
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                if (!this._map[i]) {
                    this._map[i] = [];
                }
                var _coordinate: position = { x: i * this._gridSize, y: j * this._gridSize };
                this._map[i].push(_coordinate);
            }
        }
    }
    private _createGridLines(cols: number, rows: number): Graphics {
        var _gridLine: Graphics = new Graphics();
        _gridLine.lineStyle(1, 0x333333);

        // draw vertical lines
        for (let i = 1; i < cols; i++) {
            var _moveX = i * this._gridSize;
            _gridLine.moveTo(_moveX, 0);
            _gridLine.lineTo(_moveX, this._worldSize.height);
        }

        // draw horizontal line
        for (let i = 1; i < rows; i++) {
            var _moveY = i * this._gridSize;
            _gridLine.moveTo(0, _moveY);
            _gridLine.lineTo(this._worldSize.width, _moveY);
        }
        return _gridLine;
    }

    init(w: number, h: number) {
        this._worldSize.width = w;
        this._worldSize.height = h;

        var _worldCol = this._worldSize.width / this._gridSize;
        var _worldRow = this._worldSize.height / this._gridSize;

        this._createGrid(_worldCol, _worldRow);
    }

    getGridMap(): Sprite {
        return this._gridMapSprit;
    }
    getPosition(x: number, y: number): position {
        return this._map[x][y];
    }

    get gridSize() {
        return this._gridSize;
    }
    get map() {
        return this._map;
    }
}