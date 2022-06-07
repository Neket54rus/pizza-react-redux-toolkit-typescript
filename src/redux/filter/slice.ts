import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { FilterSliceState, Sort, SortPropertyEnum } from "./types"

const initialState: FilterSliceState = {
	searchValue: "",
	categoryType: 0,
	activePage: 1,
	sortType: {
		name: "популярности ↓",
		sort: SortPropertyEnum.RATING_DESC,
	},
}

const filterSlice = createSlice({
	name: "filter",
	initialState: initialState,
	reducers: {
		setSearchValue: (state, str: PayloadAction<string>) => {
			state.searchValue = str.payload
		},
		setCategoryType: (state, newCategoryType: PayloadAction<number>) => {
			state.categoryType = newCategoryType.payload
		},
		setSortType: (state, newSortType: PayloadAction<Sort>) => {
			state.sortType = newSortType.payload
		},
		setActivePage: (state, page: PayloadAction<number>) => {
			state.activePage = page.payload
		},
		setFilters: (state, settings: PayloadAction<FilterSliceState>) => {
			if (Object.keys(settings.payload).length) {
				state.activePage = Number(settings.payload.activePage)
				state.sortType = settings.payload.sortType
				state.categoryType = Number(settings.payload.categoryType)
			} else {
				state.activePage = 1
				state.categoryType = 0
				state.sortType = {
					name: "популярности ↓",
					sort: SortPropertyEnum.PRICE_DESC,
				}
			}
		},
	},
})

export const { setCategoryType, setSortType, setActivePage, setFilters, setSearchValue } = filterSlice.actions
export default filterSlice.reducer
