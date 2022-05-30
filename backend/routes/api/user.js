const router = require('express').Router();
const { User } = require('../../models');


router.get('/', async (req, res) => {
    try {
        const users = await User.findAll()
        res.json(users)
    }catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id)
        res.json(user)
    }catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
});

router.post('/', async (req, res) => {
    try{
        const user = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
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

router.put('/:id', async (req, res) => {
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
    } catch(err){
        console.log(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id)
        await user.destroy()
        res.json({ message: 'User deleted!' })
    }catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
});

module.exports = router;