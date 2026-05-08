import { AttributeDefinition } from "@clara/api/attribute";
import { Group, Item } from "@clara/api/database";
import { Template } from "@clara/api/project";
import { TabList } from "@clara/api/ui";
import { NameRandomizer } from "../randomizers/name_randomizer.ts";
import { registerTemplate } from "@clara/api/plugin";

export function registerThreeActStructureTemplate() {
	const characters = new Group(
		{
			name: "Characters",
			icon: "UserRound",
			description: "The characters of this story.",
			attributes: [
				AttributeDefinition.basic("Name", "shortText"),
				AttributeDefinition.basic("Gender", "shortText"),
				AttributeDefinition.basic("Sexuality", "shortText"),
				AttributeDefinition.basic("Height", "length"),
				AttributeDefinition.basic("Partner", "entries"),
			],
		},
		new Group("Main Characters"),
		new Group("Side Characters"),
	);

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
			attributes: [
				AttributeDefinition.basic("Name", "shortText"),
				AttributeDefinition.basic("Script", "longText"),
				AttributeDefinition.basic("Notes", "longText"),
			],
		},
		new Group(
			{ name: "Act I" },
			new Group("Hook", new Group(new Group("Chapter 1", new Item("Scene 1")))),
			new Group("Inciting Incident"),
			new Group("First Plot Point"),
		),
		new Group({ name: "Act II" }, new Group("First Pinch Point"), new Group("Midpoint"), new Group("Second Pinch Point")),
		new Group({ name: "Act III" }, new Group("Third Plot Point"), new Group("Climax"), new Group("Resolution")),
	);

	const database = new Group(
		{
			name: "Three Act Novel",
			icon: "Drama",
			description: "A novel template using the traditional three-act structure.",
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
