interface ExperienceProps {
	nameEn: string;
	roleEn: string;
	nameJa: string;
	roleJa: string;
	start: Date;
	end?: Date | null;
}

class Experience {
	nameEn: string;
	roleEn: string;
	nameJa: string;
	roleJa: string;
	start: Date;
	end: Date | null;

	constructor({
		nameEn,
		roleEn,
		nameJa,
		roleJa,
		start,
		end = null,
	}: ExperienceProps) {
		this.nameEn = nameEn;
		this.roleEn = roleEn;
		this.nameJa = nameJa;
		this.roleJa = roleJa;

		this.start = start;
		this.end = end;
	}
}

export default Experience;
