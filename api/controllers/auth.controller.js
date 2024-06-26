import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !email || !password || email === '' || email === '' || password === '') {
        return next(errorHandler(400, 'All fields are required'));
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(errorHandler(409, 'User already exists'));
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const newUser = new User({
            email,
            email,
            password: hashedPassword
        });

        await newUser.save();
        return res.status(201).json('Signup successful');
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(errorHandler(400,'All fields are required'))
    }

    try {
        const validUser = await User.findOne({email});
        if (!validUser) {
            return next(errorHandler(404,'User not found'));
        }

        const validPassword = bcryptjs.compareSync(password,validUser.password);

        if(!validPassword){
            return next(errorHandler(401,'Invalid password'))
        }

        const {password:pass,...rest} = validUser._doc;

        const token = jwt.sign(
            {id: validUser._id},
            process.env.JWT_SECRET,
            {expiresIn:'5h'}
        );

        return res.status(200).cookie('access token',token,{httpOnly:true}).json(rest)
    } catch (error) {
        next(error)
    }
};