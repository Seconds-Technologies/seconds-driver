import * as SecureStore from 'expo-secure-store';

export async function saveKey(key, value) {
	await SecureStore.setItemAsync(key, value, {
		keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY
	});
}

export async function deleteKey(key) {
	await SecureStore.deleteItemAsync(key);
}

export async function getValueFor(key) {
	return await SecureStore.getItemAsync(key)
}
