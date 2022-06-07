import React from "react"

import styles from "./Pogination.module.scss"

type PaginationProps = {
	active: number
	setActive: (index: number) => void
}

export const Pogination: React.FC<PaginationProps> = ({
	active,
	setActive,
}) => {
	const btns = []

	for (let i = 0; i < 2; i++) {
		btns.push(
			<div
				onClick={() => setActive(i + 1)}
				key={i}
				className={`${styles.btn} ${active === i + 1 ? styles.active : null}`}
			>
				{i + 1}
			</div>
		)
	}

	return (
		<div className={styles.root}>
			<div
				onClick={() => setActive(active <= 1 ? 2 : active - 1)}
				className={styles.btn}
			>
				{"<"}
			</div>
			{btns}
			<div
				onClick={() => setActive(active >= 2 ? 1 : active + 1)}
				className={styles.btn}
			>
				{">"}
			</div>
		</div>
	)
}
