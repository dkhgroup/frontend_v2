import Grid from '@mui/material/Unstable_Grid2';
import LoadingProductGridItem from './loadingProductGrid';

export default function LoadingProductSection() {
    return (
        <Grid container spacing={2}>
            <Grid xs={6} md={3}>
                <LoadingProductGridItem imgWidth={'100%'} imgHeight={230} />
            </Grid>
            <Grid xs={6} md={3}>
                <LoadingProductGridItem imgWidth={'100%'} imgHeight={230} />
            </Grid>
            <Grid xs={6} md={3}>
                <LoadingProductGridItem imgWidth={'100%'} imgHeight={230} />
            </Grid>
            <Grid xs={6} md={3}>
                <LoadingProductGridItem imgWidth={'100%'} imgHeight={230} />
            </Grid>
        </Grid>
    )
}