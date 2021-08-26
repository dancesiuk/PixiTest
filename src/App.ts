
import { Application, Sprite, Container, Graphics } from 'pixi.js'
import Snake from './app/Snake';
import Utils from './lib/Util';

export default class App {
    private _app: Application;

    constructor() { }

    private _createSnake() {
        var _s: Snake = new Snake();
    }
    private _drawDot() {
        // const clampy: Sprite = Sprite.from("clampy.png");

        // clampy.anchor.set(0.5);
        // clampy.x = app.screen.width / 2;
        // clampy.y = app.screen.height / 2;
        // app.stage.addChild(clampy);

        const graphy: Graphics = new Graphics();
        graphy.beginFill(0xffffff);
        graphy.drawRect(0, 0, 10, 10);
        graphy.endFill();

        var _dot: Sprite = new Sprite();
        _dot.addChild(graphy);
        _dot.x = 10;
        _dot.y = 10;
        this._app.stage.addChild(_dot);
        console.log('app', this._app);
        // app.stage.addChild(graphy); //I can add it before setting position, nothing bad will happen.
    }

    init() {
        Utils.gameConfig.width = 640;
        Utils.gameConfig.height = 480;
        Utils.gameConfig.frameRate = 5;

        this._app = new Application({
            view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            // resolution: window.devicePixelRatio || 1,
            resolution: 1,
            backgroundColor: 0x333333,
            width: Utils.gameConfig.width,
            height: Utils.gameConfig.width
        });

        this._createSnake();
        this._drawDot();
    }


}
var _app = new App();
_app.init();