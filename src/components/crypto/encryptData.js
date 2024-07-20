import CryptoJS from "crypto-js";
import { globalConfig } from "@/theme/globalConfig";

export function encryptData(datas){
    return CryptoJS.AES.encrypt(JSON.stringify(datas), globalConfig.encryptKey).toString();
}