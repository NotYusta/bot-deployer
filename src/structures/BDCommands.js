import { PingCMD } from "../commands/index.js";
import { Message, CommandInteraction } from "discord.js";
import Utils from "../Utils.js";

export default class BDCommands {
    constructor() {
        this.commands = new Map();
        this.prefix = Utils.getConfig().prefix;

        this.commands.set("ping", new PingCMD());
    }
    execute(type) {
        if(type instanceof Message) {
            this.handleCommand(type);
        }
        if(type instanceof CommandInteraction) {
            this.handleInteraction(type);
        }
    }

    /**
     * 
     * @param { Message } message 
     */
    handleCommand(message) {
        const args = message.content.slice(this.prefix.length).trim().split(/ + /g);
        const command = args.shift().toLowerCase();
        const cmdFromMap = this.commands.get(command);
        if(!cmdFromMap)
            return;

        console.log(`${message.author.tag} executed ${message} command`);
        cmdFromMap.executeCommand(message);
    }

    /**
     * 
     * @param { CommandInteraction } commandInteraction 
     */

    handleInteraction(commandInteraction) {
        const interactionName = commandInteraction.commandName;
        const cmdFromMap = this.commands.get(interactionName);
        if(!cmdFromMap)
            return;

        console.log(`${commandInteraction.user.tag} executed ${commandInteraction} command interaction`);
        cmdFromMap.executeInteraction(commandInteraction);
    }
}