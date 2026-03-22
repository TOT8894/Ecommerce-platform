import joi from "joi"
const productValidation=joi.object({
    name:joi.string().required(),
    price:joi.number().required().min(0),
    description:joi.string().required(),
    category:joi.string().required(),
    image:joi.string().required(),
    stock:joi.number().required().min(0)

})
export default productValidation;