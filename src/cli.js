import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { CliError } from './errors.js';

const CLI = async (CliPath, CliUser, stdout = console, stdin = { input, output }, stdinUtil = readline) => {
    let opened = true
    stdout.log("VirtualCLI 1.0.0 by pozlovatel_8787.")
    const rl = stdinUtil.createInterface(stdin)
    let TxT = ""

    while (opened) {
        const command = await rl.question(`${CliPath}@${CliUser}> `)
        if (command.split(" ")[0] === "cd") {
            const oldPath = CliPath
            CliPath = command.split(" ")[1].replace("./", `${oldPath}/`)
        } else if (command === "exit") {
            opened = false
        } else if (command.split(" ")[0] === "sudo") {
            stdout.error(new CliError("Superuser mode is not supported").message)
        } else if (command.split(" ")[0] === "nano") {
            TxT = await rl.question("1 ")
        } else if (command.split(" ")[0] === "cat") {
            stdout.log(TxT)
        } else {
            const errorCli = new CliError("Unknown command")
            stdout.error(errorCli.message)
        }
    }
    rl.close();
}

export default CLI