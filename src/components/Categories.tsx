import React from "react"

type CategoriesProps = {
	value: number
	onClickCategory: (index: number) => void
}

const categories = [
	"Все",
	"Мясные",
	"Вегетарианская",
	"Гриль",
	"Острые",
	"Закрытые",
]

export const Categories: React.FC<CategoriesProps> = React.memo(
	({ value, onClickCategory }) => {
		return (
			<div className="categories">
				<ul>
					{categories.map((item, index) => (
						<li
							onClick={() => onClickCategory(index)}
							className={value === index ? "active" : undefined}
							key={index}
						>
							{item}
						</li>
					))}
				</ul>
			</div>
		)
	}
)
