const authRouter = require('express').Router();
const bcrypt = require('bcrypt');
const supabase = require('../utils/config').supabase;

authRouter.post('/register', async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).json({error: 'Missing fields'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const {data, error} = await supabase.from('users').insert({username, password: hashedPassword}).select();
    console.log('error', error);
    if (error) {
        return res.status(400).json({error: error.message});
    }

    return res.status(200).json({message: 'User created'});
});

authRouter.post('/login', async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({error: 'Missing fields'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const isSamePassword = await bcrypt.compare(password, hashedPassword);
    if (isSamePassword) {
        const {data, error} = await supabase.from('users').select().match({username});
        if (error) {
            return res.status(400).json({error: error.message});
        }
        if (data && data.length === 0) {
            return res.status(400).json({error: 'Invalid credentials'});
        }
    return res.status(200).json({message: 'User logged in', data: data[2]});
    }

});


module.exports = authRouter;
