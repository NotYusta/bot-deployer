import { PingCMD } from "../commands/index.js";
import { Message, CommandInteraction } from "discord.js";
import { Routes } from "discord-api-types/v9";
import { REST } from "@discordjs/rest";
import Utils from "../Utils.js";

export default class BDCommands {
    constructor() {
        this.commands = new Map();
        this.prefix = Utils.getConfig().prefix;
        this.registerCommands();
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

    registerCommands() {
        this.commands.set("ping", new PingCMD());
    }
    /**
     * 
     * @param { REST } rest 
     * @param { String } clientID
     * 
     */
    async registerInteraction(rest, clientID) {
        const commandsData = [];

        await this.commands.forEach(async command => {
            const data = await command.getInteractionData();

            console.log(`Registering ${this.prefix}${data.name.toUpperCase()} command..`);

            commandsData.push(data);

            console.log(`Registered ${this.prefix}${data.name.toUpperCase()} command.`);
        });


        try {
            console.log('Registering application commands..');
            await rest.put(
                Routes.applicationCommands(clientID), {body: commandsData }
            );
            console.log('Successfully registered all commands');
        } catch (error) {
            throw new Error(error);
        }
    }
}