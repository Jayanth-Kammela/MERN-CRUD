var express = require('express');
var router = express.Router();


const protectRoute=require('../middleware')

const todoRoute=require('../contoller/todoController');


router.use(protectRoute)

router.get("/", todoRoute.getUserProduct);

router.get("/:id", todoRoute.getProduct);

// router.get("/todouser", todoRoute.getUserProduct);

router.delete("/:id", todoRoute.deleteProduct);

router.put("/:id", todoRoute.updateProduct);

router.post("/", todoRoute.createProduct);


module.exports = router;