interface LinkProps {
	name: string;
	url: string;
	color?: string | null;
	icon: React.ReactNode;
}

class Link {
	name: string;
	url: string;
	color?: string | null;
	icon: React.ReactNode;

	constructor({ name, url, color, icon }: LinkProps) {
		this.name = name;
		this.url = url;
		this.color = color;
		this.icon = icon;
	}
}

export default Link;
