import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { fetchPizzas } from "./asyncActions"
import { Pizza, PizzaSliceState, Status } from "./types"

const initialState: PizzaSliceState = {
	items: [],
	status: Status.LOADING,
}

const pizzasSlice = createSlice({
	name: "pizzas",
	initialState,
	reducers: {
		setItems: (state, pizzasObj: PayloadAction<Pizza[]>) => {
			state.items = [...pizzasObj.payload]
		},
		plusCount: (state, pizzaID) => {
			state.items.forEach(item => {
				if (item.id === pizzaID.payload) {
					item.count += 1
				}
			})
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchPizzas.pending, state => {
			state.status = Status.LOADING
			state.items = []
		})
		builder.addCase(fetchPizzas.fulfilled, (state, actions) => {
			state.items = actions.payload
			state.status = Status.SUCCESS
		})
		builder.addCase(fetchPizzas.rejected, state => {
			state.status = Status.ERROR
			state.items = []
		})
	},
})

export const { setItems, plusCount } = pizzasSlice.actions

export default pizzasSlice.reducer
