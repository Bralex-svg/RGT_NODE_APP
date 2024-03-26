import express from 'express';
// import { TxtCrud } from './services/TxtCRUD.services';
import studentSchema from './Models/student.model';
import { Database } from './database/postgres';
import routes from './routes';
import helmet from "helmet";
import userSchema from './Models/user.model';
const cors = require('cors');

const app = express();
const PORT = 3001;


// const crud = new TxtCrud(path.join(__dirname, './database/users.txt'));


app.use(express.json());
app.use(cors());

app.use(helmet()); 
app.use(routes)

// app.get('/users', (req, res) => {
//   const users = crud.getUsers();
//   res.json(users);
// });

// app.get('/users/:email', (req, res) => {
//   const { email } = req.params;
//   const user = crud.getUserByEmail(email);

//   if (user) {
//     res.json(user);
//   } else {
//     res.status(404).json({ error: 'User not found' });
//   }
// });

// app.post('/users', (req, res) => {
//   const { email, accessToken, refreshToken } = req.body;

//   if (email && accessToken && refreshToken) {
//     crud.addUser(email, accessToken, refreshToken);
//     res.json({ message: 'User added successfully' });
//   } else {
//     res.status(400).json({ error: 'Invalid request payload' });
//   }
// });

// app.put('/users/:email', (req, res) => {
//   const {email}  = req.params;
 
//   const {newAccessToken, newRefreshToken } = req.body;


//   if (email  && newAccessToken && newRefreshToken) {
//     crud.updateUser( email, newAccessToken, newRefreshToken);
//     res.json({ message: 'User updated successfully' });
//   } else {
//     res.status(400).json({ error: 'Invalid request payload' });
//   }
// });

// app.delete('/users/:email', (req, res) => {
//   const { email } = req.params;

//   if (email) {
//     crud.deleteUser(email);
//     res.json({ message: 'User deleted successfully' });
//   } else {
//     res.status(400).json({ error: 'Invalid request payload' });
//   }
// });

// Define the model for the "student" table
const db = new Database();
db.defineModel('Students', studentSchema);
db.defineModel('Users', userSchema);
// Synchronize the models with the database
(async () => {
  await db.syncModels();
})();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
