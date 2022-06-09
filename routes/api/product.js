const router = require('express').Router();
const multer = require('multer');
const { Product, Image, Review } = require('../../models');
const { authAdmin, authUser } = require('../../middlewares/authentication');


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
        if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            const err = new Error('Only .png, .jpg and .jpeg format allowed!');
            err.name = 'ExtensionError';
            return cb(err);
        }
    },
});

router.get('/', async (req, res) => {
    try {
        const category_id = req.query.category_id;
        if(category_id){
            const products = await Product.findAll(
                {where: {category_id}},
            );   
            if(!products){
                return res.json("Products Not Found");
            };
            return res.status(200).json(products);
        }else{
            const products = await Product.findAll(
                {include: ['images', 'reviews']},
            );
            if(!products){
                return res.json("Products Not Found");
            };
            return res.status(200).json(products);
        };
    }catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id,{
            include: ['images', 'category', 'reviews']
        });
        if(!product){
            return res.json("Product Not Found");
        };
        res.status(200).json(product);
    }catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' });
    };
});

router.post('/', authAdmin, upload.array('images', 5), async (req, res) => {
    try{
        const product = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            category_id: req.body.category_id,
        };
        const newProduct = await Product.create(product);
        for(let i=0; i< req.files.length; i++){
            const image = {path: req.files[i].path, product_id: newProduct.id};
            await Image.create(image);
        };
        res.status(201).json(newProduct);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' });
    };

});

router.put('/:id', authAdmin, async (req, res) => {
    try {
        const {name, description, price, quantity, category_id} = req.body;
        const product = await Product.findByPk(req.params.id);
        if(!product){
            return res.json("Product Not Found");
        };
        product.name = name;
        product.description = description;
        product.price = price;
        product.quantity = quantity;
        product.category_id = category_id;
        await product.save();
        res.status(200).json(product);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' });
    };
});

router.delete('/:id', authAdmin, async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if(!product){
            return res.json("Product Not Found");
        };
        await product.destroy();
        res.status(200).json({ message: 'Product deleted!' });
    }catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' });
    };
});

router.post('/:id/reviews', authUser, async (req, res) => {
    try{
        const review = {
            name: req.body.name,
            comment: req.body.comment,
            user_id: req.user.id,
            rating: req.body.rating,
            product_id : req.params.id
        };
        await Review.create(review);
        const product = await Product.findByPk(req.params.id, {include: 'reviews'});
        if(!product){
            return res.json("Product Not Found");
        };
        product.rating = product.reviews.reduce((a, c) => c.rating + a, 0) / product.reviews.length;
        product.num_reviews = product.reviews.length;
        const updata_product = await product.save();
        res.status(201).json(updata_product.reviews)
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' });
    };

});

module.exports = router;