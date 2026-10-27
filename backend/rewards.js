import { world, ItemStack } from "@minecraft/server";
import { ChestFormData } from "@minecraft/server-ui";

import { pickRandom } from "./helperFunctions.js";
import { showChestUI, giveItem } from "./backend/showChestRewards.js";

const rewards = [];

// #region REWARD OPTIONS

function calcReward() {
    const rewardOptions = [];

    let maxRewardCount = 3;
    let maxRewardScore = 5;
    let roomsCompleted = 0;
    
    roomsCompleted++;
    maxRewardCount = Math.floor((roomsCompleted+15)/5);
    maxRewardScore = maxRewardCount*3-4
    
    let rewardsScore = 0;
    let rewardsCount = 0;

    while (rewardsScore < maxRewardScore && rewardsCount < maxRewardCount) {
        if (maxRewardScore === 0) break;
        let remainingScore = maxRewardScore - rewardsScore;
        let randItem;
        
        if (remainingScore > 5) randItem = rewards[pickRandom(rewards.length)];
        else {
                const filteredRewards = rewards.filter(e => e.score <= remainingScore);
                if (filteredRewards.length <= 0) break;
                let randNumber = pickRandom(filteredRewards.length-1);
                while (randNumber > filteredRewards.length) {
                    randNumber = pickRandom(filteredRewards.length-1);
                }
                randItem = filteredRewards[randNumber]
            };
        if (randItem.score+rewardsScore < maxRewardScore && rewardOptions.length < maxRewardCount) {
            rewardsScore += randItem.score;
            rewardsCount++;
            rewardOptions.push(randItem);
        }

        remainingScore = maxRewardScore - rewardsScore;
    }
    const finishedPlayers = world.getAllPlayers().filter(p => p.hasTag("completedRoom"));

    for (const player of finishedPlayers) {
        showChestUI(player, rewardOptions);
    }
}

// #endregion

export { calcReward };