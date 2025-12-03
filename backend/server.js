import express from 'express';
import cors from 'cors';

const app = express();

app.use (express.json());

app.use(cors({
    origin: 'https://supreme-space-yodel-5173.app.github.dev',  //need to change later
    credentials: true,
}));

//temporary fake database
//NEEDS TO BE REPLACED WITH REAL DATABASE (I WILL DO IT ONCE DATABASE CREATED)

const users = [
    {
        id: 1, 
        first_name: 'Billy',
        last_name: 'Bob', 
        email: 'bbob@unr.edu',
        password: 'bob123', //in proper version this will be hashes
        role: 'officer',
        organizaitons: [
            {id: 1, name: 'Cyber Club >:)'},
            {id: 2, name: "Wolfpack Racing :o"},
        ],
    },
];

app.post('/auth/login', (req, res) => {
    const {email, password} = req.body;

    const user = users.find(
        (u) => u.email === email && u.password === password
    );

    if (!user) {
        return res.status(401).json({ message:'Invalid email or password'});
    }

    //
    res.json({
        user: {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role,
        },
        organizations: user.organizations,
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend listening on port ${PORT}`);
    
});