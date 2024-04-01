import path from "node:path"

export default async function(vipen_session) {
	await vipen_session.target_integration.initialize(vipen_session.public_interface)

	//
	// examine config.autogenerate and friends
	//
	if ("autogenerate" in vipen_session.project.config) {
		let autogenerate = []

		if (!Array.isArray(vipen_session.project.config.autogenerate)) {
			for (const file in vipen_session.project.config.autogenerate) {
				autogenerate.push({
					create: file,
					from: vipen_session.project.config.autogenerate[file]
				})
			}
		}

		for (const entry of autogenerate) {
			const relative_path = path.join("src", "auto", entry.create)
			const absolute_path = path.join(vipen_session.project.root, relative_path)

			vipen_session.files_to_autogenerate.push({
				relative_path,
				absolute_path ,
				async generateFileSourceCode() {
					return await entry.from(vipen_session.public_interface)
				}
			})
		}
	}
}
