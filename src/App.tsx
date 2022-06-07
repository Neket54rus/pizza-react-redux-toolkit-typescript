import React, { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import Loadable from "react-loadable"

import { Header } from "./components/Header"
import Home from "./pages/Home"

import "./scss/app.scss"

const Cart = Loadable({
	loader: () => import(/* webpackChankName: "Cart" */ "./pages/Cart"),
	loading: () => <div>Loading...</div>,
})
const FullPuzza = React.lazy(
	() => import(/* webpackChankName: "FullPuzza" */ "./pages/FullPuzza")
)
const NotFound = React.lazy(
	() => import(/* webpackChankName: "NotFound" */ "./pages/NotFound")
)

const App = () => {
	return (
		<div className="wrapper">
			<Header />
			<div className="content">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/cart" element={<Cart />} />
					<Route
						path="/pizza/:id"
						element={
							<Suspense fallback={<div>Loading...</div>}>
								<FullPuzza />
							</Suspense>
						}
					/>
					<Route
						path="/*"
						element={
							<Suspense fallback={<div>Loading...</div>}>
								<NotFound />
							</Suspense>
						}
					/>
				</Routes>
			</div>
		</div>
	)
}

export default App
