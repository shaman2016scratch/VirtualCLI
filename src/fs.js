import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";

const readJson = async (filePath) => {
	const content = await fsPromises.readFile(filePath, "utf8")
	return JSON.parse(content)
};

const writeJson = async (filePath, data) =>
	fsPromises.writeFile(filePath, JSON.stringify(data), "utf8")

const read = async (filePath) => {
	const content = await fsPromises.readFile(filePath, "utf8")
	return content
};

const write = async (filePath, data) =>
	fsPromises.writeFile(filePath, data, "utf8")

export {
    readJson,
    writeJson,
    read,
    write
}