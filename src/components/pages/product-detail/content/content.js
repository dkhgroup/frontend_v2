import { createMarkup } from "@/components/createMarkup";
import { Box, Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import FsLightbox from "fslightbox-react";
import { getSourceImages } from "@/components/format/sourceImg";

export default function ContentProduct({ data }) {

    const [readMore, setReadmore] = useState(false)

    const [lightboxController, setLightboxController] = useState({
        toggler: false,
        slide: 1
    });

    const content = data.content
    const sources = getSourceImages(content)

    const handleClick = async (e) => {
        const el = e.target
        if (!el || el.tagName != "IMG") return
        const number = sources.findIndex(i => i == el.currentSrc)
        if (number < 0) return
        setLightboxController({
            toggler: !lightboxController.toggler,
            slide: +number + 1
        });
    }


    return (
        <>
            <Box
                maxHeight={readMore ? 'unset' : `${data?.height_readmore_area}px`}
                overflow={'hidden'}
                position={"relative"}
            >
                <Box
                    dangerouslySetInnerHTML={createMarkup(data?.content)}
                    className={"product-content"}
                    onClick={handleClick}
                />

                <Stack
                    sx={{
                        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) -4.05%, #fff 90.67%)'
                    }}
                    justifyContent={"center"}
                    alignItems={"center"}
                    position={readMore ? 'relative' : 'absolute'}
                    bottom={0}
                    left={0}
                    right={0}
                    height={'80px'}
                    width={'100%'}
                >
                    <Button
                        variant="contained"
                        onClick={() => setReadmore(!readMore)}
                        color="secondary"
                        sx={{
                            px: 8,
                            borderRadius: 5
                        }}
                    >
                        {readMore ? 'Thu gọn' : 'Xem thêm'}
                    </Button>
                </Stack>

            </Box>

            <FsLightbox
                toggler={lightboxController.toggler}
                sources={sources}
                slide={lightboxController.slide}
            />    
        </>
    )
}