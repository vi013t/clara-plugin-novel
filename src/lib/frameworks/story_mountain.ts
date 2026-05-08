import { NameRandomizer } from "../randomizers/name_randomizer.ts";
import { AttributeDefinition } from "@clara/api/attribute";
import { Group } from "@clara/api/database";
import { registerTemplate } from "@clara/api/plugin";
import { Template } from "@clara/api/project";
import { TabList } from "@clara/api/ui";

export function registerStoryMountainTemplate() {
	const characters = new Group({
		name: "Characters",
		icon: "UserRound",
		description: "The characters of this story.",
		attributes: [AttributeDefinition.basic("Name", "shortText")],
	});

	const locations = new Group({
		name: "Locations",
		icon: "MapPin",
		description: "The locations in this story.",
		attributes: [AttributeDefinition.basic("Name", "shortText")],
	});

	const plotEvents = new Group(
		{
			name: "Plot Events",
			icon: "TextInitial",
			description: "The events of this story. The actual scene prose exists here.",
			attributes: [AttributeDefinition.basic("Name", "shortText")],
		},
		new Group({
			name: "Exposition",
			description: "The initial backstory and catch-up of the story.",
			icon: "Telescope",
			attributes: [AttributeDefinition.basic("Name", "shortText")],
		}),
		new Group({
			name: "Rising action",
			description: "The tension-building and stakes-building events leading up to the climax.",
			icon: "MoveUpRight",
			attributes: [AttributeDefinition.basic("Name", "shortText")],
		}),
		new Group({
			name: "Climax",
			description: "The main payoff of the story.",
			icon: "Sparkles",
			attributes: [AttributeDefinition.basic("Name", "shortText")],
		}),
		new Group({
			name: "Falling Action",
			description: "The decrease in tension and stakes after the climax.",
			icon: "MoveDownRight",
			attributes: [AttributeDefinition.basic("Name", "shortText")],
		}),
		new Group({
			name: "Resolution",
			description: "The finishing beats.",
			icon: "Cake",
			attributes: [AttributeDefinition.basic("Name", "shortText")],
		}),
	);

	const database = new Group(
		{
			name: "Story Mountain",
			icon: "Mountain",
			description: "A novel template using the story mountain framework.",
		},
		plotEvents,
		characters,
		locations,
	);

	registerTemplate(
		new Template({
			layout: { split: "none", tabline: new TabList([]), selectedTabID: 0 },
			pinnedGroups: [database, plotEvents, characters, locations],
			database: database,
			randomizers: [new NameRandomizer()],
		}),
	);
}
