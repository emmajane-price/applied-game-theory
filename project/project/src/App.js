
// Popover is based on: https://www.npmjs.com/package/material-ui-popup-state#popover-1
// Icon usage is based on: https://fontawesome.com/v5/docs/web/use-with/react
// Additional React usage help from: https://react.dev/learn
// Deployment is done with GH pages: https://github.com/gitname/react-gh-pages

import React, { useState } from "react";
import { FaHome, FaTree, FaInfoCircle } from "react-icons/fa";
import { Service as service } from "./Service.js";
import Popover from '@mui/material/Popover';
import {
  usePopupState,
  bindTrigger,
  bindPopover,
} from 'material-ui-popup-state/hooks'
import './App.css';


const NormalFrom = ({userInputs, selected}) => {
  return (
    <div>
      <h4>Game Normal Form &nbsp;
        <BasicPopover popoverContent={"Each cell in this table represents a possible game outcome and each number within the cell is the payoff " +
        "for that option for that community. For example if the Abate, Pollute is 20, -30 then Community 1 has a payoff " +
        "of 20 for that option and Community 2 has a payoff of -30. The darker cell is the Nash Equilibrium, or the option " +
        "where neither community can improve their expected payoff by picking a different strategy, assuming the other " +
        "community does not change their strategy."}/>
      </h4>
      <table>
        <tbody>
          <tr>
              <th colSpan="2" rowSpan="2"></th>
              <th colSpan="2">Community 1</th>
          </tr>
          <tr>
              <th>Abate</th>
              <th>Pollute</th>
          </tr>
          <tr>
              <th rowSpan="2">Community 2</th>
              <th>Abate</th>
              <td className={(selected === 0) ? 'dark-blue' : null}>{userInputs.user1[0]}, {userInputs.user2[0]}</td>
              <td className={(selected === 1) ? 'dark-blue' : null}>{userInputs.user1[1]}, {userInputs.user2[1]}</td>
          </tr>
          <tr>
              <th>Pollute</th>
              <td className={(selected === 2) ? 'dark-blue' : null}>{userInputs.user1[2]}, {userInputs.user2[2]}</td>
              <td className={(selected === 3) ? 'dark-blue' : null}>{userInputs.user1[3]}, {userInputs.user2[3]}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const Houses = ({communitySize}) => {
  let community = [];
  for (let i=0; i<communitySize; i++) {
    community.push(
      <i className='home'>
        <FaHome key={i} size='3rem'/>
      </i>
    )
  }
  return (community)
}

const Trees = ({resourceList}) => {
  const treeList = [];
  for (let i=0; i<resourceList.length; i++) {
    const pixelSize = ((0.5+resourceList[i].size)*16).toString() + 'px';
    if (resourceList[i].alive) {
      treeList.push(
        <FaTree className={'tree-item alive'} size={pixelSize}/>
      )
    } else {
      treeList.push(
        <FaTree className={'tree-item dead'} size={pixelSize}/>
      )
    }
  }
  return ( treeList )
}

const ResourcePool = ({resourceList}) => {
  return (
    <div>
      <div className="card">
        <h4>Resources &nbsp;
          <BasicPopover popoverContent={"The trees below represent the environmental resources available " +
          "to the two communities. After you jump forward 100 years the trees will change, either dying if " +
          "the environment is overused, or growing if underused."}/>
        </h4>
        <div className="resourcePool">
          <Trees resourceList={resourceList}/>
        </div>
      </div>
    </div>
  )
}
const BasicPopover = ({popoverContent}) => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover',
  })
  return (
    <span>
      <FaInfoCircle variant="contained" {...bindTrigger(popupState)}/>
      <Popover
        {...bindPopover(popupState)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
      <p className="popover" sx={{ p: 2 }}>{popoverContent}</p>
      </Popover>
    </span>
  )
}

const Button = ({label, className, onClick}) => {
  return <button className={'preset ' +className} onClick={() => onClick()}>{label}</button>
}

const Presets = ({startingInputs, selectedPreset, handlePresets}) => {
  const buttons = [];
  for (let i = 0; i < startingInputs.length; i++) {
    buttons.push(<Button key={i} 
      label={startingInputs[i].name}
      className={(selectedPreset === i)?'dark-blue':'light-blue'}
      onClick={() => handlePresets(i)}/>)
  }
  return (
    <div>
      <h4>Presets &nbsp;
          <BasicPopover popoverContent={"Each of the following presets represents a common " + 
          "game structure that can be meaningfully applied to climate change."}/>
        </h4>
      {buttons}
    </div>
  );
}

