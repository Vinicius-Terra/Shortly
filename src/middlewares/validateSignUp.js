import joi from "joi";

export default async function validateSignUp(req, res, next) {
    const user = req.body;
    const nameRegex = /^[a-zA-Z ]{2,25}$/;

    console.log("oi")
    const userSchema = joi.object({
        name: joi.string().pattern(nameRegex).required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
        confirmPassword: joi.string().required().valid(joi.ref("password"))
    });
    const validation = userSchema.validate(user, { abortEarly: false });
    if (validation.error) {
        res.status(422).send(validation.error.details);
        return;
    }

    next();
}