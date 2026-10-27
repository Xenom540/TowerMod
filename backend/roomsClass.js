import { Vector3 } from "@minecraft/server";

class room {
    constructor(name, desc, type, dimension, spawnPointx, spawnPointy, spawnPointz, facingx, facingy, facingz, components = []) {
        this.name = name;
        this.description = desc;
        this.type = type;
        this.dimension = dimension;
        this.spawnPoint = new Vector3(spawnPointx, spawnPointy, spawnPointz);
        this.facing = new Vector3(facingx, facingy, facingz);
        this.components = new Map();
        for (const component of components) {
            this.components.set(component.constructor, component);
        }
    }

    getComponent(ComponentClass) {
        return this.components.get(ComponentClass);
    }
    hasComponent(ComponentClass) {
        return this.components.has(ComponentClass);
    }
}

class mobData {
    constructor(data = {}) {
        this.name = data.name;
        this.type = data.type;
        this.wave = data.wave;
        this.location = new Vector3(
            Number(data.location?.x), 
            Number(data.location?.y), 
            Number(data.location?.z));
        this.facing = new Vector3(
            Number(data.facing?.x), 
            Number(data.facing?.y), 
            Number(data.facing?.z));
        console.log(`Location: ${this.location}, Facing: ${this.facing}`);
    }
}

class roomComponents {};

class roomWaveData extends roomComponents {
    constructor({mobs = [], waves = 1, rewards /*going to be a new class ill implement in the future*/, baseDifficulty = "easy"}) {
        super();
        this.mobs = mobs;
        this.waves = waves;
        this.rewards = rewards;
        this.baseDifficulty = baseDifficulty;
        this.type = "roomWaveData";
    }
}

export { room, roomComponents, roomWaveData, mobData };