const UserUtility = ({utility, user, communitySize, handleUtilityInputs}) => {
  return (
    <form className="utilityForm">
      <div className="slidecontainer utilityContainer1">
        <Houses communitySize={communitySize}/>
        <h6>Where does community {user}'s value lie?</h6>
        <input type="range" value={utility} onInput={(e) => handleUtilityInputs(user - 1, parseInt(e.target.value))} min="60" max="140" className="slider"/>
        <span className="env">Environment</span>
        <span className="growth">Growth</span>
      </div>
    </form>
  )
}
const UtilitySection = ({user1Utility, user2Utility, handleUtilityInputs, communitySize}) => {
  return (
    <div>
      <h4>Community Utility &nbsp;
          <BasicPopover popoverContent={"Rather than use the presets above, you can also directly decide how  " + 
          "environmental or growth focused the communities are."}/>
        </h4>
      <UserUtility
        utility={user1Utility}
        user={1}
        communitySize={communitySize[0]}
        handleUtilityInputs={handleUtilityInputs}
      />
      <UserUtility
        utility={user2Utility}
        user={2}
        communitySize={communitySize[1]}
        handleUtilityInputs={handleUtilityInputs}
      />
    </div>
  );
}

const Main = ({startingInputs, startingResources}) => {
  const [userInputs, setUserInputs] = useState({user1: [0,0,0,0], user2: [0,0,0,0]});
  const [resourceList, setResourceList] = useState(startingResources);
  const [selected, setSelected] = useState(-1);
  const [selectedPreset, setSelectedPreset] = useState(-1);
  const [communitySize, setCommunitySize] = useState([20,20]);
  const [user1Utility, setUser1Utility] = useState(100);
  const [user2Utility, setUser2Utility] = useState(100);


  const handleUtilityInputs = (user, utility) => {
    if (resourceList !== startingResources){
      setResourceList(startingResources);
      setCommunitySize([20,20]);
    }
    if (user) {
      setUser2Utility(utility);
      userInputs.user2 = service.createUser2Form(utility);
    } else {
      setUser1Utility(utility);
      userInputs.user1 = service.createUser1Form(utility);
    };
    setUserInputs(userInputs);
    setSelected(service.determineOutputText(userInputs));
  }

  const handlePresets = (i) => {
    if (resourceList !== startingResources){
      setResourceList(startingResources);
      setCommunitySize([20,20]);
    }
    let [user1, user2] = service.calculateUtilityFromNash(startingInputs[i])
    setUser1Utility(user1);
    setUser2Utility(user2);
    setUserInputs(startingInputs[i].normalForm);
    setSelectedPreset(i);
    setSelected(startingInputs[i].nash);
  }

  const submitUtilities = (event) => {
    event.preventDefault();
    setResourceList(service.calculateEndResources(user1Utility, user2Utility, resourceList));
    setCommunitySize(service.calculateCommunitySize(user1Utility, user2Utility));
  }

  const resetUtilities = (event) => {
    event.preventDefault();
    setUserInputs({user1: [0,0,0,0], user2: [0,0,0,0]});
    setSelectedPreset(-1);
    setResourceList(startingResources);
    setCommunitySize([20,20]);
  }
  return (
    <div className="container">
      <div className="header">
        <h1>Climate Change Game Theory Simulator</h1>        
        <p> Click on each <FaInfoCircle/> to learn more about how each component works. 
            Once you're ready to try it out, click the Jump 100 Years button!</p>
      </div>
      <div className="card">
        <form className="submit" onSubmit={(e) => submitUtilities(e)}>
          <button type="submit"><h6>Jump 100 Years</h6></button>
        </form>
      </div>
      <div className="card">
        <form className="submit" onSubmit={(e) => resetUtilities(e)}>
          <button type="submit"><h6>Reset Game</h6></button>
        </form>
      </div>
      <div className="card normalForm">
        <NormalFrom
          userInputs={userInputs}
          selected={selected}
        />
      </div>
      <div className="card presets">
        <Presets 
          startingInputs={startingInputs}
          selectedPreset={selectedPreset}
          handlePresets={handlePresets}
        />
      </div>
      <div className="card utilityContainer">
        <UtilitySection 
          user1Utility={user1Utility}
          user2Utility={user2Utility}
          handleUtilityInputs={handleUtilityInputs}
          communitySize={communitySize}
        />
      </div>
      <div className="results">
        <ResourcePool
          resourceList={resourceList}
        />
      </div>
    </div>
  )
};

const STARTING_INPUT = [
  {name: "Prisoners", normalForm: {user1: [15,-30,30,-15], user2: [15,30,-30,-15]}, nash: 3},
  {name: "Commons", normalForm: {user1: [5,-10,10,-5], user2: [5,10,-10,-5]}, nash: 3},
  {name: "Chicken", normalForm: {user1: [15,-15,30,-30], user2: [15,30,-15,-30]}, nash: 1},
  {name: "Harmony", normalForm: {user1: [30,15,-15,-30], user2: [30,-15,15,-30]}, nash: 0},
  {name: "Stag Hunt", normalForm: {user1: [30,-30,15,-15], user2: [30,15,-30,-15]}, nash: 2},
];

const RESOURCE_LIST = service.generateResourceList();

export default function App() {
  return <Main 
    startingInputs={STARTING_INPUT}
    startingResources={RESOURCE_LIST}
  />;
}