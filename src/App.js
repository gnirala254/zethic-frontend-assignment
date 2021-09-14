import { useEffect, useState } from 'react';
import './App.css';
import Results from './Results';
import axios from 'axios';

function App() {
  const [value, setValue] = useState('');
  const [inputArray, setInputArray] = useState([]);
  const [room, setRoom] = useState([]);
  const [insects, setInsects] = useState([]);
  const [results, setResults] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setResults([]);
    setInputArray(value.split('\n'));
  };

  useEffect(() => {
    // console.log(inputArray);
    if (inputArray && inputArray.length > 0) {
      setRoom(inputArray[0].split(' '));
      var i,
        j,
        temporary,
        chunk = 2;
      const arr = [];
      for (i = 1, j = inputArray.length; i < j; i += chunk) {
        temporary = inputArray.slice(i, i + chunk);
        arr.push(temporary);
      }
      setInsects(arr);
    }
  }, [inputArray]);

  useEffect(() => {
    // console.log(insects);
    insects &&
      insects.length > 0 &&
      insects.forEach((insect) => {
        const postArr = [];
        postArr.push(room);
        postArr.push(insect);
        axios
          .post('https://fathomless-cliffs-03717.herokuapp.com/insect', {
            body: postArr,
          })
          .then((response) => {
            const ary = response.data;
            setResults((results) => [...results, ary]);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  }, [insects]);

  return (
    <div className="app">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="form"
      >
        <label>Enter inputs:</label>
        <textarea
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          className="textarea"
        />
        <input type="submit" value="Submit" className="submit" />
      </form>
      <p>Outputs</p>
      <Results results={results} />
    </div>
  );
}

export default App;
