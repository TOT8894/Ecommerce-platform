import userValidation from "../middleware/userMiddleware.js"
import bcrypt from "bcrypt"

export const createUser = async (req, res) =>{
    try {
        const { full_name, email, password,phone,address} = req.body;
        const { error } = userValidation.validate(req.body);

        if (error) {
            const error = new Error("invalid input");
            error.statusCode = 400;
            throw error;
        }

        if (!full_name || !email || !password || !phone || !address) {
            const error = new Error("all information is required");
            error.statusCode = 400;
            throw error;
        }

        const user = await User.findOne({ email });
        if (user) {
            const error = new Error("user has already exist");
            error.statusCode = 409;
            throw error;
        }

        if (password.length < 8) {
            const error = new Error("password is not strong");
            error.statusCode = 400;
            throw error;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create(
            {
                full_name,
                email,
                phone,
                address,
                role:User.role || "user",
                password: hashedPassword
            }
        );

        const userObject = user.toObject();
        delete userObject.password;

        res.status(201).json(
            {
                message: "successfuly signup",
                success: true,
                data: userObject
            }
        )

    }
    catch (error) {
        next(error)
    }

}    


export const getUser = async (req, res) => {
    try {
        const user = await User.find().sort({createdAt:-1})
        if (!user) {
            const error = new Error("user not found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json(
            {
                success: true,
                data: user
            }
        )
    }
    catch (error) {
        next(error)
    }

}


export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if(!user){
            const error = new Error("user not found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json(
            {
                success: true,
                data: user
            }
        )
    }
    catch (error) {
        next(error)
    }

}


export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { full_name, email, password,phone,address } = req.body;
        const { error } = userValidation.validate(req.body);
         if (error) {
            const error = new Error("invalid input");
            error.statusCode = 400;
            throw error;
        }
         if (!full_name || !email || !password || !phone || !address) {
            const error = new Error("all information is required");
            error.statusCode = 400;
            throw error;
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const user = await User.findByIdAndUpdate(id,
            {
                full_name,
                email,
                phone,
                address,
                role:User.role || "user",
                password:hashedPassword
            },
            { new: true ,runValidators:true}
        );
        
        const userObject = User.toObject();
        delete userObject.password;

        res.status(201).json(
            {
                message: "successfuly updated",
                success: true,
                data: userObject
            }
        )
    }
    catch (error) {
        next(error)
    }

}


export const deleteUser = async (req, res) => { 
    try{
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
         if(!user){
            const error = new Error("user not found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json(
            {
                success: true,
                message:"user deleted successfully",
                data: user
            }
        )
    }
    catch (error) {
        next(error)
    }

}


 