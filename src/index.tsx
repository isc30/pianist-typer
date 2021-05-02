import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { chordComposer } from './services/chordComposer';
import { chordProgressionComposer } from './services/chordProgressionComposer';
import { compositionInterpreter } from './services/compositionInterpreter';
import { keyboardListener } from './services/keyboardListener';


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

const w = compositionInterpreter;

//keyboardListener.keys.subscribe(console.info)
//chordListener.chords.subscribe(console.warn)
// compositionInterpreter.progressions.subscribe(p =>
// {
//   let s = '';
//   p.forEach(c =>
//     {
//       if (c.length > 1)
//       {
//         s += "(";
//         s += c.reduce((p, c) => `${p}${c}`);
//         s += ")";
//       }
//       else
//       {
//         s += c[0];
//       }
//     })
//   console.log(s)
// })

ReactDOM.render(
  <React.StrictMode>
    Hey!
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
