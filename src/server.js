import express from "express";
import cors from 'cors'
import knex from 'knex'
import hashing from 'bcrypt-nodejs'
import signinHandler from "./Controller/signin.js"
import registerHandler from "./Controller/register.js"
import profileHandler from "./Controller/profile.js";
import imageHandler, {apiCalling} from "./Controller/image.js";

// GET '/' 				-> get users list.
// POST '/signin'		-> check for users and send status (success/fail)
// POST '/register'		-> add users to db and send user added.
// GET '/profile/:id'	-> get user profile
// PUT '/image'			-> push user image

const database = knex({
	client: 'pg',
	connection: {
		connectionString: process.env.DATABASE_URL,
		ssl: {
			rejectUnauthorized: false
		}
	}
})

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.json('BE is now running ...'));
app.post('/signin', signinHandler(database, hashing));
app.post('/register', registerHandler(database, hashing));
app.get('/profile/:id', profileHandler(database))
app.put('/image', imageHandler(database))
app.put('/imageUrl', apiCalling)

app.listen(process.env.PORT, () => console.log(`Server is now running at ${process.env.PORT} with ${process.env.DATABASE_URL}...`));