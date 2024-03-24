#!/usr/bin/env node
import {print} from "@anio-js-foundation/str-colorize"
import parseCLIArgs from "@anio-node-foundation/cli-parse-args"
import fs from "node:fs/promises"
import vipen from "./index.mjs"

const args = await parseCLIArgs(process.argv.slice(2), {
	min_operands: 1
})

print.stderr(`Vipen\n`)

const project_root = await fs.realpath(args.operands[0])

if (!project_root) {
	throw new Error(`Unable to resolve ${args.operands[0]}.`)
}

await vipen(project_root)
