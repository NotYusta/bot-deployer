import Config from "../.config.json";

export default class Utils {
    static getConfig() {
        let data;
        Config.forEach(config => {
            
            data = config;
        })
        return data;
    }
}