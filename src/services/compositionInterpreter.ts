import { ChordProgression, chordProgressionComposer } from "./chordProgressionComposer";

import dic from '../dictionaries/en-indexed.json'
import { Chord } from "./chordComposer";
const enDict = dic as Record<string, string[]>;

class CompositionInterpreter
{
    constructor()
    {
        chordProgressionComposer.progressions.subscribe(p => this.onNewProgression(p))
    }

    private onNewProgression(progression: ChordProgression)
    {
        let predicate = '';
        progression.forEach((c, i) =>
        {
            predicate += `(?<g${i}>[`;
            predicate += c.reduce((p, c) => `${p}${c}`);
            predicate += `]{${c.length},})`;
        })

        const regex = new RegExp(`^${predicate}$`);
        console.log(regex.source)

        const possibleWords = this.getRelevantWordsFromDictionary(enDict, progression);
        const words = possibleWords
            .map(w => ({ word: w, regexResult: regex.exec(w) }))
            .filter(r => r.regexResult?.groups != null && this.allRegexGroupsContainAllChars(r.regexResult.groups, progression))
            .map(r => r.word);

        console.log(words);
    }

    private allRegexGroupsContainAllChars(groups: Record<string, string>, progression: ChordProgression)
    {
        return progression.every((chord, index) =>
        {
            const group = groups[`g${index}`];

            if (group == null)
            {
                return false;
            }
            
            const chordChars = this.getCharsInChord(chord);
            const groupChars = this.getStringKey(group);

            return chordChars === groupChars;
        })
    }

    private getRelevantWordsFromDictionary(dict: Record<string, string[]>, progression: ChordProgression)
    {
        const chars = this.getCharsInProgression(progression);
        return dict[chars] ?? [];
    }

    private getCharsInProgression(progression: ChordProgression)
    {
        const allChords = progression.reduce((previous, current) => `${previous}${this.getCharsInChord(current)}`, '');
        return this.getStringKey(allChords);
    }

    private getCharsInChord(chord: Chord)
    {
        const arrayToString = (arr: string[]) => arr.reduce((previous, current) => `${previous}${current}`, '');
        return this.getStringKey(arrayToString(chord));
    }

    private getStringKey(value: string)
    {
        const charsArr = Array.from(new Set(value)).map(v =>v.toLowerCase());
        charsArr.sort();
        return charsArr.join("");
    }
}

export const compositionInterpreter = new CompositionInterpreter();
