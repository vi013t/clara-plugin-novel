import { NameRandomizer } from "../randomizers/name_randomizer.ts";
import { AttributeDefinition } from "@clara/api/attribute";
import { Group } from "@clara/api/database";
import { registerTemplate } from "@clara/api/plugin";
import { Template } from "@clara/api/project";
import { TabList } from "@clara/api/ui";

export function registerHerosJourneyTemplate() {
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
			name: "Ordinary World",
			description: "The initial backstory and catch-up of the story.",
			icon: "Earth",
			attributes: [AttributeDefinition.basic("Name", "shortText")],
		}),
		new Group({
			name: "Call to Adventure",
			description: "The tension-building and stakes-building events leading up to the climax.",
			icon: "Phone",
			attributes: [AttributeDefinition.basic("Name", "shortText")],
		}),
		new Group({
			name: "Refusal of the Call",
			description: "The main payoff of the story.",
			icon: "PhoneMissed",
			attributes: [AttributeDefinition.basic("Name", "shortText")],
		}),
		new Group({
			name: "Meeting the Mentor",
			description: "The decrease in tension and stakes after the climax.",
			icon: "Brain",
			attributes: [AttributeDefinition.basic("Name", "shortText")],
		}),
		new Group({
			name: "Crossing the First Threshold",
			description: "The finishing beats.",
			icon: "Sword",
			attributes: [AttributeDefinition.basic("Name", "shortText")],
		}),
		new Group({
			name: "Tests, Allies, Enemies",
			description: "The finishing beats.",
			icon: "BowArrow",
			attributes: [AttributeDefinition.basic("Name", "shortText")],
		}),
		new Group({
			name: "Innermost Cave",
			description: "The finishing beats.",
			icon: "Moon",
			attributes: [AttributeDefinition.basic("Name", "shortText")],
		}),
		new Group({
			name: "Ordeal",
			description: "The finishing beats.",
			icon: "Swords",
			attributes: [AttributeDefinition.basic("Name", "shortText")],
		}),
		new Group({
			name: "Reward",
			description: "The finishing beats.",
			icon: "Award",
			attributes: [AttributeDefinition.basic("Name", "shortText")],
		}),
		new Group({
			name: "The Road Back",
			description: "The finishing beats.",
			icon: "CornerDownLeft",
			attributes: [AttributeDefinition.basic("Name", "shortText")],
		}),
		new Group({
			name: "Resurrection",
			description: "The finishing beats.",
			icon: "Flame",
			attributes: [AttributeDefinition.basic("Name", "shortText")],
		}),
		new Group({
			name: "Return with the Elixir",
			description: "The finishing beats.",
			icon: "HouseHeart",
			attributes: [AttributeDefinition.basic("Name", "shortText")],
		}),
	);

	const database = new Group(
		{
			name: "Hero's Journey",
			icon: "Sword",
			description: "A novel template using the hero's journey framework.",
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
