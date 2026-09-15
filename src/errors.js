class CliError extends Error {
    constructor (error) {
        super(`CliError: ${error}`)
        this.output = console
    }

    withLog () {
        this.output.error(this.message)
    }
}

class PkgError extends Error {
    constructor (error) {
        super(`CliPkg Error: ${error}`)
    }
}

export {
    CliError,
    PkgError
}