class apiErrors extends Error {
    constructor(
        message = "something went wrong",
        statusCode,
        errors = [],
        statck = ""
    )
    {
        this.statusCode = statusCode
        super(message)
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

        if(this.stack)
        {
            this.stack = stack
        }
        else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
   
}