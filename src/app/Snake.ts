import { GameObject, GameObjectInterface } from "../lib/GameObject";

interface position {
    x: Number;
    y: Number;
}

export default class Snake extends GameObject implements GameObjectInterface {
    private _position: position;
    constructor() {
        super();
    }
    move(x, y) {

    }
    update() {
        console.log('2');
    }
}