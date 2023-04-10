const mongoose = require("mongoose")

const fileSchema = new mongoose.Schema(
    {
        author: {
            type: String,
            //required: true
        },
        file: {
            type: Object,
            
        },
        date: {
            type: String, 
            //required: true
        },
        likes: {
            type: Number,
           // required: true
        },
        dislikes: {
            type: Number,
           // required: true
        },
        category: {
            type: String,
            //required: true
        },
        comments: {
            type: Array,
        }
    }
)

const File = mongoose.model("File", fileSchema)
module.exports = File;