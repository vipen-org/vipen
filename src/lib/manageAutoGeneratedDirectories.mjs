import path from "node:path"
import {isRegularDirectory} from "@anio-node-foundation/fs-utils"
import fsScandir from "@anio-node-foundation/fs-scandir"
import determineFilesToBeRemoved from "./determineFilesToBeRemoved.mjs"

function determineDirectoriesManagedByVipen(files_managed_by_vipen) {
	let directories = new Map()

	for (const file of files_managed_by_vipen) {
		const dirname = path.dirname(file)

		directories.set(dirname, 1)
	}

	return [...directories].map(([key, value]) => key)
}

function arrayToMap(array) {
	let map = new Map()

	for (const item of array) {
		map.set(item, 1)
	}

	return map
}

export default async function(ctx) {
	//
	// determine which files are managed by vipen
	// so we can scrub those files and prune
	// the directories of obsolete files
	//
	const files_managed_by_vipen = [
		...ctx.files_to_autogenerate.map(file => file.relative_path),
		...ctx.files_to_build.map(file => file.relative_path)
	]

	const directories_managed_by_vipen = determineDirectoriesManagedByVipen(files_managed_by_vipen)

	//
	// place all files/folders that are on disk in this map
	// so we can later compare this array to files_managed_by_vipen
	//
	let actual_entries_on_disk = new Map()

	//
	// make sure directories_managed_by_vipen are all directories
	//
	for (const dir of directories_managed_by_vipen) {
		const absolute_dir_path = path.join(ctx.root, dir)

		if (!isRegularDirectory.sync(absolute_dir_path)) {
			throw new Error(`Expected ${dir} to be a directory.`)
		}

		const entries = await fsScandir(absolute_dir_path)

		for (const entry of entries) {
			actual_entries_on_disk.set(path.join(dir, entry.relative_path), 1)
		}
	}

	actual_entries_on_disk = [...actual_entries_on_disk].map(([key, value]) => key)

	return await determineFilesToBeRemoved(ctx, {
		directories_managed_by_vipen,
		files_managed_by_vipen: arrayToMap(files_managed_by_vipen),
		actual_entries_on_disk
	})
}
