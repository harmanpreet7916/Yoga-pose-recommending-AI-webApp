const express = require('express');
const app = require('../../app').default;
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({message:"chal da e oye"})
})
router.post('/',(req,res,next)=>{
    res.status(200).json({message:"post v chaldda"})

})

module.exports =router;
// return router;