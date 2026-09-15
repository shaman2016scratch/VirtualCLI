import { logs } from "./cli-help.js";
import CLI from "../cli.js";

class WebInput {
    constructor (domElement) {
        this.input = domElement
    }

    async question (text) {
        const id = crypto.randomBytes(Math.floor(Math.random() * (64 - 32 + 1) + 32)).toString()
        window.isInputted = false
        this.input.innerHTML += `${text}<input type="text" id="input-id${id}"><button onclick="window.isInputted = true"></button><br>`
        const generator = () => new Promise(resolve => {
            if (!window.isInputted) {
                // ignore
            } else {
                resolve(true)
            }
        })
        return document.getElementById(`input-id${id}`).value
    }

    close () {}
}

const WebVirtualCLI = (input) => {
    CLI("~", "User1234", logs, {}, { createInterface: () => { return new WebInput(input) } })
}

export {
    WebInput,
    WebVirtualCLI
}