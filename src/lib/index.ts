import { AttributeDefinition } from "@clara/api/attribute";
import { Group, Item } from "@clara/api/database";
import { plugin } from "@clara/api/plugin";
import { Template } from "@clara/api/project";
import { TabList } from "@clara/api/ui";
import { userSettings } from "@clara/api/usersettings";

export default plugin({
	name: "Novel",
	description: "Novel writing framework in Clara.",
	icon: "Book",
	identifier: "novel",
	onLoad() {
		registerBasicNovelTemplate();
		registerThreeActStructureTemplate();
		registerStoryMountainTemplate();
	},
});

function registerThreeActStructureTemplate() {
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

	userSettings().addTemplate(
		new Template({
			layout: { split: "none", tabline: new TabList([]), selectedTabID: 0 },
			pinnedGroups: [database, plotEvents, characters, locations],
			database: database,
		}),
	);
}

function registerBasicNovelTemplate() {
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

	userSettings().addTemplate(
		new Template({
			layout: { split: "none", tabline: new TabList([]), selectedTabID: 0 },
			pinnedGroups: [database, plotEvents, characters, locations],
			database: database,
		}),
	);
}

function registerStoryMountainTemplate() {
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

	userSettings().addTemplate(
		new Template({
			layout: { split: "none", tabline: new TabList([]), selectedTabID: 0 },
			pinnedGroups: [database, plotEvents, characters, locations],
			database: database,
		}),
	);
}
