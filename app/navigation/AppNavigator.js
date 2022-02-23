import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setApiKey, setTokenHeader } from "../api";
import { getValueFor } from "../services/keyStore";
import AuthStackScreen from "./AuthStack";
import DrawerScreen from "./drawer";

const RootStack = createNativeStackNavigator();

const RootStackScreen = ({ userToken }) => (
	<RootStack.Navigator screenOptions={{ headerShown: false }}>
		{userToken ? <RootStack.Screen name={"App"} component={DrawerScreen} /> : <RootStack.Screen name={"Auth"} component={AuthStackScreen} />}
	</RootStack.Navigator>
);

const AppNavigator = props => {
	const [isLoading, setIsLoading] = useState(false);
	const { isAuthenticated } = useSelector(state => state["drivers"]);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			const result = await getValueFor("credentials");
			if (result) {
				const { apiKey, token } = JSON.parse(result);
				if (token && apiKey) {
					await setApiKey(apiKey);
					await setTokenHeader(token);
				}
			}
			setIsLoading(false);
		})();
	}, [isAuthenticated]);

	return isLoading ? <Loading loading={isLoading} /> : <RootStackScreen userToken={isAuthenticated} />;
};

export default AppNavigator;
