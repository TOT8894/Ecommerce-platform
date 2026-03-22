export const errorHandler=(err,req,res,next)=>{
    console.log("error has occured",err.stack);
    res.status(500).json(
        {
            message:"error has occured",
            success:false,
            error:err.message
        }
    )
    process.exit(1)
    

}