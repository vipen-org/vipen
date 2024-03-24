#!/usr/bin/env node
import {print} from "@anio-js-foundation/str-colorize"
import parseCLIArgs from "@anio-node-foundation/cli-parse-args"
import vipen from "./index.mjs"

const args = await parseCLIArgs(process.argv.slice(2), {
	min_operands: 1
})

print.stderr(`Vipen\n`)

const [project_root] = args.operands

await vipen(project_root)
