import React, { useEffect, useMemo, useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import PropTypes from "prop-types";
import { useTailwind } from "tailwind-rn";
import { useDispatch } from "react-redux";
import { logger } from "react-native-logs";
import * as MediaLibrary from "expo-media-library";
import { downloadDeliveryPhoto } from "../store/features/jobs/actions";

const DeliveryReceipt = props => {
	const tailwind = useTailwind();
	const dispatch = useDispatch();
	const [image, setImage] = useState({
		uri: "",
		type: ""
	});
	const log = logger.createLogger();

	useEffect(() => {
		(async () => {
			try {
				const POD = props.route.params.proofOfDelivery;
				console.log(POD);
				if (POD) {
					for (const [key, value] of Object.entries(POD)) {
						if (value.location && value.filename) {
							dispatch(downloadDeliveryPhoto(value.filename))
								.unwrap()
								.then(img =>
									setImage(prevState =>
										key === "photo"
											? {
													uri: img,
													type: "png"
											  }
											: { uri: img, type: "jpg" }
									)
								).catch(() => Alert.alert("Failed to locate the image"));
							/*console.log(value.location);
							let dest = `${FileSystem.documentDirectory}${props.route.params.orderNumber}${key === "signature" ? ".png" : ".jpg"}`;
							log.info(dest);
							const downloadedFile = await FileSystem.downloadAsync(value.location, dest);
							console.log("Finished downloading to:", downloadedFile.uri);
							const asset = await MediaLibrary.createAssetAsync(downloadedFile.uri);
							console.log(asset);
							/*const album = await MediaLibrary.getAlbumAsync('Download');
							console.log(album);
							if (album == null) {
								await MediaLibrary.createAlbumAsync('Download', asset, false);
							} else {
								await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
							}*/
						}
					}
				}
			} catch (err) {
				console.log(err.message);
			}
		})();
	}, []);

	return (
		<View style={tailwind("bg-white md:mx-32 py-5 px-5 border-0 md:border-4 border-gray-300 md:rounded-xl min-h-full")}>
			<View style={tailwind("flex h-full")}>
				<Image style={{ flex: 0.9, aspectRatio: 0.5 }} source={{ uri: `data:image/png;base64,${image.uri}` }} resizeMode={"contain"} />
			</View>
		</View>
	);
};

DeliveryReceipt.propTypes = {};

export default DeliveryReceipt;
