const pwdSchema = require('../models/password');

module.exports = (req, res, next)=>{
    if( req.body.password != pwdSchema){
        error => res.status(404).json({ error });
    }else{
        next();
    }
}