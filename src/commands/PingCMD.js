import AbstractCMD from "../structures/AbstractCMD.js";
import { Message, CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

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

    /**
     * 
     * @param { SlashCommandBuilder } cmd
     */
    
    getInteractionData() {
        const cmd = new SlashCommandBuilder()
        .setName('ping')
        .setDescription('replies with Pong!')

        return cmd.toJSON();
    }
}