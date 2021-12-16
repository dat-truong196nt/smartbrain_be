
const signinHandler = (database, hashing) => async (req, res) => {
	let {email, password} = req.body;

	try {
		const hash = await database('login').select('hash').where({email})
		if (!hash.length)
			return res.status(400).json('username or password not found');
		const matched = hashing.compareSync(password, hash[0].hash)
		if (matched) {
			const user = await database('users').select('*').where({email})
			res.json(user[0]);
		} else {
			res.status(400).json('username or password not found');
		}
	} catch(err) {
		res.status(400).json('wrong credential');
	}
}

export default signinHandler;