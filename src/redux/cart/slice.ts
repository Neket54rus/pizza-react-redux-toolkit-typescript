import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { calcTotalPrice } from "../../utils/calcTotalPrice"
import { getCartFromLS } from "../../utils/getCartFromLS"
import { CartItem, CartSliceState } from "./types"

const initialState: CartSliceState = getCartFromLS()

const cartSlice = createSlice({
	name: "cart",
	initialState: initialState,
	reducers: {
		addItem: (state, pizzaObj: PayloadAction<CartItem>) => {
			const findItem = state.items.find(obj => {
				if (obj.id === pizzaObj.payload.id) {
					return obj
				}
			})

			if (findItem) {
				findItem.count++
			} else {
				state.items.push({
					...pizzaObj.payload,
					count: 1,
				})
			}

			state.totalPrice = calcTotalPrice(state.items)
		},
		minusItem: (state, pizzaId: PayloadAction<string>) => {
			const findItem = state.items.find(obj => {
				if (obj.id === pizzaId.payload) {
					return obj
				}
			})

			if (findItem) {
				findItem.count--
			}
		},
		removeItem: (state, pizzaId: PayloadAction<string>) => {
			state.items = state.items.filter(obj => obj.id !== pizzaId.payload)
		},
		clearItems: state => {
			state.items = []
			state.totalPrice = 0
		},
	},
})

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions
export default cartSlice.reducer
