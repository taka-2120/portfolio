declare module "*.css" {
	const content: { [className: string]: string };
	export default content;
}

declare module "nextra-theme-docs/style.css";
