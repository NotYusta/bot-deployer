import BDClient from "./structures/BDClient.js";
import Utils from "./Utils.js";

const config = Utils.getConfig();

new BDClient(config.token).execute();