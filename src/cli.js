import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { CliError } from './errors.js';

const CLI = async (CliPath, CliUser) => {
    let opened = true
    console.log("VirtualCLI 1.0.0 by pozlovatel_8787.")
    const rl = readline.createInterface({ input, output })

    while (opened) {
        const command = await rl.question('>>> ')
        if (command.split(" ")[0] === "cd") {
            CliPath = command.split(" ")[1]
        } else if (command === "exit") {
            opened = false
        } else if (command.split(" ")[0] === "sudo") {
            console.error(new CliError("Superuser mode is not supported").message)
        } else {
            console.error(new CliError("Unknown command").message)
        }
    }
    rl.close();
}

export default CLI