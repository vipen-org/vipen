export default async function(
	ctx, {
		directories_managed_by_vipen,
		files_managed_by_vipen,
		actual_entries_on_disk
	}
) {
	let remove = []

	while (true) {
		if (!actual_entries_on_disk.length) break

		const current_entry = actual_entries_on_disk.shift()

		if (files_managed_by_vipen.has(current_entry)) {
			files_managed_by_vipen.delete(current_entry)
		}
		//
		// make sure that entry isn't a directory that is managed
		// by vipen
		//
		else if (!directories_managed_by_vipen.includes(current_entry)) {
			remove.push(current_entry)
		}
	}

	return remove
}
