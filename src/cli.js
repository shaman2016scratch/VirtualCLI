import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { CliError } from './errors.js';
import { read } from './fs.js';

const CLI = async (CliPath, CliUser, stdout = console, stdin = { input, output }, stdinUtil = readline) => {
    let opened = true
    stdout.log("VirtualCLI 1.0.0 by pozlovatel_8787.")
    const rl = stdinUtil.createInterface(stdin)

    while (opened) {
        try {
            const command = await rl.question(`${CliPath}@${CliUser}> `)
            if (command.split(" ")[0] === "cd") {
                const oldPath = CliPath
                CliPath = command.split(" ")[1].replace("./", `${oldPath}/`)
            } else if (command === "exit") {
                opened = false
            } else if (command.split(" ")[0] === "sudo") {
                stdout.error(new CliError("Superuser mode is not supported").message)
            } else if (command.split(" ")[0] === "nano") {
                stdout.error(new CliError("nano is not supported").message)
            } else if (command.split(" ")[0] === "cat") {
                const TxT = await read(command.split(" ")[1])
                stdout.log(TxT)
            } else {
                throw new CliError("Unknown command")
            }
        } catch (err) {
            stdout.error(err.message)
        }
    }
    rl.close();
}

export default CLI