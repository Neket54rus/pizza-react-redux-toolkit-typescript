import React from "react"
import debounce from "lodash.debounce"
import { useDispatch } from "react-redux"

import { setSearchValue } from "../../redux/filter/slice"
import styles from "./Search.module.scss"

export const Search: React.FC = () => {
	const dispatch = useDispatch()
	const [value, setValue] = React.useState<string>("")
	const inputRef = React.useRef<HTMLInputElement>(null)

	const onClearInput = () => {
		dispatch(setSearchValue(""))
		setValue("")
		inputRef.current?.focus()
	}

	const updateSearchValue = React.useCallback(
		debounce(str => {
			dispatch(setSearchValue(str))
		}, 500),
		[]
	)

	const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value)
		updateSearchValue(event.target.value)
	}

	return (
		<div className={styles.root}>
			<svg
				className={styles.icon}
				enableBackground="new 0 0 32 32"
				height="32px"
				id="Layer_1"
				version="1.1"
				viewBox="0 0 32 32"
				width="32px"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g>
					<path d="M13,2C6.935,2,2,6.935,2,13s4.935,11,11,11s11-4.935,11-11S19.065,2,13,2z M13,22c-4.962,0-9-4.037-9-9   c0-4.962,4.038-9,9-9c4.963,0,9,4.038,9,9C22,17.963,17.963,22,13,22z" />
					<path d="M29.707,28.293l-6.001-6c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414l6.001,6C28.488,29.902,28.744,30,29,30   s0.512-0.098,0.707-0.293C30.098,29.316,30.098,28.684,29.707,28.293z" />
				</g>
			</svg>
			<input
				ref={inputRef}
				onChange={onChangeInput}
				value={value}
				className={styles.input}
				placeholder="Поиск пиццы ..."
			/>
			{value && (
				<svg
					onClick={onClearInput}
					className={styles.close}
					data-name="Layer 1"
					height="200"
					id="Layer_1"
					viewBox="0 0 200 200"
					width="200"
					xmlns="http://www.w3.org/2000/svg"
				>
					<title />
					<path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
				</svg>
			)}
		</div>
	)
}
