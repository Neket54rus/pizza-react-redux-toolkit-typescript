import { CartItem } from "../redux/cart/types"

export const calcTotalPrice = (items: CartItem[]) => {
	return items.reduce((prevSum, obj) => {
		return obj.price * obj.count + prevSum
	}, 0)
}
