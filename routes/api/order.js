const router = require('express').Router();
const { Order, Order_item, Product } = require('../../models');
const { authAdmin, authUser } = require('../../middlewares/authentication');
const { createCharge, createToken } = require('../../middlewares/payment');


router.get('/', authAdmin, async (_req, res) => {
    try {
        const orders = await Order.findAll({include: ['products']})
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
            include: ['products']
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

router.get('/:id', authAdmin, async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id,{
                include: ['products']
            })
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

router.put('/:id/payment', async (req, res) => {
    try {
        let order = await Order.findByPk(req.params.id,{
            include: ['products']
        });
        if(!order){
            return res.json("Order Not Found")
        }
        let price = 0;
        for(let i =0; i<order.products.length; i++){
            price += parseInt(order.products[i].total_price)
        }
        const card_data = {
            fullName: req.body.fullName,
            cardNumber: req.body.cardNumber,
            month: req.body.month,
            year: req.body.year,
            cvv: req.body.cvv
        } 
        const token = await createToken(card_data);
        if (token.error) {
            return res.status(500).json("please try again");
        }
        if (!token.id) {
            return res.status(404).json("payment failed2");
        }
        const charge = await createCharge(token.id, price*100);
        console.log(charge)
        if (charge && charge.status === 'succeeded') { 
            order.is_paid = true;
            order.paid_at = Date.now();
            order = await order.save();
            return res.status(201).json({ message: 'Order Paid', order})
        }else {
            return res.status(404).json("payment failed");
        }
    }catch (err) {
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