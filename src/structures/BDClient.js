import { Client, Intents} from "discord.js";
import BDCommands from "./BDCommands.js";

export default class BDClient extends Client {
    
    /**
     * 
     * @param { String } token 
     */
    constructor(token) {
        super({
            intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
        });
        this.token = token;
    }
    async init() {
        this.on('ready', () => {
            console.log(`Logged in as ${this.user.tag}`);
        });

        this.on("interactionCreate", interaction => {
            if (!interaction.isCommand()) return;
            new BDCommands().execute(interaction);
        })
        this.on("messageCreate", msg => {
            new BDCommands().execute(msg);
        })
    }
    async execute() {
        this.init();
        this.login(this.token);
    }
}