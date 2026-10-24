import { world, ItemStack } from "@minecraft/server";
import { chestFormData } from "@minecraft/server-ui";

import { pickRandom } from "./scripts/helperFunctions.js";

const rewards = [];
const rewardOptions = [];
let maxRewardCount = 3;
let maxRewardScore = maxRewardCount*3-4;

function reward() {
    let rewardScore = 0;
    let rewardCount = 0;
    
    while (rewardScore < maxRewardScore && rewardCount < maxRewardCount) {
        let randItem = rewards[pickRandom(rewards.length)];
        if (randItem.score+currentScore < maxRewardScore && rewards.length < maxRewardCount) {
            
        }
    }
    world.console.runCommandAsync(`titleraw as @a[tag=finishedRoom] at @s title {"rawtext": [{"text": "§aSELECT YOUR REWARD"}]}`);
}