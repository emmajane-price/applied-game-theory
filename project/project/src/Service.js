export const Service = {
  determineOutputText: (userInputs) => {
      if (userInputs?.user1 && userInputs?.user2) {
        const user1 = userInputs.user1;
        const user2 = userInputs.user2;
        const max1a = Math.max(user1[0],user1[2]);
        const max1b = Math.max(user1[1],user1[3]);
        const max2a = Math.max(user2[0],user2[1]);
        const max2b = Math.max(user2[2],user2[3]);
        let selected;
        
        if (max1a === user1[0] && max1b === user1[1] && max2a === user2[0] && max2b === user2[2]) {
          selected = 0;
        } else if (max1a === user1[2] && max1b === user1[3] && max2a === user2[1] && max2b === user2[3]) {
          selected = 3;
        } else if (max1a === user1[0] && max1b === user1[1] && max2a === user2[1] && max2b === user2[3]) {
          selected = 1;
        } else if (max1a === user1[2] && max1b === user1[3] && max2a === user2[0] && max2b === user2[2]) {
          selected = 2;
        }
        return selected;
      }
  },
  calculateEndResources: (user1Utility, user2Utility, startingResourceList) => {
    const endingResources = parseInt(2600 - ((((12.5*(user1Utility/100)) + (12.5*(user2Utility/100)))) * 100)),
      resourceList = JSON.parse(JSON.stringify(startingResourceList));
      console.log(endingResources)
    if (endingResources >= resourceList.length) {
      for (let i=resourceList.length; i<endingResources; i++) {
        resourceList.push({
          alive: 1,
          size: Math.random() * 2
        });
      }
    } else if (endingResources > 0) {
      for (let i=endingResources; i<resourceList.length; i++) {
        resourceList[i].alive = 0;
      }
    } else {
      for (let i=0; i<resourceList.length; i++) {
        resourceList[i].alive = 0;
      }
    }
    return resourceList;
  },
  calculateCommunitySize: (user1Utility, user2Utility) => {
    return [parseInt(20*user1Utility/100), parseInt(20*user2Utility/100)];
  },
  createUser2Form: (user2Utility) => {
    return [100-(user2Utility), (user2Utility)-100, 100-(user2Utility), (user2Utility)-100];
  },
  createUser1Form: (user1Utility) => {
    return [100-(user1Utility), 100-(user1Utility), (user1Utility)-100, (user1Utility)-100];
  },
  calculateUtilityFromNash: (presetGame) => {
    const absoluteVals = [Math.abs(presetGame.normalForm.user1[presetGame.nash]), Math.abs(presetGame.normalForm.user2[presetGame.nash])];
    switch (presetGame.nash) {
      case 0:
        return [100-absoluteVals[0], 100-absoluteVals[1]];
      case 1:
        return [100-absoluteVals[0], 100+absoluteVals[1]];
      case 2:
        return [100+absoluteVals[0], 100-absoluteVals[1]];
      case 3:
        return [100+absoluteVals[0], 100+absoluteVals[1]];
      default:
        return "how did you get here??"

    }
  },
  generateResourceList: () => {
    const resourceList = [];
    for(let i=0; i<100; i++) {
      resourceList.push({
        alive: 1,
        size: Math.random() * 2
      })
    }
    return resourceList;
  }
}