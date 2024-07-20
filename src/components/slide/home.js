import { Box, useMediaQuery } from "@mui/material"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SlideImage from "./image/default";
import DefaultSlide from "./default";

function calcHeight(width,height){
    return (380 / width) * height
}

export default function HomeSlide({datas}){
    const match = useMediaQuery('(max-width:720px)')
    return(
        <Box 
            sx={{
                background: 'radial-gradient(50% 50% at 50% 50%, #FFFFFF 0%, #F2F2F2 100%)',
            }}
        >
            <Swiper
                    slidesPerView={1}
                    spaceBetween={0}
                    loop={true}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={!match}
                    modules={[Autoplay, Pagination, Navigation]}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: true,
                        pauseOnMouseEnter: true
                    }}
                >
                    {datas?.data?.length > 0 && datas?.data?.map(item =>
                        <SwiperSlide key={item.id}>
                            {item?.attributes?.customize ? 
                                <SlideImage item={item} />
                                :
                                <DefaultSlide 
                                    title={item?.attributes?.title || ""}
                                    excerpt={item?.attributes?.excerpt || ""}
                                    description={item?.attributes?.description || ""}
                                    detailBtn={true}
                                    url={item?.attributes?.image?.data?.attributes?.url}
                                    link={item?.attributes?.link || "#"}
                                    width={380}
                                    height={calcHeight(
                                        item?.attributes?.image?.data?.attributes?.width,
                                        item?.attributes?.image?.data?.attributes?.height
                                    )}
                                />
                            }
                        </SwiperSlide>
                    )}
                </Swiper>
        </Box>
    )
}