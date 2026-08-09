import { AttributeDefinition, AttributeType } from "@clara/api/attribute";
import { Group, Item, ItemType } from "@clara/api/database";
import { registerTemplate } from "@clara/api/plugin";
import { Template } from "@clara/api/project";
import { SinglePane, TabList } from "@clara/api/ui";
import { PLUGIN_ID } from "../index.ts";
import { NAME_RANDOMIZER } from "../randomizers/name_randomizer.ts";

export function registerThreeActStructureTemplate() {
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

	const characters = new Group(
		{
			name: "Characters",
			icon: "UserRound",
			description: "The characters of this story.",
			defaultType: characterType,
		},
		new Group("Main Characters"),
		new Group("Side Characters"),
	);

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
		new Group(
			{ name: "Act I" },
			new Group("Hook", new Group(new Group("Chapter 1", new Item(sceneType, "Scene 1")))),
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
			layout: new SinglePane(false, new TabList([]), 0),
			plugin_id: PLUGIN_ID,
			pinnedGroups: [database, plotEvents, characters, locations],
			database: database,
			randomizers: [NAME_RANDOMIZER],
			types: [characterType, locationType, sceneType],
		}),
	);
}
