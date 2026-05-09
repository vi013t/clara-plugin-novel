import { NameRandomizer } from "../randomizers/name_randomizer.ts";
import { AttributeDefinition, AttributeType } from "@clara/api/attribute";
import { Group, ItemType } from "@clara/api/database";
import { registerTemplate } from "@clara/api/plugin";
import { Template } from "@clara/api/project";
import { TabList } from "@clara/api/ui";

export function registerBasicNovelTemplate() {
	const characters = new Group({
		name: "Characters",
		icon: "UserRound",
		description: "The characters of this story.",
		attributes: [new AttributeDefinition({ name: "Name", type: AttributeType.fromName("shortText") })],
	});

	const locations = new Group({
		name: "Locations",
		icon: "MapPin",
		description: "The locations in this story.",
		attributes: [new AttributeDefinition({ name: "Name", type: AttributeType.fromName("shortText") })],
	});

	const plotEvents = new Group({
		name: "Plot Events",
		icon: "TextInitial",
		description: "The events of this story. The actual scene prose exists here.",
		attributes: [new AttributeDefinition({ name: "Name", type: AttributeType.fromName("shortText") })],
	});

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

	const database = new Group(
		{
			name: "Basic Novel",
			icon: "Book",
			description: "A barebones novel template.",
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
			types: [characterType, locationType],
		}),
	);
}
