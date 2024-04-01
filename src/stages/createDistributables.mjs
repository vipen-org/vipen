import path from "node:path"
import {writeAtomicFile} from "@anio-node-foundation/fs-utils"

export default async function(vipen_session) {
	for (const {relative_path, generateDistributableFileContents} of vipen_session.distributables) {
		const source_code = await generateDistributableFileContents()

		await writeAtomicFile(
			path.join(vipen_session.project.root, relative_path), source_code, {
				create_parents: true
			}
		)
	}
}
