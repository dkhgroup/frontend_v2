import { globalConfig } from "@/theme/globalConfig";
import Script from "next/script";
import { useEffect } from "react";

export const GoogleTagInit = () => {

    useEffect(() => {
        // Đây là nơi bạn thêm các sự kiện cụ thể
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', globalConfig.gtagId); // Thay AW-CONVERSION_ID bằng ID thẻ Google Ads của bạn
    }, []);

  return (
    <>
        <Script
        id="google-ads-script"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${globalConfig.gtagId}`} 
        />
    </>
 );
}

