import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialMiniCart = {
    show: false,
    item: {
        thumbnail: null,
        productName: "",
        property: "Xanh Navi",
        qty: 1,
        price: 200
    }
}

export const minicart = createSlice({
    name: 'minicart',
    initialState: initialMiniCart,
    reducers: {
        hideMiniCart: (state, action) => {
            state.show = false;
            return
        },
        showMiniCart: (state, action) => {
            state.show = true;
            state.item = action.payload
        }
    }
})

export const {hideMiniCart, showMiniCart} = minicart.actions;
export default minicart.reducer;