const router = require('express').Router();
const productServices = require('./products.services');

router.get('/', productServices.getAllProducts);
router.post('/', productServices.postProduct);
router.get('/:id', productServices.getProductById);
router.patch('/:id', productServices.patchProduct);
router.put('/:id', productServices.putProduct);
router.delete('/:id', productServices.deleteProduct);

module.exports = router;