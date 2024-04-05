import {mkdirp, clean} from "@anio-software/fs"
import path from "node:path"

export default async function(vipen_session) {
	const dist_path = path.join(vipen_session.project.root, "dist")

	await mkdirp(dist_path)
	await clean(dist_path)
}
