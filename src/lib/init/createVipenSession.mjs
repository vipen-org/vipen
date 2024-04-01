import createPublicInterface from "./createPublicInterface.mjs"
import loadVipenProjectConfiguration from "./loadVipenProjectConfiguration.mjs"
import loadTargetIntegration from "./loadTargetIntegration.mjs"
import initializeTarget from "./initializeTarget.mjs"

export default async function(project_root) {
	const project_config = await loadVipenProjectConfiguration(project_root)

	// await validateVipenProjectConfiguration()

	const target_integration = await loadTargetIntegration(project_root, project_config)

	let vipen_session = {
		project: {
			root: project_root,
			config: project_config,
			warnings: []
		},

		files_to_autogenerate: [],
		distributables: [],

		target_integration,

		public_interface: {},

		async initializeTarget() {
			return await initializeTarget(vipen_session)
		}
	}

	vipen_session.public_interface = createPublicInterface(vipen_session)

	return vipen_session
}
