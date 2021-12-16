
const imageHandler = (database) => (req, res) => {
	const {id} = req.body;

	database('users')
	.increment('entries', 1)
	.where({id})
	.then(ret => {return ret ? res.json('success') : res.status(400).json('failed')})
	.catch(err => res.status(400).json('error on submitting image'));
}

export default imageHandler;