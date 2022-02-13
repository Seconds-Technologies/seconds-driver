import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';

const Loading = ({loading}) => (
	<View style={styles.container}>
		<Text>Welcome to the Loading screen!</Text>
	</View>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: "center"
	}
});

Loading.propTypes = {
	loading: PropTypes.bool.isRequired
}

export default Loading;
