import { NumberAttribute, StringAttribute } from "@clara/api/attribute";
import { Randomizer, type RandomizerArguments } from "@clara/api/random";
import firstNames from "../data/names/first_names.json" with { type: "json" };

export const nameRandomizerParameters = {
	year: "number",
	sex: "shortText",
} as const;

type NameRandomizerParameters = typeof nameRandomizerParameters;
type M = RandomizerArguments<NameRandomizerParameters>;

export class NameRandomizer extends Randomizer<NameRandomizerParameters, StringAttribute> {
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

	public defaultArguments(): RandomizerArguments<NameRandomizerParameters> {
		return {
			year: new NumberAttribute(2000),
			sex: new StringAttribute("M"),
		};
	}

	public random(parameters: RandomizerArguments<NameRandomizerParameters>): StringAttribute {
		const yearData = (firstNames as any)[`${parameters.year.value}`] as any[];
		const options = yearData.filter(name => name.sex === parameters.sex.value);
		let choice = options[Math.floor(Math.random() * options.length)];
		return new StringAttribute(choice.name);
	}
}

export const NAME_RANDOMIZER = new NameRandomizer();
