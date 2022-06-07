export type Pizza = {
	id: string
	image: string
	title: string
	price: number
	types: number[]
	sizes: number[]
	count: number
}

export enum Status {
	LOADING = "loading",
	SUCCESS = "success",
	ERROR = "error",
}

export interface PizzaSliceState {
	items: Pizza[]
	status: Status
}

export type SearchPizzaParams = {
	activePage: string
	sortBy: string
	order: string
	category: string
	search: string
}
