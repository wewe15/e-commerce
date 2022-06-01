const router = require('express').Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { User } = require('../../models');
const { authAdmin, authUser} = require('../../middlewares/authentication');

dotenv.config()

const hashPassword = (password) => {
    const salt_rounds = Number(process.env.SALT_ROUNDS)
    return bcrypt.hashSync(password, salt_rounds);
}


router.get('/', authUser, async (_req, res) => {
    try {
        const users = await User.findAll({where: {role: 'user'}})
        res.json(users)
    }catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
});

router.get('/:id', authUser, async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id)
        res.json(user)
    }catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
});

router.post('/', authAdmin, async (req, res) => {
    try{
        const user = {
            username: req.body.username,
            email: req.body.email,
            role: req.body.role,
            password: hashPassword(req.body.password),
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            address: req.body.address,
            city: req.body.city,
        }
        const newUser = await User.create(user)
        res.json(newUser)
    }catch(err){
        console.log(err)
        res.status(500).json({ error: 'Something went wrong' })
    }

});

router.put('/:id', authUser, async (req, res) => {
    try {
        const {username, email, first_name, last_name, phone, address, city} = req.body
        const user = await User.findByPk(req.params.id)
        user.username = username
        user.email = email
        user.first_name = first_name
        user.last_name = last_name
        user.phone = phone
        user.address = address
        user.city = city
        await user.save()
        res.json(user) 
    }catch(err){
        console.log(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
});

router.delete('/:id', authAdmin, async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id)
        await user.destroy()
        res.json({ message: 'User deleted!' })
    }catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({where: {username: req.body.username}});
        if (user){
            const isValid = await bcrypt.compareSync(req.body.password, user.password)
            if (isValid){
                const token = await jwt.sign({id: user.id, role: user.role}, process.env.JWT_SECRET)
                return res.json({
                    access_token: token,
                    token_type: 'Bearer',
                })
            }
        }
        return res.status(401).json({status: 'error', message: 'the username or password do not match.'});
    }catch(err){
        console.log(err)
        res.status(500).json({ error: 'Something went wrong' })
    }

});

router.post('/register', async (req, res) => {
    try{
        const user = {
            username: req.body.username,
            email: req.body.email,
            password: hashPassword(req.body.password),
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            address: req.body.address,
            city: req.body.city,
        }
        const newUser = await User.create(user)
        res.json(newUser)
    }catch(err){
        console.log(err)
        res.status(500).json({ error: 'Something went wrong' })
    }

});

module.exports = router;