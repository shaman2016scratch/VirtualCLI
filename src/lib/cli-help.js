import CLI from "../src/cli.js";
class LogHistory {
    history = []

    log (m) {
        this.history.push({ type: "log", message: m })
    }

    warn (m) {
        this.history.push({ type: "warn", message: m })
    }

    error (m) {
        this.history.push({ type: "error", message: m })
    }
}

const logs = new LogHistory()

export {
    LogHistory,
    logs
}