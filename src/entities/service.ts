interface ServiceProps {
	iconSrc: string;
	appName: string;
	color: string;
	techStack?: string[];
	storeURL?: string | undefined;
	releaseDate?: Date | undefined;
	isPrivacyPolicyNotPrepared?: boolean;
	heroEn: string;
	descriptionEn: string;
	heroJa: string;
	descriptionJa: string;
}

class Service {
	iconSrc: string;
	appName: string;
	color: string;
	techStack?: string[];
	storeURL?: string | undefined;
	releaseDate?: Date | undefined;
	isPrivacyPolicyNotPrepared?: boolean;
	heroEn: string;
	descriptionEn: string;
	heroJa: string;
	descriptionJa: string;

	constructor({
		iconSrc,
		appName,
		color,
		techStack,
		releaseDate,
		isPrivacyPolicyNotPrepared = false,
		storeURL,
		heroEn,
		descriptionEn,
		heroJa,
		descriptionJa,
	}: ServiceProps) {
		this.iconSrc = iconSrc;
		this.appName = appName;
		this.color = color;
		this.techStack = techStack;
		this.storeURL = storeURL;
		this.releaseDate = releaseDate;
		this.isPrivacyPolicyNotPrepared = isPrivacyPolicyNotPrepared;
		this.heroEn = heroEn;
		this.descriptionEn = descriptionEn;
		this.heroJa = heroJa;
		this.descriptionJa = descriptionJa;
	}
}

export default Service;
