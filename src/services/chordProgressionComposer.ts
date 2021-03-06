import { Subject } from "rxjs";
import { Chord, chordComposer } from "./chordComposer"

export type ChordProgression = Chord[]

class ChordProgressionComposer
{
    private currentProgression?: ChordProgression

    private _progressions = new Subject<ChordProgression>();
    public get progressions() { return this._progressions.pipe() }

    constructor()
    {
        chordComposer.chords.subscribe(chord => this.onNewChord(chord))
    }

    private onNewChord(chord: Chord)
    {
        if (this.currentProgression == null)
        {
            this.currentProgression = [ chord ];
            return;
        }

        // commands
        if (chord.length === 1)
        {
            if (chord[0] === ' ')
            {
                const needsResolution = this.progressionNeedsResolution(this.currentProgression);

                this._progressions.next(this.currentProgression);
                this.currentProgression = undefined;

                // if the progression didnt need resolution, send the space back as a normal char
                if (!needsResolution)
                {
                    this._progressions.next([ chord ]);
                }

                return;
            }

            if (chord[0] === 'Backspace')
            {
                this.currentProgression?.pop();
                return;
            }

            if (chord[0] === 'Escape')
            {
                this.currentProgression = undefined;
                return;
            }
        }

        this.currentProgression.push(chord);
    }

    private progressionNeedsResolution(progression: ChordProgression)
    {
        return progression.length > 0 && progression.some(v => v.length > 1);
    }
}

export const chordProgressionComposer = new ChordProgressionComposer()
