import logo from './logo.svg';
import './App.css';
import { useState } from "react";

function SinglePayoff({userInput, onUserInput}) {
  return (
    <input 
      type="text" 
      value={userInput} 
      placeholder="Search..."
      onChange={(e) => onUserInput(e.target.value)}/>
  )
}

function Outcome({userInputs}) {
  const user1 = userInputs.value.user1;
  const user2 = userInputs.value.user2;
  const max1a = Math.max(user1[0],user1[2]);
  const max1b = Math.max(user1[1],user1[3]);
  const max2a = Math.max(user2[0],user2[1]);
  const max2b = Math.max(user2[2],user2[3]);
  if (max1a === user1[0] && max1b === user1[1] && max2a === user2[0] && max2b === user2[2]) {
    return <p>Abate, Abate is the dominant strategy</p>;
  } else if (max1a === user1[2] && max1b === user1[3] && max2a === user2[1] && max2b === user2[3]) {
    return <p>Pollute, Pollute is the dominant strategy</p>;
  } else if (max1a === user1[0] && max1b === user1[1] && max2a === user2[1] && max2b === user2[3]) {
    return <p>Abate, Pollute is the dominant strategy</p>;
  } else if (max1a === user1[2] && max1b === user1[3] && max2a === user2[0] && max2b === user2[2]) {
    return <p>Pollute, Abate is the dominant strategy</p>;
  } else {
    return <p>There is no dominant strategy</p>;
  }
}

function TwoXTwoForm({userInputs, handleChange}) {
  const handleSubmit = (event) => {
    alert('A name was submitted: ' + userInputs.value);
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        User 1 userInputs:
        <input type="number" value={userInputs.value.user1[0]} onChange={(e) => handleChange('user1', 0, e.target.value)} />
        <input type="number" value={userInputs.value.user1[1]} onChange={(e) => handleChange('user1', 1, e.target.value)} />
        <input type="number" value={userInputs.value.user1[2]} onChange={(e) => handleChange('user1', 2, e.target.value)} />
        <input type="number" value={userInputs.value.user1[3]} onChange={(e) => handleChange('user1', 3, e.target.value)} />
      </label>
      <label>
        User 2 userInputs:
        <input type="number" value={userInputs.value.user2[0]} onChange={(e) => handleChange('user2', 0, e.target.value)} />
        <input type="number" value={userInputs.value.user2[1]} onChange={(e) => handleChange('user2', 1, e.target.value)} />
        <input type="number" value={userInputs.value.user2[2]} onChange={(e) => handleChange('user2', 2, e.target.value)} />
        <input type="number" value={userInputs.value.user2[3]} onChange={(e) => handleChange('user2', 3, e.target.value)} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default function App() {
  const [userInputs, setUserInputs] = useState({value: STARTING_INPUT.prisoners});

  const handleChange = (userName, item, value) => {
    userInputs.value[userName][item] = parseInt(value);
    setUserInputs({value: userInputs.value});
  }

  return (
    <div>
      <TwoXTwoForm 
        userInputs={userInputs}
        handleChange={handleChange}
      />
      <Outcome
        userInputs={userInputs}
      />
    </div>
  )
};


const STARTING_INPUT = {prisoners: {user1: [3,1,4,2], user2: [3,4,1,2]}};