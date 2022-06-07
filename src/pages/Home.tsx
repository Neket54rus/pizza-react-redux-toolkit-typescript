import React from "react"
import { useSelector } from "react-redux"
import qs from "qs"
import { useNavigate } from "react-router-dom"

import { Categories, Sort, PizzaBlock, Skeleton, Pogination } from "../components"
import NotFound from "./NotFound"
import { sortList } from "../components/Sort"
import { useAppDispatch } from "../redux/store"
import { selectPizzaData } from "../redux/pizza/selectors"
import { selectFilter } from "../redux/filter/selectors"
import { fetchPizzas } from "../redux/pizza/asyncActions"
import { setActivePage, setCategoryType } from "../redux/filter/slice"

type pizzasProps = {
	id: string
	title: string
	types: number[]
	sizes: number[]
	price: number
	count: number
	imageUrl: string
}

const Home: React.FC = () => {
	const firstRender = React.useRef(false)

	const dispatch = useAppDispatch()
	const { items, status } = useSelector(selectPizzaData)
	const { categoryType, sortType, activePage, searchValue } = useSelector(selectFilter)
	const navigate = useNavigate()

	React.useEffect(() => {
		getPizzas()
	}, [categoryType, sortType.sort, searchValue, activePage])

	// React.useEffect(() => {
	// 	if (firstRender.current) {
	// 		const params = {
	// 			categoryType: categoryType > 0 ? categoryType : null,
	// 			sortType: sortType.sort,
	// 			activePage,
	// 		}
	// 		const queryString = qs.stringify(params, { skipNulls: true })
	// 		navigate(`/?${queryString}`)
	// 	}
	// }, [categoryType, sortType.sort, searchValue, activePage])

	// React.useEffect(() => {
	// 	if (window.location.search) {
	// 		const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams
	// 		const list = sortList.find(obj => obj.sort === params.sortBy)

	// 		dispatch(
	// 			setFilters({
	// 				searchValue: params.search,
	// 				categoryType: Number(params.category),
	// 				activePage: Number(params.activePage),
	// 				sortType: list || sortList[0],
	// 			})
	// 		)
	// 	}
	// 	firstRender.current = true
	// }, [])

	// React.useEffect(() => {
	// 	if (!window.location.search) {
	// 		dispatch(fetchPizzas({} as SearchPizzaParams))
	// 	}
	// }, [])

	const getPizzas = async () => {
		const sortBy = sortType.sort.replace("-", "")
		const order = sortType.sort.includes("-") ? "asc" : "desc"
		const category = categoryType > 0 ? `category=${categoryType}` : ""
		const search = searchValue ? `&search=${searchValue}` : ""

		dispatch(
			fetchPizzas({
				activePage: String(activePage),
				sortBy,
				order,
				category,
				search,
			})
		)

		window.scrollTo(0, 0)
	}

	const onClickCategory = React.useCallback((id: number) => {
		dispatch(setCategoryType(id))
	}, [])

	const onChangePage = (page: number) => {
		dispatch(setActivePage(page))
	}

	const pizzas = items.map(
		//@ts-ignore
		({ id, imageUrl, title, price, types, sizes, count }: pizzasProps) => (
			<PizzaBlock
				key={id}
				id={id}
				image={imageUrl}
				title={title}
				price={price}
				types={types}
				sizes={sizes}
				count={count}
			/>
		)
	)

	const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)

	return (
		<div className="container">
			<div className="content__top">
				<Categories onClickCategory={onClickCategory} value={categoryType} />
				<Sort value={sortType} />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			{status === "error" ? (
				<NotFound />
			) : (
				<div className="content__items">{status === "loading" ? skeletons : pizzas}</div>
			)}

			<Pogination active={activePage} setActive={onChangePage} />
		</div>
	)
}

export default Home
