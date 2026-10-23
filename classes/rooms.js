import { room, roomComponents, roomWaveData, mobData } from "./roomsClass.js";

const rooms = new Map();

function addRoom(roomToAdd) {
    rooms.set(roomToAdd.name.replaceAll(" ", "_"), roomToAdd);
}

function removeRoom(roomToRemove) {
    rooms.delete(roomToRemove.name.replaceAll(" ", "_"));
}

const roomData = (await getRooms());
const roomsLength = roomData.files.length;

for (let i = 0; i < roomsLength; i++) {
    const parsedRoom = JSON.parse( 
        await fs.readFile(
            `./Rooms/${
                (
                    roomData.files[i]
                )
            }`
        ),
        
        "utf-8" 
    );
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

import fs from 'fs/promises';

async function getRooms() {
    try {
        const files = await fs.readdir('.Rooms');
        return { length: files.length, files: files };
    } catch (error) {
        console.error('Error occurred while reading folder length:', error);
        return { length: 0, files: [] };
    }
}

export { rooms, addRoom, removeRoom };