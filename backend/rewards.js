import { world, ItemStack } from "@minecraft/server";
import { ChestFormData } from "@minecraft/server-ui";

import { pickRandom } from "./scripts/helperFunctions.js";

const rewards = [];
const rewardOptions = [];

let roomsCompleted = 0;

// #region REWARD OPTIONS

let maxRewardCount = 3;
let maxRewardScore = 5;

function reward() {
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
                randItem = filteredRewards[pickRandom(filteredRewards.length)]
            };
        if (randItem.score+rewardsScore < maxRewardScore && rewardOptions.length < maxRewardCount) {
            rewardsScore += randItem.score;
            rewardsCount++;
            rewardOptions.push(randItem);
        }

        remainingScore = maxRewardScore - rewardsScore;
    }

    const overworld = world.getDimension("Overworld");
    overworld.runCommand(`titleraw as @a[tag=finishedRoom] at @s title {"rawtext": [{"text": "§aSELECT YOUR REWARD"}]}`);
}

// #endregion