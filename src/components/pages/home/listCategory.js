import { Chip, Stack } from "@mui/material";

export default function ListCategories({...props}){

    const handleChange = async (id) => {
        props.setTab(id)
    }

    return(
        <Stack 
            direction={"row"} 
            justifyContent={"center"} 
            alignItems={"center"} 
            spacing={1}
        >
            <Chip 
                label="Tất cả" 
                color={props.tab === 0 ? "primary" : "secondary"}
                sx={styles.chip}
                onClick={() => handleChange(0)}
            />
            {props.categories && props.categories?.data?.map(item => 
                <Chip 
                    label={item?.attributes?.name}
                    key={item.id}
                    color={props.tab === item?.id ? "primary" : "secondary"}
                    sx={styles.chip}
                    onClick={() => handleChange(item.id)}
                />
            )}
        </Stack>
    )
}

const styles = {
    chip: {
        cursor: 'pointer',
        px: 3,
        py: 2.2,
        fontWeight: 700
    }
}