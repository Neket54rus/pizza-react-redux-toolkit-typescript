import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { Pizza, SearchPizzaParams } from "./types"

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>("pizza/fetchPizzasStatus", async params => {
	const { activePage, sortBy, order, category, search } = params
	const { data } = await axios.get<Pizza[]>(
		`https://628b7298667aea3a3e2f765f.mockapi.io/items?page=${activePage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`
	)
	return data
})
