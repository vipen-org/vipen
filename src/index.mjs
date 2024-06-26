import createVipenSession from "./lib/init/createVipenSession.mjs"
import stages from "./stages/index.mjs"

export default async function(project_root) {
	const vipen_session = await createVipenSession(project_root)

	await vipen_session.initializeTarget()

	for (const stage of stages) {
		await stage(vipen_session)
	}

	for (const warning of vipen_session.project.warnings) {
		console.log(warning.id, warning.message)
	}
}

/*
import {createRequire} from "node:module"

import createFreshContext from "./lib/createFreshContext.mjs"
import manageAutoGeneratedDirectories from "./lib/manageAutoGeneratedDirectories.mjs"
import loadProjectConfiguration from "./lib/loadProjectConfiguration.mjs"
import path from "node:path"
import fs from "node:fs/promises"

async function loadVipenIntegration(require, realm) {
	const integration_package_json = JSON.parse(
		await fs.readFile(require.resolve(`@vipen/target-${realm}/package.json`))
	)

	console.log("using", `@vipen/target-${realm} v${integration_package_json.version}`)

	const integration_module = await import(require.resolve(`@vipen/target-${realm}/vipen-integration`))

	return {
		version: integration_package_json.version,
		initializeTarget: integration_module.initializeTarget
	}
}

async function getTargetModule(context) {
	const require = createRequire(path.join(context.root, "index.js"))

	return await loadVipenIntegration(require, context.config.realm)
}

async function run(context) {
	const entries_to_remove = await manageAutoGeneratedDirectories(context)

	for (const entry of entries_to_remove) {
		console.log("removing", entry)

		await fsRemove(path.join(context.root, entry))
	}

	//
	if ("preprocessing" in context.config) {
		for (const fn of context.config.preprocessing) {
			await fn(context)
		}
	}
	//

	for (const file of context.files_to_autogenerate) {
		console.log("generating", file.relative_path)

		await file.generate()
	}

	for (const file of context.files_to_build) {
		console.log("building", file.relative_path)

		await file.build()
	}

	//
	if ("postprocessing" in context.config) {
		for (const fn of context.config.postprocessing) {
			await fn(context)
		}
	}
	//

	for (const warning of context.warnings) {
		console.log(warning.id, warning)
	}
}

export default async function(project_root) {
	const project_config = await loadProjectConfiguration(project_root)
	const context = createFreshContext(project_root, project_config)

	const {version, initializeTarget} = await getTargetModule(context)

	await initializeTarget(context.public_interface)

	// stages in their order:
	//
	// update
	// prep
	// report
	// hk
	// tree
	// scrub
	// gen
	// build
	// test
	// deploy
	//

	await run(context)
}
*/
