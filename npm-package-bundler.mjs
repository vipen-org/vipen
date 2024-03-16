export default {
	preprocessing: [{
		file: "./src/template.mjs",
		items: {
			"async function scandir": "function scandir",
			"await fs_object.readdir": "fs_object.readdir",
			"await fs_object.lstat": "fs_object.lstat",
			"const handle_current_entry = async () => {": "const handle_current_entry = () => {",
			"await options.callback(data)": "options.callback(data)",
			"const recurse = async () => {": "const recurse = () => {",
			"await scandir(": "scandir(",
			"await recurse()": "recurse()",
			"await handle_current_entry()": "handle_current_entry()",
			"export default async function": "export default function",
			"await fs_object.realpath(": "fs_object.realpath("
		},
		output: "./src/auto/sync.mjs"
	}, {
		file: "./src/template.mjs",
		items: {},
		output: "./src/auto/async.mjs"
	}]
}
