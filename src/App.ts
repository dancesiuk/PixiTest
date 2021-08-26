
import { Application, Sprite, Container, Graphics } from 'pixi.js'
import Snake from './app/Snake';
import World from './app/World';
import Utils from './lib/Util';

export default class App {
    private _app: Application;
    private _world: World;
    private _width: number;
    private _height: number;

    constructor() { }
    private _createWrold() {
        this._world = new World();
        this._world.init(this._width, this._height);
        this._app.stage.addChild(this._world.getGridMap());
    }
    private _createSnake() {
        var _s: Snake = new Snake(10, 10);
    }
    private _drawDot() {
        // const clampy: Sprite = Sprite.from("clampy.png");

        // clampy.anchor.set(0.5);
        // clampy.x = app.screen.width / 2;
        // clampy.y = app.screen.height / 2;
        // app.stage.addChild(clampy);

        var _mapPos = this._world.getPosition(10, 10);

        const graphy: Graphics = new Graphics();
        graphy.beginFill(0xffffff);
        graphy.drawRect(0, 0, 10, 10);
        graphy.endFill();

        var _dot: Sprite = new Sprite();
        _dot.addChild(graphy);
        _dot.x = _mapPos.x;
        _dot.y = _mapPos.y;
        this._app.stage.addChild(_dot);
        console.log('app', this._app);
        // app.stage.addChild(graphy); //I can add it before setting position, nothing bad will happen.
    }

    init() {
        this._width = Utils.gameConfig.width = 640;
        this._height = Utils.gameConfig.height = 480;
        Utils.gameConfig.frameRate = 5;

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
        this._drawDot();
    }


}
var _app = new App();
_app.init();