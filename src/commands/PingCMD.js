import AbstractCMD from "../structures/AbstractCMD.js";
import { Message, CommandInteraction } from "discord.js";

export default class PingCMD extends AbstractCMD {

    /**
     * 
     * @param { Message } message 
     */

    async executeCommand(message) {
        await message.reply('pong!');
    }

    /**
     * 
     * @param { CommandInteraction } interaction 
     */

    async executeInteraction(interaction) {
        await interaction.reply('pong!');
    }
}