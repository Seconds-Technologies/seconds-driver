import * as SecureStore from 'expo-secure-store';

export async function saveKey(key, value) {
	await SecureStore.setItemAsync(key, value, {
		requireAuthentication: true
	});
}

export async function deleteKey(key) {
	await SecureStore.deleteItemAsync(key, {
		requireAuthentication: false
	});
}

export async function getValueFor(key) {
	return await SecureStore.getItemAsync(key, {
		requireAuthentication: false
	})
}
