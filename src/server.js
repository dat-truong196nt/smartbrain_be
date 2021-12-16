import express from "express";
import cors from 'cors'
import knex from 'knex'
import hashing from 'bcrypt-nodejs'

// GET '/' 				-> get users list.
// POST '/signin'		-> check for users and send status (success/fail)
// POST '/register'		-> add users to db and send user added.
// GET '/profile/:id'	-> get user profile
// PUT '/image'			-> push user image

const database = knex({
	client: 'mysql',
	connection: {
		host : '127.0.0.1',
		port : 3306,
		user : 'dat.truong',
		password : 'admin',
		database : 'smart_brain'
	}
})

const app = express();

app.use(express.json());
app.use(cors());

app.post('/signin', async (req, res) => {
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
})

app.post('/register', async (req, res) => {
	try {
		let {password, name, email} = req.body;
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
})

app.get('/profile/:id', (req, res) => {
	const {id} = req.params;

	database('users')
	.select('*')
	.where({id})
	.then(user => {
		if (user.length) res.json(user[0]);
		else res.status(400).json(`user with (id:${id}) not found`);
	})
	.catch(err => res.status(400).json('Error to get user'));
})

app.put('/image', (req, res) => {
	const {id} = req.body;

	database('users')
	.increment('entries', 1)
	.where({id})
	.then(ret => {return ret ? res.json('success') : res.status(400).json('failed')})
	.catch(err => res.status(400).json('error on submitting image'));
})

app.listen(3000, () => console.log('Server is now running ...'));