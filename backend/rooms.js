import { room, roomComponents, roomWaveData, mobData } from "./roomsClass.js";

import abandonedVoidMineshaft from "./rooms/Abandoned_Void_Mineshaft";

const rooms = new Map();

function addRoom(roomToAdd) {
    rooms.set(roomToAdd.name.replaceAll(" ", "_"), roomToAdd);
}

function removeRoom(roomToRemove) {
    rooms.delete(roomToRemove.name.replaceAll(" ", "_"));
}

//#region ADDING ROOMS

addRoom(abandonedVoidMineshaft);

//#endregion

const roomsLength = roomData.files.length;

for (room of rooms) {
    const parsedRoom = JSON.parse(room, "utf-8");
    const parsedComponents = [];
    if (parsedRoom.components) {
        for (const component of parsedRoom.components) {
            if (component.type === "roomWaveData") {
                const mobArr = component.mobs.map(mob => {
                    console.log(`Passing ${mob} to mobData constructor`);
                    return new mobData(mob)
                });
                parsedComponents.push(new roomWaveData(...component, mobs = mobArr));
            }
        }
    }
    
    addRoom(new room(
        parsedRoom.name,
        parsedRoom.description,
        parsedRoom.type,
        parsedRoom.dimension,
        parsedRoom.spawnPoint?.x ?? 0,
        parsedRoom.spawnPoint?.y ?? 64,
        parsedRoom.spawnPoint?.z ?? 0,
        parsedRoom.facing?.x ?? 0,
        parsedRoom.facing?.y ?? 64,
        parsedRoom.facing?.z ?? 0,
        parsedComponents
    ));
}

export { rooms, addRoom, removeRoom };