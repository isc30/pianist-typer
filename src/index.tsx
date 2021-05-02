import React from 'react';
import ReactDOM from 'react-dom';
import { filter } from 'rxjs/operators';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { chordComposer } from './services/chordComposer';
import { compositionInterpreter } from './services/compositionInterpreter';

compositionInterpreter.use()

// import dic from './dictionaries/en.json'
// const enDict = dic as string[];

// const newDic: Record<string, string[]> = { };
// enDict.forEach(w =>
//   {
//     const charsArr = Array.from(new Set(w)).map(v =>v.toLowerCase());
//     charsArr.sort();
//     const chars = charsArr.join("");

//     if (newDic[chars] == null)
//     {
//       newDic[chars] = [];
//     }

//     newDic[chars].push(w);
//   })

//   console.log(JSON.stringify(newDic))

// keyboardListener.keys.subscribe(keys => console.debug('[keys]', keys))
chordComposer.chords.pipe(filter(c => c.length !== 1 || c[0] !== ' ')).subscribe(chord => console.debug('[chord]', chord))

ReactDOM.render(
  <React.StrictMode>
    <h1>Welcome to THE PIANO TYPER!</h1>
    <p>The App won't work if you don't have a mechanical keyboard...</p>
    <h2>How to use?</h2>
    <ol>
      <li>Open the Dev Console (F12?)</li>
      <li>Click anywhere on this page (it uses window keydown events)</li>
      <li>Start typing</li>
      <li>Press "SPACE" to confirm and see the output</li>
    </ol>
    <h2>Examples:</h2>
    <q>
      Press (HE) at the same time, release, then (LO) at the same time too, release.
      Now confirm with "SPACE", and check the console
    </q>
    <q>
      Press (ASN) =&gt; (TIN) =&gt; [SPACE]
      Now confirm with "SPACE", and check the console
    </q>
    <q>
      Press: (S) =&gt; (AT) =&gt; (TI) =&gt; (C) =&gt; [SPACE]
    </q>
    <q>
      Press: (S) =&gt; (ACP) =&gt; (E) =&gt; [SPACE]
    </q>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
