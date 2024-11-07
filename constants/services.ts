import Service from "@/entities/service";
import EcoNotifyIcon from "@/images/eco-notify.png";
import FreeTimesIcon from "@/images/free-times.png";

export const services: Service[] = [
  new Service({
    iconSrc: EcoNotifyIcon.src,
    appName: "Eco Notify",
    hero: "Never forget to take out garbage!",
    description:
      "Never forget to take out the garbage. This app will notify you to do so the garbage at any time you like. The widget also help you to remember the next collection date.",
    releaseDate: new Date(),
  }),
  new Service({
    iconSrc: FreeTimesIcon.src,
    appName: "Free Times",
    hero: "",
    description: "",
    isPrivacyPolicyNotPrepared: true,
  }),
];
