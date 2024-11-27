import Service from "@/entities/service";
import EcoNotifyIcon from "@/images/eco-notify.png";
import TimeMeetIcon from "@/images/time-meet.png";

export const services: Service[] = [
  new Service({
    iconSrc: EcoNotifyIcon.src,
    appName: "Eco Notify",
    hero: "Never forget to take out garbage!",
    description:
      "Never forget to take out the garbage. This app will notify you to do so the garbage at any time you like. The widget also help you to remember the next collection date.",
    releaseDate: new Date("2024-11-13"),
    storeURL: "https://apps.apple.com/jp/app/eco-notify/id6624308398",
  }),
  new Service({
    iconSrc: TimeMeetIcon.src,
    appName: "Time Meet",
    hero: "",
    description: "",
    releaseDate: new Date("2024-11-30"),
  }),
];
