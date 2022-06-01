const router = require('express').Router();
const multer = require('multer');
const { Product, Image } = require('../../models');
const { authAdmin } = require('../../middlewares/authentication');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            const err = new Error('Only .png, .jpg and .jpeg format allowed!')
            err.name = 'ExtensionError'
            return cb(err);
        }
    },
});

router.get('/', async (_req, res) => {
    try {
        const products = await Product.findAll({include: 'images'})
        res.json(products)
    }catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id)
        res.json(product)
    }catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
});

router.post('/', authAdmin, upload.array('images', 5), async (req, res) => {
    try{
        console.log(req.files)
        const product = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            category_id: req.body.category_id,
        }
        const newProduct = await Product.create(product)
        for(let i=0; i< req.files.length; i++){
            const image = {path: req.files[i].path, product_id: newProduct.id}
            await Image.create(image)
        }
        res.json(newProduct)
    }catch(err){
        console.log(err)
        res.status(500).json({ error: 'Something went wrong' })
    }

});

router.put('/:id', authAdmin, async (req, res) => {
    try {
        const {name, description, price, quantity, category_id} = req.body
        const product = await Product.findByPk(req.params.id)
        product.name = name
        product.description = description
        product.price = price
        product.quantity = quantity
        product.category_id = category_id
        await product.save()
        res.json(product) 
    }catch(err){
        console.log(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
});

router.delete('/:id', authAdmin, async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id)
        await product.destroy()
        res.json({ message: 'Product deleted!' })
    }catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
});

module.exports = router;