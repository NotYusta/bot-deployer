import BDClient from "./structures/BDClient.js";
import Utils from "./Utils.js";

const config = Utils.getConfig();
const client = new BDClient(config.token);
client.execute();