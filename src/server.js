import express from "express";

// GET '/' 				-> get users list.
// POST '/signin'		-> check for users and send status (success/fail)
// POST '/register'		-> add users to db and send user added.
// GET '/profile/:id'	-> get user profile
// PUT '/image'			-> push user image

const users = [
	{
		id: 1,
		name: "Leanne Graham",
		usersname: "Bret",
		email: "Sincere@april.biz",
		date: new Date(),
		entries: 0,
		password: '123',
	},
	{
		id: 2,
		name: "Ervin Howell",
		usersname: "Antonette",
		email: "Shanna@melissa.tv",

		date: new Date(),
		entries: 0,
		password: '123',
	},
	{
		id: 3,
		name: "Clementine Bauch",
		usersname: "Samantha",
		email: "Nathan@yesenia.net",

		date: new Date(),
		entries: 0,
		password: '123',
	},
	{
		id: 4,
		name: "Patricia Lebsack",
		usersname: "Karianne",
		email: "Julianne.OConner@kory.org",

		date: new Date(),
		entries: 0,
		password: '123',
	},
	{
		id: 5,
		name: "Chelsey Dietrich",
		usersname: "Kamren",
		email: "Lucio_Hettinger@annie.ca",

		date: new Date(),
		entries: 0,
		password: '123',
	},
	{
		id: 6,
		name: "Mrs. Dennis Schulist",
		usersname: "Leopoldo_Corkery",
		email: "Karley_Dach@jasper.info",

		date: new Date(),
		entries: 0,
		password: '123',
	},
	{
		id: 7,
		name: "Kurtis Weissnat",
		usersname: "Elwyn.Skiles",
		email: "Telly.Hoeger@billy.biz",

		date: new Date(),
		entries: 0,
		password: '123',
	},
	{
		id: 8,
		name: "Nicholas Runolfsdottir V",
		usersname: "Maxime_Nienow",
		email: "Sherwood@rosamond.me",

		date: new Date(),
		entries: 0,
		password: '123',
	},
	{
		id: 9,
		name: "Glenna Reichert",
		usersname: "Delphine",
		email: "Chaim_McDermott@dana.io",

		date: new Date(),
		entries: 0,
		password: '123',
	},
	{
		id: 10,
		name: "Clementina DuBuque",
		usersname: "Moriah.Stanton",
		email: "Rey.Padberg@karina.biz",

		date: new Date(),
		entries: 0,
		password: '123',
	},
];

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	res.json(users);
})

app.post('/signin', (req, res) => {
	let {username, password} = req.body;
	for (let user of users) {
		if (user.usersname === username && user.password === password) {
			return res.send('success');
		}
	}

	return res.status(400).json('failed');
})

app.post('/register', (req, res) => {
	let {username, password, name, email} = req.body;
	users.push({
		id: users.length + 1,
		name: name,
		usersname: username,
		email: email,
		date: new Date(),
		entries: 0,
		password: password,
	})
	res.send(users[users.length - 1]);
})

app.get('/profile/:id', (req, res) => {
	const {id} = req.params;
	let found = false;

	users.forEach((usr) => {
		if (usr.id == id) {
			found = true;
			res.json(usr);
		}
	})

	if (!found) res.status(400).json(`user with (id:${id}) not found`);
})

app.put('/image', (req, res) => {
	const {id} = req.body;
	let found = false;

	users.forEach((usr) => {
		if (usr.id == id) {
			found = true;
			usr.entries++;
			res.json(usr);
		}
	})

	if (!found) res.status(400).json(`user with (id:${id}) not found`);
})

app.listen(3000, () => console.log('Server is now running ...'));