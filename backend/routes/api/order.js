const router = require('express').Router();
const { Order, Order_item, Product } = require('../../models');
const { authAdmin, authUser } = require('../../middlewares/authentication');


router.get('/', authAdmin, async (_req, res) => {
    try {
        const orders = await Order.findAll({include: ['orders']})
        if(!orders){
            return res.json("Not found");
        }
        res.status(200).json(orders)
    }catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
});

router.get('/mine', authUser, async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: {
                user_id: req.user.id
            },
            include: ['orders']
        })
        if(!orders){
            return res.json("Not found")
        }
        res.status(200).json(orders)
    }catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
});

router.get('/:id', authUser, async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id)
        if(!order){
            return res.json("Not found")
        }
        res.status(200).json(order)
    }catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
});

router.post('/', authUser, async (req, res) => {
    try{
        const order = {
            user_id: req.user.id,
            order_name: req.body.order_name,
            order_address: req.body.order_address,
            order_phone: req.body.order_phone,
            order_city: req.body.order_city
        }
        const newOrder = await Order.create(order)
        res.status(201).json(newOrder)
    }catch(err){
        console.log(err)
        res.status(500).json({ error: 'Something went wrong' })
    }

});

router.post('/:id/products', authUser, async (req, res) => {
    try{
        const order = await Order.findByPk(req.params.id)
        if(!order){
            return res.json("Order Not Found")
        }
        const product = await Product.findByPk(req.body.product_id)
        const add_product = {
            name: req.body.name,
            order_id: req.params.id,
            user_id: req.user.id,
            product_id: product.id,
            quantity: req.body.quantity,
            total_price: product.price * req.body.quantity

        }
        const order_product = await Order_item.create(add_product)
        res.status(201).json(order_product)
    }catch(err){
        console.log(err)
        res.status(500).json({ error: 'Something went wrong' })
    }

});

router.delete('/:id', authAdmin, async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id)
        if(!order){
            return res.json("Order Not Found")
        }
        await order.destroy()
        res.status(200).json({ message: 'order deleted!' })
    }catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
});

module.exports = router;