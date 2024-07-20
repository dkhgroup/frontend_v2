import { Badge, Button, Menu } from "@mui/material";
import { styled } from '@mui/material/styles';
import { IconShoppingBag } from "@tabler/icons-react";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import WidgetCart from "@/components/cart/widgetCart";

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 18,
        border: `1spx solid ${theme.palette.background.paper}`,
        padding: '0 2px',
        fontSize: '10px'
    },
}));

export default function CartIcon({iconSize = 28, iconColor = "#422F2C"}) {
    const { cart, isLoading } = useCart()

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                sx={{ minWidth: '40px', mr: 1 }}
                id="cart-button"
                aria-controls={open ? 'cart-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <StyledBadge
                    badgeContent={cart?.cart_items?.length || 0}
                    color="primary"
                >
                    <IconShoppingBag
                        size={iconSize}
                        color={iconColor}
                    />
                </StyledBadge>
            </Button>
            <Menu
                id="cart-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'cart-button',
                }}
                disableScrollLock={true}
                sx={{
                    '& ul': {
                        paddingBottom: 0
                    }
                }}
            >
                <WidgetCart setShow={handleClose} />
            </Menu>
        </>
    )
}