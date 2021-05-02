import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { chordListener } from './services/chordListener';
import { chordProgressionListener } from './services/chordProgressionListener';
import { keyboardListener } from './services/keyboardListener';

//keyboardListener.keys.subscribe(console.info)
//chordListener.chords.subscribe(console.warn)
chordProgressionListener.progressions.subscribe(p =>
{
  let s = '';
  p.forEach(c =>
    {
      if (c.length > 1)
      {
        s += "(";
        s += c.reduce((p, c) => `${p}${c}`);
        s += ")";
      }
      else
      {
        s += c[0];
      }
    })
  console.log(s)
})

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
