import { Box, Link, Stack, Typography } from "@mui/material";
import Image from "next/image";
import FormatCurrency from "@/components/format/money";
import { globalConfig } from "@/theme/globalConfig";
import { useState } from "react";
import TagProduct from "./tag";
import Attribute from "./attributes";
import AddToCart from "./addToCart";
import { cdnImage } from "../ui/cdnImage";
import { selectItemEvent } from "../ga4";

export default function ProductGrid({ 
    data, 
    id,
    widthImg = 500,
    heightImg = 500,
    directionCartBtn = "row",
    justifyContentCartBtn = "space-between",
    alignItemsCartBtn="center",
    isModal=false,
    setOpen
}) {

    const [selectAttribute, setSelectAttribute] = useState()

    const [thumbnail, setThumbnail] = useState(cdnImage(data?.thumbnail?.data?.attributes?.url,"/assets/default-product-thumbnail.png"))

    const handleClick = () => {

        // handle ga4 select item
        selectItemEvent(data)

        window.open(`/san-pham/${data?.slug}`,"_self")
    }

    return (
        <Stack spacing={0} sx={styles.mainWrap}>
            {/* <Link href={`/san-pham/${data?.slug}`}> */}
                <Box 
                    bgcolor={`${data?.bg_color_thumbnail}`} 
                    sx={styles.mainBoxImg} 
                    className="blog-cat-thumbnail" 
                    onClick={handleClick}
                >
                    <Image
                        src={thumbnail}
                        width={widthImg}
                        height={heightImg}
                        alt={data?.thumbnail?.data?.attributes?.alternativeText || "Ảnh sản phẩm DKH Group"}
                        className="thumbnail"
                    />
                    <Stack sx={styles.tag} direction={"row"} justifyContent={"center"} alignItems={"center"} spacing={1}>
                        {data?.tag && <TagProduct datas={data?.tag} />}
                    </Stack>

                    {data?.tag_img?.data &&
                        <Box
                            position={"absolute"}
                            bottom={"5px"}
                            left={"10px"}
                            width={200}
                            height={47}
                            maxWidth={"100%"}
                            sx={{
                                '& img': {
                                    maxWidth: 'calc(100% - 30px)',
                                    objectFit: 'contain'
                                }
                            }}
                        >
                            <Image
                                src={`${globalConfig.img_url}${data?.tag_img?.data?.attributes?.url}`}
                                width={200}
                                height={47}
                                alt={data?.thumbnail?.data?.attributes?.alternativeText || "Khuyến mại DKH Group"}
                            />
                        </Box>
                    }
                </Box>
            {/* </Link> */}

            <Box sx={styles.content}>
                <Stack
                    direction={"row"}
                    spacing={.3}
                    maxWidth={"100%"}
                    sx={{
                        overflowX: "auto"
                    }}
                >
                    {data?.attributes && data?.attributes?.map(item =>
                        <Attribute
                            key={item?.id}
                            item={item}
                            selectAttribute={selectAttribute}
                            setSelectAttribute={setSelectAttribute}
                            setThumbnail={setThumbnail}
                        />
                    )}

                </Stack>

                <Stack spacing={0} my={2}>
                    <Link href={`/san-pham/${data?.slug}`}>
                        <Typography
                            variant="h3"
                            component={"h3"}
                            sx={styles.title}
                            className="product-name"
                        >
                            {data?.name}
                        </Typography>
                    </Link>
                    <Typography variant="body2" sx={styles.feature}>
                        {data?.expert}
                    </Typography>
                </Stack>

                <Stack
                    spacing={2}
                    direction={{
                        xs: "column",
                        md: directionCartBtn
                    }}
                    justifyContent={justifyContentCartBtn}
                    alignItems={alignItemsCartBtn}
                >
                    <Typography variant="h4" component={"h4"} sx={styles.price}>
                        <FormatCurrency data={data?.price} />
                    </Typography>
                    {selectAttribute && <AddToCart selectAttribute={selectAttribute} data={data} id={id}/>}
                </Stack>

            </Box>
        </Stack>
    )
}

const styles = {
    mainWrap: {
        width: '100%',
        height: '100%',
        mb: 2,
        bgcolor: '#fff',
        borderRadius: 2,
        boxShadow: "rgb(145 158 171 / 30%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px !important"
    },
    mainBoxImg: {
        width: '100%',
        height: 'auto',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        position: 'relative',
        cursor: "pointer",
        '& img.thumbnail': {
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            objectPosition: 'top left'
        }
    },
    tag: {
        position: 'absolute',
        top: '15px',
        right: '15px',
        '& > div': {
            height: 20,
            minWidth: 50,
        }
    },
    content: {
        px: {
            xs: 1,
            md: 2
        },
        py: 2,
        bgcolor: '#fff',
    },
    title: {
        fontSize: 16,
        fontWeight: 700,
        lineHeight: 1.25,
        letterSpacing: -0.5,
        color: '#422F2C'
    },
    feature: {
        letterSpacing: -0.5
    },
    price: {
        fontSize: 20,
        fontWeight: 700,
        letterSpacing: -1,
        color: '#222',
        lineHeight: 1
    },
    oldPrice: {
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: -1,
        textDecoration: 'line-through',
        color: '#666',
        lineHeight: 1
    }
}