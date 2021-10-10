import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
	typography: {
		// Use the system font instead of the default Roboto font.
		fontFamily: [
			'system-ui',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
		h1: {
			fontSize: 35,
			fontWeight: "bold"
		},
		h2: {
			fontSize: 25,
			fontWeight: "bold"
		},
		h3: {
			fontSize: 30
		},
		button: {
			textTransform: "none",
			fontWeight: "bold",
			boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.17)"
		},
	},
	palette: {
		primary: {
			main: '#000',
		},
		secondary: {
			main: '#797874',
		},
		error: {
			main: red[400],
		},
		background: {
			default: '#fff',
		},
	}
});

export default theme