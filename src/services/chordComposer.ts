import { Subject } from "rxjs";
import { keyboardListener } from "./keyboardListener";

export type Chord = string[]

class ChordComposer
{
    private currentChord?: Chord;

    private _chords = new Subject<Chord>();
    public get chords() { return this._chords.pipe(); }

    constructor()
    {
        keyboardListener.keys.subscribe(keys => this.onKeysChange(keys))
    }

    private onKeysChange(keys: string[])
    {
        if (this.currentChord == null
            || this.currentChord?.length <= keys.length)
        {
            this.currentChord = keys;
            return;
        }

        if (keys.length === 0 && this.currentChord != null)
        {
            this._chords.next(this.currentChord);
            this.currentChord = undefined;
            return;
        }
    }
}

export const chordComposer = new ChordComposer();
