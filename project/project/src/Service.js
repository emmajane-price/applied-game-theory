export const Service = {
  determineOutputText: (userInputs) => {
      if (userInputs?.user1 && userInputs?.user2) {
        const user1 = userInputs.user1;
        const user2 = userInputs.user2;
        const max1a = Math.max(user1[0],user1[2]);
        const max1b = Math.max(user1[1],user1[3]);
        const max2a = Math.max(user2[0],user2[1]);
        const max2b = Math.max(user2[2],user2[3]);
        let text = "";
        
        if (user1[0] === max1a && user1[1] === max1b) {
          text = text + " \n User 1 dominant strategy is abate";
        } else if (user1[2] === max1a && user1[3] === max1b) {
          text = text + " \n User 1 dominant strategy is pollute";
        } else {
          text = text + " \n User 1 has not dominant strategy";
        }
        if (user2[0] === max2a && user2[2] === max2b) {
          text = text + " \n User 2 dominant strategy is abate";
        } else if (user2[1] === max2a && user2[3] === max2b) {
          text = text + " \n User 2 dominant strategy is pollute";
        } else {
          text = text + " \n User 2 has not dominant strategy";
        }
        if (max1a === user1[0] && max1b === user1[1] && max2a === user2[0] && max2b === user2[2]) {
          text = text + " \n Abate, Abate is the dominant strategy";
        } else if (max1a === user1[2] && max1b === user1[3] && max2a === user2[1] && max2b === user2[3]) {
          text = text + " \n Pollute, Pollute is the dominant strategy";
        } else if (max1a === user1[0] && max1b === user1[1] && max2a === user2[1] && max2b === user2[3]) {
          text = text + " \n Abate, Pollute is the dominant strategy";
        } else if (max1a === user1[2] && max1b === user1[3] && max2a === user2[0] && max2b === user2[2]) {
          text = text + " \n Pollute, Abate is the dominant strategy";
        } else {
          text = text + " \n There is no dominant strategy";
        }
        return text;
      }
  },
  calculateEndResources: (user1Utility, user2Utility) => {
    const endingResources = 2600 - ((((12.5*(user1Utility/100)) + (12.5*(user2Utility/100)))) * 100)
    return endingResources;
  }
}