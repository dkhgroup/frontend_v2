import CryptoJS from "crypto-js";
import { globalConfig } from "@/theme/globalConfig";

export function decryptData(string){

    if(!string) return

    var bytes  = CryptoJS.AES.decrypt(string, globalConfig.encryptKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    
}