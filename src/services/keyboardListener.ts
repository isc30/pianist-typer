import { Subject } from "rxjs";
import { distinctUntilArrayChanged } from "../helpers/distinctUntilArrayChanged";

class KeyboardListener
{
    private keyboardState: Record<string, boolean> = { };

    private _keys = new Subject<string[]>();
    public get keys() { return this._keys.pipe(distinctUntilArrayChanged()); }

    constructor()
    {
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
    }
    
    private onKeyDown(ev: KeyboardEvent)
    {
        this.keyboardState[ev.key] = true
        this.afterKeyEvent()
    }

    private onKeyUp(ev: KeyboardEvent)
    {
        this.keyboardState[ev.key] = false
        this.afterKeyEvent()
    }

    private afterKeyEvent()
    {
        const activeKeys = Object.keys(this.keyboardState).filter(k => this.keyboardState[k] === true)
        this._keys.next(activeKeys);
    }
}

export const keyboardListener = new KeyboardListener()
