import { Randomizer, type RandomizerArguments } from "@clara/api/random";
import firstNames from "../data/names/first_names.json" with { type: "json" };

export const nameRandomizerParameters = {
	year: "number",
	sex: "shortText",
} as const;

type NameRandomizerParameters = typeof nameRandomizerParameters;
type M = RandomizerArguments<NameRandomizerParameters>;

export class NameRandomizer extends Randomizer<NameRandomizerParameters, string> {
	public constructor() {
		super({
			name: "Name Randomizer",
			id: "name-randomizer",
			description: "Generate a random name.",
			icon: "IdCard",
			pluginId: "novel",
		});
	}

	public parameters(): NameRandomizerParameters {
		return nameRandomizerParameters;
	}

	public random(parameters: RandomizerArguments<NameRandomizerParameters>): string {
		const yearData = (firstNames as any)[`${parameters.year}`] as any[];
		const options = yearData.filter(name => name.sex === parameters.sex);
		return options[Math.random() * options.length];
	}
}

export const NAME_RANDOMIZER = new NameRandomizer();
