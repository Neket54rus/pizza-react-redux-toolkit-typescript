import React from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

const FullPuzza: React.FC = () => {
	const [pizza, setPizza] = React.useState<{
		imageUrl: string
		title: string
		price: number
	}>()
	const { id } = useParams()

	React.useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get(`https://628b7298667aea3a3e2f765f.mockapi.io/items/${id}`)
				setPizza(data)
			} catch (error) {
				alert("Fail")
			}
		}
		fetchPizza()
	}, [])

	if (!pizza) {
		return <>Loading...</>
	}

	return (
		<div className="container">
			<img src={pizza.imageUrl} />
			<h2>{pizza.title}</h2>
			<h2>{pizza.price}p</h2>
		</div>
	)
}

export default FullPuzza
