import User from '../model/userModel.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const Register = async (req, res) => {   
     
    const { name , email , password} = req.body;
  try{
         if( !name || !email || !password)  
        return res.status(400).json({message:'all field are required'});

         const existingUser = await User.findOne({email});

         if(existingUser)
         {
            return res.status(400).json({
                message:"user is already exist"
            })
         }
         const hashPassword = await bcrypt.hash(password, 10);
         
         const user = await User.create({
            name, email, password : hashPassword
         });

         res.status(201).json({message:"user created successfully", user})


    }catch(error)
    {
      res.status(500).json({message:error.message})
    }

}

export const Login = async (req, res) => {   

   const { email ,  password } = req.body;
   try{

    if(!email || !password)  return res.status(400).json({messgae:"all field are required"});

    const user = await User.findOne({email});

    if(!user){
            return res.status(404).json({
            message:"user not found"
        })
    }
    const isMatch = await bcrypt.compare(password , user.Password);
   
    const accessToken = generateToken(user._id);

    const refreshToken = generateRefreshToken(user._id);

    res.status(200).json({
        message:"login successfully",
    
    })


   }catch(error)
   {
      res.status(500).json({message:error.message})
   }
}   
export const refreshToken = async(req,res)=>{
      const {refreshToken} = req.body;

    try{
      if(!refreshToken){
        return res.status(401).json({message:"refresh token required"})
      }   
      const extract = jwt.verify(refreshToken,process.env.REFRESH_TOKEN)

      const accessToken = generateToken = generateAcessToken(extract.id)

      res.status(200).json({accessToken})
    }catch(error)
    {
      res.status(500).json({message:error.message});
    }
}

