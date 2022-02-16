import React, {useMemo} from 'react';
import {FlatList, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {useTailwind} from "tailwind-rn";

const TodayTasks = (props) => {
	const tailwind = useTailwind()

	const data = useMemo(() => {
		return []
	}, [])

	return (
		<View>
			<View style={tailwind('flex grow justify-center md:items-center my-6')}>
				<FlatList
					data={data}
				    renderItem={(data) => (
						<View style={tailwind('flex')}>

						</View>
				    )}
				/>
			</View>
		</View>
	);
}

TodayTasks.propTypes = {}

export default TodayTasks;
