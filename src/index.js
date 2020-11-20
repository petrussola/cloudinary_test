import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CloudinaryContext } from 'cloudinary-react';

ReactDOM.render(
	<React.StrictMode>
		<CloudinaryContext cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}>
			<App />
		</CloudinaryContext>
	</React.StrictMode>,
	document.getElementById('root')
);
