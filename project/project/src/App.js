import React, { useState } from "react";
import { Service as service } from "./Service.js";

import './App.css';

const SinglePayoff = ({userInput, onUserInput}) => {
  return (
    <input 
      type="text" 
      value={userInput} 
      placeholder="Search..."
      onChange={(e) => onUserInput(e.target.value)}/>
  )
}

const Outcome = ({userInputs}) => {
    return (<p>{service.determineOutputText(userInputs)}</p>);
}

const NormalFrom = ({userInputs}) => {
  return (
    <div className="card">
      <table>
        <tbody>
          <tr>
              <th colSpan="2" rowSpan="2"></th>
              <th colSpan="2">Community 2</th>
          </tr>
          <tr>
              <th>Abate</th>
              <th>Pollute</th>
          </tr>
          <tr>
              <th rowSpan="2">Community 1</th>
              <th>Abate</th>
              <td>{userInputs.user1[0]}, {userInputs.user2[0]}</td>
              <td>{userInputs.user1[1]}, {userInputs.user2[1]}</td>
          </tr>
          <tr>
              <th>Pollute</th>
              <td>{userInputs.user1[2]}, {userInputs.user2[2]}</td>
              <td>{userInputs.user1[3]}, {userInputs.user2[3]}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const ResourcePool = ({resources}) => {
  return (<div><span>Remaining resource pool at end of game: {resources}</span></div>)
}

const UserUtility = ({user1Utility, user2Utility, handleUtilityInputs}) => {
  return (
    <div className="card">
      <form className="utilityForm">
        Where does community one's value lie? 
        <div className="slidecontainer">
          <input type="range" value={user1Utility} onInput={(e) => handleUtilityInputs(0, parseInt(e.target.value))} min="60" max="140" className="slider"/>
          <label className="env">Environment</label>
          <label className="growth">Growth</label>
          <p>{user1Utility}</p>
        </div>
        Where does community two's value lie?
        <div className="slidecontainer">
          <input type="range" value={user2Utility} onInput={(e) => handleUtilityInputs(1, parseInt(e.target.value))} min="60" max="140" className="slider"/>
          <label className="env">Environment</label>
          <label className="growth">Growth</label>
          <p>{user2Utility}</p>
        </div>
      </form>
    </div>
  );
}

const Main = ({startingValue}) => {
  const [userInputs, setUserInputs] = useState({user1: [0,0,0,0], user2: [0,0,0,0]});
  const [resources, setResources] = useState(100);
  const [user1Utility, setUser1Utility] = useState(100);
  const [user2Utility, setUser2Utility] = useState(100);

  const handleChange = (userName, item, value) => {
    userInputs[userName][item] = parseInt(value);
    setUserInputs(userInputs);
  }

  const handleUtilityInputs = (user, utility) => {
    if (user) {
      setUser2Utility(utility);
      userInputs.user2 = [100-(utility), (utility)-100, 100-(utility), (utility)-100];
    } else {
      setUser1Utility(utility);
      userInputs.user1 = [100-(utility), 100-(utility), (utility)-100, (utility)-100]
    };
    setUserInputs(userInputs);
  }
  const submitUtilities = (event) => {
    event.preventDefault();
    setResources(service.calculateEndResources(user1Utility, user2Utility));
  }

  return (
    <div className="page">
      <div className="card">
        <UserUtility 
          user1Utility={user1Utility}
          user2Utility={user2Utility}
          handleUtilityInputs={handleUtilityInputs}
        />
      </div>
      <NormalFrom
        userInputs={userInputs}
      />
      <Outcome 
        userInputs={userInputs}
      />
      <ResourcePool 
        resources={resources}
      />
      <form onSubmit={(e) => submitUtilities(e)}>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
};


const STARTING_INPUT = {
  prisoners: {user1: [10,-40,40,-10], user2: [10,40,-40,-10]},
  commons: {user1: [3,1,4,2], user2: [3,4,1,2]},
  chicken: {user1: [3,1,4,2], user2: [3,4,1,2]},
  harmony: {user1: [3,1,4,2], user2: [3,4,1,2]},
  stagHunt: {user1: [3,1,4,2], user2: [3,4,1,2]},
};

export default function App() {
  return <Main startingValue={STARTING_INPUT} />;
}