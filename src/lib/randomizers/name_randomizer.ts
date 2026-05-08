import { getIcon } from "@clara/api/icons";
import { Randomizer } from "@clara/api/random";
import firstNames from "../data/names/first_names.json" with { type: "json" };

export type NameRandomizerParameters = {
	year: "number";
	sex: "M" | "F";
};

export class NameRandomizer extends Randomizer<NameRandomizerParameters, string> {
	public constructor() {
		super("Name", "Generate a random name.", getIcon("IdCard"));
	}

	random(parameters: NameRandomizerParameters): string {
		const yearData = (firstNames as any)[parameters.year] as any[];
		const options = yearData.filter(name => name.sex === parameters.sex);
		return options[Math.random() * options.length];
	}
}
