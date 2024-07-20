import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import FsLightbox from "fslightbox-react";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Box } from "@mui/system";
import { cdnImage } from "@/components/ui/cdnImage";
import Image from "next/image";

import Grid from '@mui/material/Unstable_Grid2';

async function formatSourceImage(data) {
    if (data?.length < 1) return []

    let result = []

    data.map(item => result.push(cdnImage(item?.url)))

    return result
}

export default function ProductGallery({ ...props }) {

    const [thumbsSwiper, setThumbsSwiper] = useState(0);

    const [sources, setSources] = useState([])

    const [toggler, setToggler] = useState(false);

    const matches = useMediaQuery('(min-width:920px)');

    const height = matches ? 660 : 'auto'

    const handleClick = async () => {
        const format = await formatSourceImage(props?.data?.gallary)
        setSources(format)
        setToggler(!toggler)
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid xs={12} md={1.5} sx={{height: height, overflow: 'hidden'}} order={{xs: 2, md: 1}}>
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={10}
                        slidesPerView={6}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Thumbs]}
                        className="product-gallery"
                        height={500}
                        direction={matches ? "vertical" : "horizontal"}
                    >
                        {props?.gallery && props?.gallery?.map((item, key) =>
                            <SwiperSlide key={key}>
                                <Image
                                    src={cdnImage(item?.url)}
                                    width={80}
                                    height={80}
                                    alt={props?.data?.name}
                                />
                            </SwiperSlide>
                        )}
                    </Swiper>
                </Grid>
                <Grid xs={12} md={10.5} order={{xs: 1, md: 2}}>

                    <Swiper
                        style={{
                            '--swiper-navigation-color': '#fff',
                            '--swiper-pagination-color': '#fff',
                        }}
                        spaceBetween={10}
                        slidesPerView={1}
                        navigation={true}
                        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                        modules={[FreeMode, Thumbs]}
                        className="product-thumbnail"
                    >
                        {props?.gallery && props?.gallery?.map((item, key) =>
                            <SwiperSlide key={key}>
                                <Box onClick={handleClick} sx={{cursor: 'pointer'}}>
                                    <Image
                                        src={cdnImage(item?.url)}
                                        width={item?.width ? item?.width - 100 : 700}
                                        height={item?.height - 100}
                                        alt={props?.data?.name}
                                    />
                                </Box>
                            </SwiperSlide>
                        )}
                    </Swiper>
                </Grid>
            </Grid>
            <FsLightbox
                toggler={toggler}
                sources={sources}
            />
        </>
    )
}