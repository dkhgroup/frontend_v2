import { createMarkup } from "@/components/createMarkup";
import { globalConfig } from "@/theme/globalConfig";
import { Box, Container } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';

export default function AboutUsSection({post}){
    return(
        <Container maxWidth={globalConfig.maxWidth}>
            <Box bgcolor="#f2f2f2" my={3} borderRadius={2}>
                <Grid container spacing={2}>
                    <Grid xs={12} md={6} p={{xs: 1, md: 0}}>
                        <iframe
                            src={`https://www.youtube.com/embed/${post?.data?.attributes?.link_youtube}`}
                            frameborder="0"
                            allowfullscreen
                            width="100%" 
                            height="100%"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerpolicy="strict-origin-when-cross-origin"
                        />
                    </Grid>
                    <Grid sx={12} md={6}>
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