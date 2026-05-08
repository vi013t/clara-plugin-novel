import { NameRandomizer } from "../randomizers/name_randomizer.ts";
import { AttributeDefinition } from "@clara/api/attribute";
import { Group } from "@clara/api/database";
import { registerTemplate } from "@clara/api/plugin";
import { Template } from "@clara/api/project";
import { TabList } from "@clara/api/ui";

export function registerBasicNovelTemplate() {
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

	const plotEvents = new Group({
		name: "Plot Events",
		icon: "TextInitial",
		description: "The events of this story. The actual scene prose exists here.",
		attributes: [AttributeDefinition.basic("Name", "shortText")],
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
		}),
	);
}
