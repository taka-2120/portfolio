interface ServiceProps {
  iconSrc: string;
  appName: string;
  hero: string;
  description: string;
  storeURL?: string | undefined;
  releaseDate?: Date | undefined;
  isPrivacyPolicyNotPrepared?: boolean;
}

class Service {
  iconSrc: string;
  appName: string;
  hero: string;
  description: string;
  storeURL?: string | undefined;
  releaseDate?: Date | undefined;
  isPrivacyPolicyNotPrepared?: boolean;

  constructor({
    iconSrc,
    appName,
    hero,
    description,
    storeURL,
    releaseDate,
    isPrivacyPolicyNotPrepared = false,
  }: ServiceProps) {
    this.iconSrc = iconSrc;
    this.appName = appName;
    this.hero = hero;
    this.description = description;
    this.storeURL = storeURL;
    this.releaseDate = releaseDate;
    this.isPrivacyPolicyNotPrepared = isPrivacyPolicyNotPrepared;
  }
}

export default Service;
