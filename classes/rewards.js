import { world, ItemStack } from "@minecraft/server";
import { chestFormData } from "@minecraft/server-ui";

import { pickRandom } from "./scripts/helperFunctions.js";

const rewards = [];
const rewardOptions = [];

let roomsCompleted = 0;

let maxRewardCount = Math.floor((roomsCompleted+15)/5);
let maxRewardScore = maxRewardCount*3-4;



function reward() {
    roomsCompleted++;
    maxRewardCount = Math.floor((roomsCompleted+15)/5);
    maxRewardScore = maxRewardCount*3-4
    
    let rewardsScore = 0;
    let rewardsCount = 0;

    while (rewardsScore < maxRewardScore && rewardsCount < maxRewardCount) {
        let randItem = rewards[pickRandom(rewards.length)];
        if (randItem.score+currentScore < maxRewardScore && rewards.length < maxRewardCount) {
            rewardsScore += randItem.score;
            rewardsCount++;
            rewards.push[randItem];
        }
    }

    world.console.runCommandAsync(`titleraw as @a[tag=finishedRoom] at @s title {"rawtext": [{"text": "§aSELECT YOUR REWARD"}]}`);
}