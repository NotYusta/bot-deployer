import { Message, CommandInteraction } from "discord.js";

export default class AbstractCMD {
    /**
     * 
     * @param { Message } message 
     */
    async executeCommand(message) {
        throw new Error('Method execute command must be implemented!');
    }
    /**
     * 
     * @param { CommandInteraction } interaction 
     */
    async executeInteraction(interaction) {
        throw new Error('Method interaction command must be implemented!');
    }
}