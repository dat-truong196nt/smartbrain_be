
const profileHandler = (database) => (req, res) => {
	const {id} = req.params;

	database('users')
	.select('*')
	.where({id})
	.then(user => {
		if (user.length) res.json(user[0]);
		else res.status(400).json(`user with (id:${id}) not found`);
	})
	.catch(err => res.status(400).json('Error to get user'));
}

export default profileHandler;