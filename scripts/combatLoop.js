import { world } from "@minecraft/server";
import { rooms, addRoom, removeRoom } from "./classes/rooms.js";
import { pickRandom } from "./scripts/helperFunctions.js";

const roomKeys = Array.from(rooms.keys());

function tpToRoom() {
    const randNum = pickRandom(roomKeys.length);
    const nextRoom = rooms.get(roomKeys[randNum-1]);
    world.runCommand(`tp @a[tag=nextRoom] ${nextRoom.spawnPoint.x} ${nextRoom.spawnPoint.y} ${nextRoom.spawnPoint.z}`);
    world.runCommand(`titleraw @a[tag=nextRoom] {"rawtext": [You have been teleported to ${nextRoom.name} at ${nextRoom.spawnPoint.x} ${nextRoom.spawnPoint.y} ${nextRoom.spawnPoint.z}]}`);
}