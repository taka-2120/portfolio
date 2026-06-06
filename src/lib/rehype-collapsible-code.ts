import type { ShikiTransformer } from "shiki";
import type { Root, Element, RootContent } from "hast";

export const collapsibleTransformer: ShikiTransformer = {
	name: "collapsible-code",
	pre(node) {
		const raw = (this.options.meta as Record<string, string>)?.__raw ?? "";
		if (raw.split(/\s+/).includes("collapse")) {
			node.properties["data-collapsible"] = "true";
		}
	},
};

function walk(children: RootContent[]) {
	for (let i = 0; i < children.length; i++) {
		const child = children[i];
		if (child.type !== "element") continue;

		if (
			child.tagName === "figure" &&
			"data-rehype-pretty-code-figure" in (child.properties ?? {})
		) {
			const pre = child.children.find(
				(c): c is Element => c.type === "element" && c.tagName === "pre",
			);
			if (pre?.properties?.["data-collapsible"] === "true") {
				children[i] = {
					type: "element",
					tagName: "details",
					properties: { className: ["code-collapsible"] },
					children: [
						{
							type: "element",
							tagName: "summary",
							properties: { className: ["code-collapsible-summary"] },
							children: [{ type: "text", value: "Show code" }],
						},
						child,
					],
				};
				continue;
			}
		}

		if ("children" in child) {
			walk(child.children);
		}
	}
}

export function rehypeCollapsibleCode() {
	return (tree: Root) => {
		walk(tree.children);
	};
}
