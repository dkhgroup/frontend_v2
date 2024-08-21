import { createMarkup } from "@/components/createMarkup";
import { globalConfig } from "@/theme/globalConfig";
import { Box, Container } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect } from "react";

export default function AboutUsSection({post}){

    useEffect(()=>{
        window.onYouTubeIframeAPIReady = function () {
            const player = new YT.Player('player', {
                height: '390',
                width: '640',
                videoId: post?.data?.attributes?.link_youtube,
            });
        };
    },[])

    return(
        <Container maxWidth={globalConfig.maxWidth}>
            <Box bgcolor="#f2f2f2" my={3} borderRadius={2}>
                <Grid container spacing={2}>
                    <Grid xs={12} md={6} p={{xs: 1, md: 0}}>
                        <div 
                            id="player" 
                            style={{ width: '100%', height: '100%' }} 
                        />
                    </Grid>
                    <Grid xs={12} md={6}>
                        <Box 
                            py={{xs: 1, md: 3}} 
                            px={{xs: 2, md: 5}}
                        >
                            <Box dangerouslySetInnerHTML={createMarkup(post?.data?.attributes?.content)} sx={{
                                '& ul': {
                                    paddingLeft: '15px'
                                },
                                '& p': {
                                    paddingBottom: 2
                                }
                            }}/>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}