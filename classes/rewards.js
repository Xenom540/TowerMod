import { world } from "@minecraft/server";
import { pickRandom } from "./scripts/helperFunctions.js";

const rewards = [];
const rewardOptions = [];

function reward() {
    for (let i = 0; i < 5; i++) {
        rewardOptions.push(rewards[pickRandom(rewards.length)]);
    }
    world.console.runCommandAsync(`titleraw as @a[tag=finishedRoom] at @s title [{"rawtext": {"text": "§aSELECT YOUR REWARD"}}]`);
}