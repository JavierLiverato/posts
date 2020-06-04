var express = require('express');
var router = express.Router();

const auth = require('../middleware/auth')
let PostController = require('../controllers/PostController');

router.get('/', [auth.required], async (req, res) => {
    console.log('1---',req.payload);
    
    const resp = await PostController.index(req)
    console.log('222');
    
    if (resp.code >= 400) console.error({result: resp.data})
    return res.status(resp.code).send({result: resp.data})
});

router.post('/', [auth.required], async (req, res) => {
    const resp = await PostController.store(req)
    if (resp.code >= 400) console.error({result: resp.data})
    return res.status(resp.code).send({result: resp.data})
});

router.delete('/:id', [auth.required], async (req, res) => {
    const resp = await PostController.delete(req)
    if (resp.code >= 400) console.error({result: resp.data})
    return res.status(resp.code).send({result: resp.data})
});


module.exports = router;
