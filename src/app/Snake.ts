import { direction, position } from "../lib/Interfaces";
import { GameObject, GameObjectInterface } from "../lib/GameObject";
import { Graphics, Sprite } from "pixi.js";



export default class Snake extends GameObject implements GameObjectInterface {
    private _position: position = { x: 0, y: 0 };
    private _direction: direction = direction.RIGHT;
    private _body: position[] = [];
    private _bodyGriphic: Graphics;
    private _bodySprites: Sprite[] = [];

    constructor(x, y) {
        super();
        this._position.x = x;
        this._position.y = y;

        this._createBodyGriphic();
        this.addBody({ x: 20, y: 20 });

    }
    private _createBodyGriphic() {
        this._bodyGriphic = new Graphics();
        this._bodyGriphic.beginFill(0xffffff);
        this._bodyGriphic.drawRect(0, 0, 10, 10);
        this._bodyGriphic.endFill();
    }
    private _renderBody() {
        for (var i = 0; i < this._body.length; i++) {
            var _body = this._body[i];
            var _bodySprite = this._bodySprites[i];
            if (!_bodySprite) {
                _bodySprite = new Sprite();
            }
            _bodySprite.x = _body.x;
            _bodySprite.y = _body.y;

            _bodySprite.removeChildren();
            // _bodySprite.addChild(this._)
        }
    }

    addBody(pos: position) {
        this._body.push(pos);
    }

    move(pos: position) {

    }
    update() {
        // console.log('2');
        this._renderBody();
    }
}