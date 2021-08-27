
import { Application, Sprite, Container, Graphics } from 'pixi.js'
import { GameObject } from './lib/GameObject';
import { direction, foodLevel } from './lib/Interfaces';

import Snake from './app/Snake';
import World from './app/World';
import Utils from './lib/Util';
import Food from './app/Food';

export default class App extends GameObject {
    private _app: Application;
    private _world: World;
    private _snake: Snake;
    private _food: Food;
    private _width: number;
    private _height: number;
    private _moveDir: direction = direction.RIGHT;

    constructor() {
        super();
        this._setListener();
    }
    private _setListener() {
        var _self = this;
        // Add the 'keydown' event listener to our document
        document.addEventListener('keydown', onKeyDown);

        function onKeyDown(key) {
            switch (key.keyCode) {
                case 87:
                case 38:    // W Key is 87, Up arrow is 87
                    if (_self._moveDir != direction.DOWN) {
                        _self._moveDir = direction.UP;
                    }
                    break;

                case 83:
                case 40:    // S Key is 83, Down arrow is 40
                    if (_self._moveDir != direction.UP) {
                        _self._moveDir = direction.DOWN;
                    }
                    break;

                case 65:
                case 37:    // A Key is 65, Left arrow is 37
                    if (_self._moveDir != direction.RIGHT) {
                        _self._moveDir = direction.LEFT;
                    }
                    break;

                case 68:
                case 39:    // D Key is 68, Right arrow is 39
                    if (_self._moveDir != direction.LEFT) {
                        _self._moveDir = direction.RIGHT;
                    }
                    break;
            }
        }
    }
    private _createWrold() {
        this._world = new World();
        this._world.init(this._width, this._height);
        this._app.stage.addChild(this._world.getGridMap());
    }
    private _createSnake() {
        this._snake = new Snake();
        this._snake.step = this._world.gridSize;
        this._snake.edge = { x: this._width, y: this._height };

        this._snake.addBody(this._world.getPosition(5, 5), foodLevel.LEVEL1);

        this._app.stage.addChild(this._snake.snake);
    }

    init() {
        this._width = Utils.gameConfig.width = 640;
        this._height = Utils.gameConfig.height = 480;
        Utils.gameConfig.frameRate = 10;

        this._app = new Application({
            view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            // resolution: window.devicePixelRatio || 1,
            resolution: 1,
            backgroundColor: 0x222222,
            width: Utils.gameConfig.width,
            height: Utils.gameConfig.height
        });

        this._createWrold();
        this._createSnake();

        this._food = new Food();
        this._food.map = this._world.map;
        this._food.createFood();
        this._app.stage.addChild(this._food.food);
    }

    update() {
        // console.log('app update');
        this._snake.move(this._moveDir);
        if (isEatFood(this._snake.head, this._food.food)) {
            var _foodLevel = this._food.eaten();
            this._snake.addBody(this._snake.head, _foodLevel);
        }

        function isEatFood(objA, objB): boolean {
            return (objA.x == objB.x && objA.y == objB.y);
        }
    }

}
var _app = new App();
_app.init();