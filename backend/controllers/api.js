const { default: axios } = require("axios")

// create pdf from data without using zoho
module.exports.makePdf = async(req,res) => {
    console.log(req.body);
    return res.status(200).json({
        success : true,
        message : `hello mf`
    })
}