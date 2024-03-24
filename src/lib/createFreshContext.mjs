import path from "node:path"
import fs from "node:fs/promises"

export default function(project_root, project_config) {
	let ctx = {
		warnings: [],

		config: project_config,

		root: project_root,

		files_to_autogenerate: [],
		files_to_build: [],

		//
		// data storage for different vipen targets
		//
		target: {
			data: {}
		},

		//
		// files to auto-generate interface
		//
		autogenerate: {
			warningComment() {
				return `// Warning: this file was automatically created by vipen vXXXXX
// You will find more information about the specific vipen version used inside the file src/auto/VERSION.txt
// You should commit this file to source control\n`
			}
		},

		//
		// files to build interface
		//
		build: {}
	}

	// todo: use absolute_path
	ctx.autogenerate.addFile = function(file_path, generator, ...generator_args) {
		const relative_path = path.join("src", "auto", file_path)
		const absolute_path = path.join(ctx.root, relative_path)

		ctx.files_to_autogenerate.push({
			relative_path,
			absolute_path,
			async generate() {
				const source_code = await generator.call(ctx, file_path, ...generator_args)

				await fs.writeFile(absolute_path, source_code)
			}
		})
	}

	// todo: use absolute_path
	ctx.build.addFile = function(file_path, builder, ...builder_args) {
		const relative_path = path.join("build", file_path)
		const absolute_path = path.join(ctx.root, relative_path)

		ctx.files_to_build.push({
			relative_path,
			absolute_path,

			async build() {
				await builder.call(ctx, file_path, ...builder_args)
			}
		})
	}

	return ctx
}
