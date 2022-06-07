import React from "react"
import ContentLoader from "react-content-loader"

export const Skeleton: React.FC = () => (
	<div className="pizza-block-wrapper">
		<ContentLoader
			className="pizza-block"
			speed={2}
			width={280}
			height={465}
			viewBox="0 0 280 465"
			backgroundColor="#f3f3f3"
			foregroundColor="#ecebeb"
		>
			<circle cx="140" cy="130" r="130" />
			<rect x="0" y="273" rx="10" ry="10" width="280" height="27" />
			<rect x="0" y="314" rx="10" ry="10" width="280" height="88" />
			<rect x="0" y="413" rx="10" ry="10" width="135" height="45" />
			<rect x="145" y="413" rx="10" ry="10" width="135" height="45" />
		</ContentLoader>
	</div>
)
