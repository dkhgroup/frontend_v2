import { globalConfig } from "@/theme/globalConfig";

export function cdnImage(url,defaultImg = '/default.jpg'){

    if(url) return url;

    return defaultImg

}