import React, { useState } from 'react';
import { Image, Transformation, Placeholder } from 'cloudinary-react';
import axios from 'axios';

const styleType = {
	display: 'flex',
	flexDirection: 'column',
	width: '40%',
	padding: '2rem',
	border: '1px solid gray',
};

function App() {
	const [loading, setLoading] = useState(false);
	const [image, setImage] = useState([]);
	const [error, setError] = useState('');

	const formData = new FormData();

	const handleFile = (e) => {
		e.preventDefault();
		const files = e.target.files[0];
		formData.append(
			'upload_preset',
			process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
		);
		formData.append('file', files);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		axios
			.post(
				`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/upload`,
				formData
			)
			.then((res) => {
				setImage([...image, res.data]);
				setLoading(false);
			})
			.catch(() => {
				setError('There was an error uploading the image');
				setLoading(false);
			});
	};

	return (
		<>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-around',
				}}
			>
				<div
					style={{
						border: '1px solid gray',
						padding: '2rem',
						width: '40%',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<form onSubmit={handleSubmit}>
						<label htmlFor='file'>Add file:</label>
						<input type='file' id='file' name='file' onChange={handleFile} />
						<button type='submit'>Submit</button>
					</form>
					<div style={{ marginTop: '2rem', padding: '0.5rem' }}>
						{loading ? (
							<div style={{ marginTop: '2rem' }}>Loading...</div>
						) : null}
						{error ? <div style={{ marginTop: '2rem' }}>{error}</div> : null}
						{image.length > 0 && !loading && !error ? (
							<img
								src={image[image.length - 1].secure_url}
								alt={image[image.length - 1].original_filename}
								style={{ maxWidth: '100%' }}
							/>
						) : null}
					</div>
				</div>
				<div style={styleType}>
					<div style={{ minHeight: '700px' }}>{`DEMO - scroll down. There are ${
						image.length
					} ${image.length === 1 ? 'image' : 'images'}.`}</div>
					{image.length === 0 ? (
						<div>hello</div>
					) : (
						image.map((item) => {
							return (
								<Image
									key={item.publicId}
									publicId={item.public_id}
									loading='lazy'
									width='200'
								></Image>
							);
						})
					)}
				</div>
			</div>
		</>
	);
}

export default App;
