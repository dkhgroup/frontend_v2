import { Box, Icon, SvgIcon } from "@mui/material"

function createMarkup(icon) {
    return {__html: icon};
}

export default function SvgIconDkh({icon,color,width=20,height=20}){

    const thisIcon = JSON.parse(icon).component
    
    return (
        <Box className="svg-icon">
            {thisIcon && 
                <Box 
                    width={width} 
                    height={height} 
                    color={color || "#d30000"}
                    dangerouslySetInnerHTML={createMarkup(thisIcon)} 
                />
            }
        </Box>
    )
}