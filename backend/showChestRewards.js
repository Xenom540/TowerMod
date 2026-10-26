import { ItemStack, world } from '@minecraft/server';
import { ChestFormData} from '@minecraft/server-ui';
import { pickRandom } from './helperFunctions'

const overworld = world.getDimension("overworld");

function giveItem(player, item) {
    const inventory = player.getComponent("minecraft:inventory").container;
    const itemStack = new ItemStack(item.cmdName, item.stackSize);

    inventory.addItem(itemStack);
}

async function showChestUI(player, itemsList) {
    //create the chest menu
    const form = new ChestFormData().title("SELECT YOUR REWARD").size("small");

    for (let i = 0; i < itemsList.length; i++) {
        
        form.button(
            i,
            `${itemsList[i].choiceFormat}${itemsList[i].name}`,
            [
                `${itemsList[i].type}`, 
                `${itemsList[i].description}`, 
                `${itemsList[i].damage}`,
                `${itemsList[i].enhancements}`
            ],
            `${itemsList[i].texturePath}`,
            itemsList[i].stackSize
        );
    }

    const response = await form.show(player);

    const selectedIndex = response.selection;
    const chosenReward = itemsList[selectedIndex];
    
    if (chosenReward) {
        giveItem(player, chosenReward);
        overworld.runCommand(`titleraw ${player.name} actionbar {"rawtext": [{"text": "Chosen item: ${chosenReward.name}"}]}`);
        return;
    }
    if (response.canceled) {
        const randReward = pickRandom(itemsList.length);
        giveItem(player, itemsList[randReward]);
        overworld.runCommand(`titleraw ${player.name} actionbar {"rawtext": [{"text": "Random Item Selected: ${itemsList[randReward].name}"}]}`);
        return;
    }
}

export { showChestUI, giveItem };