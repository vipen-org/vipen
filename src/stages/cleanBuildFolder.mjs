import {mkdirp, clean} from "@anio-node-foundation/fs-utils"
import path from "node:path"

export default async function(vipen_session) {
	const build_path = path.join(vipen_session.project.root, "build")

	await mkdirp(build_path)
	await clean(build_path)
}
