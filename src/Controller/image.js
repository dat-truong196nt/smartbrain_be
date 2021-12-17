import Clarifai from 'clarifai'

const app = new Clarifai.App({
	apiKey: 'aaf71315bf854f6895f2a76c9a71a794'
});

export const apiCalling = (req, res) => {
	app.models.predict(
		Clarifai.FACE_DETECT_MODEL,
		req.body.url,
	)
	.then(response => res.json(response));
}

const imageHandler = (database) => (req, res) => {
	const {id} = req.body;

	database('users')
	.increment('entries', 1)
	.where({id})
	.then(ret => {return ret ? res.json('success') : res.status(400).json('failed')})
	.catch(err => res.status(400).json('error on submitting image'));
}

export default imageHandler;