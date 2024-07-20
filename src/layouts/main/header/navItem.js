import { Typography, Box, Link } from "@mui/material";
import { useRouter } from "next/router";

export default function NavItem({item}){
    const router = useRouter()

    const children = item?.attributes?.children?.data

    return(
        <Box 
            component={"li"}
        >
            <Link
                href={children?.length > 0 ? "" : item?.attributes?.url}
                className={router?.asPath === item?.attributes?.url ? "active" : ""} 
            >
                <Typography 
                    variant="body2" 
                    component={"span"}
                    style={styles.first} 
                    className={router?.asPath === item?.attributes?.url ? "active" : ""} 
                >
                    {item?.attributes?.title}
                </Typography>
            </Link>
            {
                children?.length > 0 &&
                <ul>
                    {children?.map(item => 
                        <li key={item.id}>
                            <Link href={item?.attributes?.url}>
                                <Typography 
                                    variant="body2" 
                                    component={"span"}
                                    style={styles.first} 
                                    className={router?.asPath === item?.attributes?.url ? "active" : ""} 
                                >
                                    {item?.attributes?.title}
                                </Typography>
                            </Link>
                        </li>
                    )}
                </ul>
            }
        </Box>
    )
}

const styles = {
    first: {
        fontWeight:700,
        textTransform: 'uppercase',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
    }
}