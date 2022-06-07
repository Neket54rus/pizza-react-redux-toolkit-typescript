import { CartItem } from "../redux/cart/types"
import { calcTotalPrice } from "./calcTotalPrice"

export const getCartFromLS = () => {
	const data = localStorage.getItem("cart")
	const json = data ? JSON.parse(data) : []
	const totalPrice = calcTotalPrice(json)

	return {
		items: json as CartItem[],
		totalPrice: totalPrice,
	}
}
