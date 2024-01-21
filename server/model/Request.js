const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema(
    {
        created: {
            type: Date
        },
        appointment: {
            type: Date
        },
        type: {
            type: String
        }
    }
)

const Request = mongoose.model("Request", RequestSchema);
export default Request;