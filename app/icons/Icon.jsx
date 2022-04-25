import React from "react";
import PropTypes from "prop-types";
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import glyphMap from '../../app/assets/fonts/selection.json'

const Icon = createIconSetFromIcoMoon(
	glyphMap,
	'IcoMoon',
	'icomoon.ttf'
);

export default Icon;
