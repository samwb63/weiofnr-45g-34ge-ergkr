import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Product from './pages/Product'

export default function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/:id?" children={<Product />} />
			</Switch>
		</BrowserRouter>
	)
}
