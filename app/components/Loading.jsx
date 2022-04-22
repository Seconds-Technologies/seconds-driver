import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import LoadingSpinner from "../modals/LoadingSpinner";

const Loading = ({loading, message}) => (
	<View style={styles.container}>
		<LoadingSpinner show={loading} loadingMessage={message} onHide={() => console.log("end loading....")}/>
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
