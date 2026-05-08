import { Randomizer } from "@clara/api/random";
import { PLUGIN_ID } from "../index.ts";
import firstNames from "../data/names/first_names.json" with { type: "json" };

export type NameRandomizerParameters = {
	year: "number";
	sex: "M" | "F";
};

export type SerializedNameRandomizer = {};

export class NameRandomizer extends Randomizer<NameRandomizerParameters, string> {
	public constructor() {
		super({
			name: "Name Randomizer",
			id: "name-randomizer",
			description: "Generate a random name.",
			icon: "IdCard",
			pluginId: PLUGIN_ID,
		});
	}

	public random(parameters: NameRandomizerParameters): string {
		const yearData = (firstNames as any)[parameters.year] as any[];
		const options = yearData.filter(name => name.sex === parameters.sex);
		return options[Math.random() * options.length];
	}
}
