import Config from "../.config.json";

export default class Utils {
    constructor() {}

    static getConfig() {
        let data;
        Config.forEach(config => {
            
            data = config;
        })
        return data;
    }
}