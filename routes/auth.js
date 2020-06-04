var express = require('express');
var router = express.Router();

const auth = require('../middleware/auth')
let AuthController = require('../controllers/AuthController');

router.post('/login', async (req, res) => {
    const resp = await AuthController.login(req)
    if (resp.code >= 400) console.error({result: resp.data})
    return res.status(resp.code).send({result: resp.data})
});

router.get('/refresh', [auth.required], async (req, res) => {
    const resp = await AuthController.refresh(req)
    if (resp.code >= 400) console.error({result: resp.data})
    return res.status(resp.code).send({result: resp.data})
});


module.exports = router;
