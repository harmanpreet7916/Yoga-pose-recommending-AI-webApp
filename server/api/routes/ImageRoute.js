const express = require('express');
const app = require('../../app').default;
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({message:"get route is working"})
})
router.post('/',(req,res,next)=>{
    res.status(200).json({message:"post post route is working"})

})

module.exports =router;
// return router;