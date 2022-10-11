const productController = require('./products.controllers');

const getAllProducts = (req, res) => {
    productController.getAllProducts()
        .then(data => {res.status(200).json(data)})
        .catch(err => {res.status(400).json({message: err.message})})
};

const postProduct = (req, res) => {
    const data = req.body;
    if(data.name && data.category && data.price && data.isAvailable){
        productController.createProduct(data)
            .then(response => res.status(201).json(response))
            .catch(err => res.status(400).json({message: err.message}))
    }else{
        res.status(400).json({message: "Missing Data"});
    }
};

const getProductById = (req, res) => {
    const id = req.params.id;
    productController.getProductById(id)
        .then(data => {
            if(data){
                res.status(200).json(data);
            }else{
                res.status(404).json({message: "Invalid ID"});
            }
        })
        .catch(err => res.status(404).json({message: err.message}))
};

const patchProduct = (req, res) => {
    const id = req.params.id;
    const {name, category, price, isAvailable} = req.body;

    productController.editProduct(id, {name, category, price, isAvailable})
        .then(response => {
            if(response[0]){
                res.status(200).json({message: `Product with id: ${id}, edited succesfully!`});
            }else{
                res.status(400).json({message: "Invalid ID"});
            }
        })
        .catch(err => res.status(400).json({message: err.message}));
};

const putProduct = (req, res) => {
    const id = req.params.id;
    const {name, category, price, isAvailable} = req.body;

    if(name && category && price && isAvailable){
        productController.editProduct(id, {name, category, price, isAvailable})
            .then(response => {
                if(response[0]){
                    res.status(200).json({message: `Product with id: ${id}, edited succesfully!`});
                }else{
                    res.status(400).json({message: "Invalid ID"});
                }
            })
            .catch(err => res.status(400).json({message: err.message}));
    }else{
        res.status(400).json({message: "Missing Data", fields:{
            name: "string",
            category: "string",
            price: "integer",
            isAvailable: "boolean"
        }});
    }
};

const deleteProduct = (req, res) => {
    const id = req.params.id;
    productController.deleteProduct(id)
        .then(response => {
            if(response){
                res.status(200).json(response);
            }else{
                res.status(400).json({message: "Invalid ID"});
            }
        })
        .catch(err => res.status(400).json({message: err.message}))
};

module.exports = {
    getAllProducts,
    postProduct,
    getProductById,
    patchProduct,
    putProduct,
    deleteProduct
};

