import {scandir, mkdirp} from "@anio-software/fs"
import path from "node:path"

export default async function(vipen_session) {
	let entries = await scandir(
		path.join(vipen_session.project.root, "src"), {
			filter({type}) {
				return type === "dir"
			}
		}
	)

	for (const {relative_path} of entries) {
		const target_path = path.join(vipen_session.project.root, "build", "src", relative_path)

		await mkdirp(target_path)
	}
}
