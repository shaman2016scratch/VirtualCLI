import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { CliError } from './errors.js';
import { read } from './fs.js';

const CLI = async (CliPath, CliUser, stdout = console, std = { input, output }, stdinUtil = readline) => {
    CliPath = CliPath ? CliPath : process.cwd()
    let opened = true
    stdout.log("VirtualCLI 1.0.0 by pozlovatel_8787.")
    const rl = stdinUtil.createInterface(std)

    while (opened) {
        try {
            const command = await rl.question(`${CliPath}@${CliUser}> `)
            if (command.split(" ")[0] === "cd") {
                const oldPath = CliPath
                if (CliPath === process.cwd()) { process.chdir(command.split(" ")[1].replace("./", `${oldPath}/`)); CliPath = process.cwd() } else
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
            } else if (command.split(" ")[0] === "echo") {
                stdout.log(command.replace(" ", "_space2").replaceAll(" ", "_space_").replace("_space2", " ").split(" ")[1].replaceAll("_space_", " ").replaceAll("\\n", "\n").replaceAll("\\t", "\t"))
            } else if (command.split(" ")[0] === "curl") {
                const response = await (await fetch(command.split(" ")[1])).text()
                stdout.log(response)
            } else if (command.split(" ")[0] === "neofetch") {
                stdout.log("NEOFETCH")
                stdout.log(`OS: ${process.platform}`)
                stdout.log(`CLI: VirtualCLi 1.0.0`)
            } else {
                throw new CliError("Unknown command")
            }
        } catch (err) {
            if (rl.closed) {
                opened = false; break
            }
            stdout.error(err.message)
        }
    }
    rl.close();
}

export default CLI