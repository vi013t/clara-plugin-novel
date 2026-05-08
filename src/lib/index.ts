import { plugin } from "@clara/api/plugin";
import { registerThreeActStructureTemplate } from "./frameworks/three_act.ts";
import { registerStoryMountainTemplate } from "./frameworks/story_mountain.ts";
import { registerHerosJourneyTemplate } from "./frameworks/heros_journey.ts";
import { registerBasicNovelTemplate } from "./frameworks/basic.ts";

export const PLUGIN_ID = "novel" as const;

export default plugin({
	name: "Novel",
	description: "Novel writing framework for Clara.",
	icon: "Book",
	identifier: PLUGIN_ID,

	onLoad() {
		registerBasicNovelTemplate();
		registerThreeActStructureTemplate();
		registerStoryMountainTemplate();
		registerHerosJourneyTemplate();
	},
});
