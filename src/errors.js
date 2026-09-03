class CliError extends Error {
    constructor (error) {
        super(`CliError: ${error}`)
        this.output = console
    }

    withLog () {
        this.output.error(this.message)
    }
}

export {
    CliError
}