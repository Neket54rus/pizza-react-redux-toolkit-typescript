import React from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { addItem } from "../../redux/cart/slice"
import { CartItem } from "../../redux/cart/types"
import { plusCount } from "../../redux/pizza/slice"

const typeList = ["тонкое", "традиционное"]

type PizzaBlockProps = {
	id: string
	image: string
	title: string
	price: number
	types: number[]
	sizes: number[]
	count: number
}

export const PizzaBlock: React.FC<PizzaBlockProps> = ({
	id,
	image,
	title,
	price,
	types,
	sizes,
	count,
}) => {
	const dispatch = useDispatch()
	const [pizzasType, setPizzasType] = React.useState(0)
	const [pizzaSize, setPizzaSize] = React.useState(26)

	const onClickAdd = () => {
		const item: CartItem = {
			id,
			title,
			price,
			image,
			type: typeList[pizzasType],
			size: pizzaSize,
			count: 0,
		}
		dispatch(addItem(item))
		dispatch(plusCount(Number(id)))
	}

	React.useEffect(() => {
		if (types.indexOf(0, 0) !== -1) {
			setPizzasType(0)
		} else {
			setPizzasType(1)
		}
	}, [])

	React.useEffect(() => {
		if (sizes.indexOf(26, 0) !== -1) {
			setPizzaSize(26)
		} else {
			setPizzaSize(30)
		}
	}, [])

	return (
		<div className="pizza-block-wrapper">
			<div className="pizza-block">
				<Link to={`/pizza/${id}`}>
					<img className="pizza-block__image" src={image} alt="Pizza" />
					<h4 className="pizza-block__title">{title}</h4>
				</Link>
				<div className="pizza-block__selector">
					<ul>
						{types.map(item => (
							<li
								onClick={() => setPizzasType(item)}
								className={pizzasType === item ? "active" : undefined}
								key={item}
							>
								{typeList[item]}
							</li>
						))}
					</ul>
					<ul>
						{sizes.map((item, index) => (
							<li
								onClick={() => setPizzaSize(item)}
								className={pizzaSize === item ? "active" : undefined}
								key={index}
							>
								{item}
							</li>
						))}
					</ul>
				</div>
				<div className="pizza-block__bottom">
					<div className="pizza-block__price">от {price} ₽</div>
					<button
						onClick={onClickAdd}
						className="button button--outline button--add"
					>
						<svg
							width="12"
							height="12"
							viewBox="0 0 12 12"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
								fill="white"
							/>
						</svg>
						<span>Добавить</span>
						{count > 0 && <i>{count}</i>}
					</button>
				</div>
			</div>
		</div>
	)
}
