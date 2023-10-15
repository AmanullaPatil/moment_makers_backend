const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');
const { body, validationResult } = require('express-validator');



const createAdmin = async (req,res) => {
    // return 1 
    const { name, email, password } = req.body;
    
    try{
        if(!name || !email || !password){
           return res.send('All fields are required');
        }
   const existingAdminByEmail = await Admin.findOne({email:req.body.email})
    if(existingAdminByEmail){
        res.send("Email already exists")
    }else{
       
        let result = await Admin.create({  
            'email':email,
            'name': name,
            'password':password
        });
        result.password = undefined;
        res.send(result);
    }
}catch(err){ 
    res.status(500).json(err);
}

}

const adminLogIn = async (req,res)=>{
    if(req.body.email && req.body.password){
        let admin =await Admin.findOne({email:req.body.email});
        if(Admin){
            if(req.body.password===admin.password){
                admin.password = undefined;
                res.send(admin);
            }else{
                res.send({message:'Invalid Password'});
            }
        }else{
            res.send({message:'User not found'});
        }
    }else{
res.send({message:'Email and Password are required'})
    }
};

const updateAdmin = async(req,res)=>{
    try{
        if(req.body.password){
            // const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password)
            console.log(2);
            let result = await Admin.findIdAndUpdate(req.body.id)
            result.password = hashedPassword
            const updatePassword = await result.save();
            // result.password = undefined;
            res.send(updatePassword)
        }
        }catch(error){
            res.status(500).json(error); 
        }
}


module.exports ={createAdmin,adminLogIn,updateAdmin}