const firstApi = async (req, res) => {
    const {input} = req.query
    
    try {
        res.status(200).json('Input is: ' + input)
    } catch (error) {
        // Log the error
        console.error(error)
    }
}

module.exports = {
    firstApi,
}
