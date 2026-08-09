import { AttributeDefinition, AttributeType } from "@clara/api/attribute";
import { Group, ItemType } from "@clara/api/database";
import { registerTemplate } from "@clara/api/plugin";
import { Template } from "@clara/api/project";
import { SinglePane, TabList } from "@clara/api/ui";
import { PLUGIN_ID } from "../index.ts";
import { NAME_RANDOMIZER } from "../randomizers/name_randomizer.ts";

export function registerStoryMountainTemplate() {
	const characterType = new ItemType({
		name: "Character",
		icon: "UserRound",
		attributes: [
			new AttributeDefinition({ name: "Name", type: AttributeType.fromName("shortText") }),
			new AttributeDefinition({ name: "Age", type: AttributeType.fromName("number") }),
			new AttributeDefinition({ name: "Gender", type: AttributeType.fromName("shortText") }),
			new AttributeDefinition({ name: "Height", type: AttributeType.fromName("length") }),
			new AttributeDefinition({ name: "Weight", type: AttributeType.fromName("weight") }),
		],
	});

	const locationType = new ItemType({
		name: "Location",
		icon: "MapPin",
		attributes: [new AttributeDefinition({ name: "Name", type: AttributeType.fromName("shortText") })],
	});

	let sceneType = new ItemType({
		name: "Scene",
		icon: "TextInitial",
		attributes: [new AttributeDefinition({ name: "Content", type: AttributeType.fromName("longText") })],
	});
	const characters = new Group({
		name: "Characters",
		icon: "UserRound",
		description: "The characters of this story.",
		defaultType: characterType,
	});

	const locations = new Group({
		name: "Locations",
		icon: "MapPin",
		description: "The locations in this story.",
		defaultType: locationType,
	});

	const plotEvents = new Group(
		{
			name: "Plot Events",
			icon: "TextInitial",
			description: "The events of this story. The actual scene prose exists here.",
			defaultType: sceneType,
		},
		new Group({
			name: "Exposition",
			description: "The initial backstory and catch-up of the story.",
			icon: "Telescope",
		}),
		new Group({
			name: "Rising action",
			description: "The tension-building and stakes-building events leading up to the climax.",
			icon: "MoveUpRight",
		}),
		new Group({
			name: "Climax",
			description: "The main payoff of the story.",
			icon: "Sparkles",
		}),
		new Group({
			name: "Falling Action",
			description: "The decrease in tension and stakes after the climax.",
			icon: "MoveDownRight",
		}),
		new Group({
			name: "Resolution",
			description: "The finishing beats.",
			icon: "Cake",
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
			layout: new SinglePane(false, new TabList([]), 0),
			plugin_id: PLUGIN_ID,
			pinnedGroups: [database, plotEvents, characters, locations],
			database: database,
			randomizers: [NAME_RANDOMIZER],
			types: [characterType, locationType],
		}),
	);
}
