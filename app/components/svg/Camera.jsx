import * as React from "react"
import Svg, { Path } from "react-native-svg"
import PropTypes from "prop-types";

const Camera = ({width=41, height=31, ...props}) => (
	<Svg
		width={width}
		height={height}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<Path
			d="M27.973 17.61a7.308 7.308 0 1 1-14.617-.001 7.308 7.308 0 0 1 14.617 0Z"
			fill="#000"
		/>
		<Path
			d="M38.53 5.827h-7.252c-.543 0-1.05-.271-1.351-.722l-2.284-3.426A1.623 1.623 0 0 0 26.29.955H15.037c-.542 0-1.05.271-1.351.724l-2.284 3.426a1.626 1.626 0 0 1-1.351.722H2.8A2.436 2.436 0 0 0 .364 8.263v20.301A2.436 2.436 0 0 0 2.8 31h35.73a2.436 2.436 0 0 0 2.435-2.436v-20.3a2.436 2.436 0 0 0-2.435-2.437ZM20.663 27.353c-5.373 0-9.744-4.37-9.744-9.745 0-5.371 4.371-9.744 9.745-9.744 5.373 0 9.744 4.373 9.744 9.744 0 5.374-4.371 9.745-9.744 9.745ZM32.846 9.498c0 .444-.36.802-.804.802h-.016a.803.803 0 0 1-.805-.802V9.48c0-.444.36-.804.805-.804h.016c.444 0 .804.36.804.804v.017Z"
			fill="#000"
		/>
		<Path d="M5.236 2.578h3.248v1.625H5.236V2.578Z" fill="#000" />
	</Svg>
)

Camera.propTypes = {
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired
}

export default Camera
