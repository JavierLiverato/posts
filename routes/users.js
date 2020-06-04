var express = require('express');
var router = express.Router();

let UserController = require('../controllers/UserController');

router.post('/', async (req, res) => {
    const resp = await UserController.store(req)
    if (resp.code >= 400) console.error({result: resp.data})
    return res.status(resp.code).send({result: resp.data})
});


module.exports = router;
