
const registerHandler = (database, hashing) => async (req, res) => {
	let {password, name, email} = req.body;
	if (!password || !name || !email)
		return res.status(400).json('Wrong input format');

	try {
		await database.transaction(async trx => {
			const loginId = await trx('login', 'id')
				.insert({
					email: email,
					hash: hashing.hashSync(password),
				});
			const userId = await trx('users', 'id')
				.insert({
					name: name,
					email: email,
					joined: new Date(),
				});
			res.json({loginId, userId});
		})
	} catch (err) {
		res.status(400).json('Unable to register');
	}
}

export default registerHandler;