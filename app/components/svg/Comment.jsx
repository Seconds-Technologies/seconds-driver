import * as React from "react"
import Svg, { Path } from "react-native-svg"
import PropTypes from "prop-types";

const Comment = ({ width, height, ...props }) => (
	<Svg
		width={width}
		height={height}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<Path
			d="M26.73.955H3.27C1.487.955 0 2.55 0 4.495V21.85c0 1.939 1.487 3.519 3.271 3.519h11.365l8.036 5.486c.099.064.205.1.317.1.099 0 .198-.029.29-.079a.657.657 0 0 0 .311-.567v-4.94h3.139c1.784 0 3.271-1.58 3.271-3.519V4.495c0-1.946-1.487-3.54-3.271-3.54Zm2.08 20.895c0 1.228-.95 2.226-2.08 2.226h-3.74c-.331 0-.589.287-.589.646v4.416l-7.275-4.961a.56.56 0 0 0-.317-.1H3.27c-1.13 0-2.082-.999-2.082-2.227V4.495c0-1.228.952-2.247 2.082-2.247h23.458c1.13 0 2.082 1.02 2.082 2.247V21.85Z"
			fill="#000"
		/>
	</Svg>
);

Comment.propTypes = {
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired
}

export default Comment
