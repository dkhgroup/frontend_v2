import FsLightbox from "fslightbox-react";
import { useEffect, useState } from "react";

export default function LightBoxImg({
    toggler = false,
    productIndex = 1
}){

    const [sources, setSources] = useState([])

    useEffect(() => {
        const imgSources = document.querySelectorAll(".product-content img")
        if(imgSources?.length < 1) return
        const result = Array.from(imgSources).map(elem => elem.currentSrc)
        setSources(result)
    }, []);
    
    return(
        <FsLightbox
            toggler={toggler}
            sources={sources}
            slide={productIndex}
        />
    )
}