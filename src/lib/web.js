import { logs } from "./cli-help.js";
import CLI from "../cli.js";

class WebInput {}

coCLI("~", "User1234", logs, {}, { createInterface: () => { return new WebInput() } })