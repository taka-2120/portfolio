import Service from "@/entities/service";
import EcoNotifyIcon from "@/images/eco-notify.png";
import TimeMeetIcon from "@/images/time-meet.png";

export const services: Service[] = [
  new Service({
    iconSrc: EcoNotifyIcon.src,
    appName: "Eco Notify",
    color: "#40826e",
    techStack: ["SwiftUI", "SwiftData", "WidgetKit", "Xcode Cloud"],
    storeURL: "https://apps.apple.com/app/eco-notify/id6624308398",
    releaseDate: new Date("2024-11-13"),
    heroEn: "Never forget to take out garbage!",
    descriptionEn:
      "Manage your garbage collection days wisely! Get notified when you want and use the widget to see when the next collection day is!",
    heroJa: "もうごみ出しは忘れない。",
    descriptionJa:
      "ごみ収集の日を賢く管理しましょう! お好きなタイミングで通知したり、ウィジェットで次の収集日を確認したりできます!",
  }),
  new Service({
    iconSrc: TimeMeetIcon.src,
    appName: "Time Meet",
    color: "#40826e",
    techStack: ["SwiftUI", "SwiftData", "Xcode Cloud"],
    heroEn: "",
    descriptionEn: "",
    heroJa: "",
    descriptionJa: "",
    releaseDate: new Date("2024-11-30"),
  }),
  new Service({
    iconSrc: TimeMeetIcon.src,
    appName: "Beans Life",
    color: "#40826e",
    techStack: ["SwiftUI", "SwiftData", "Xcode Cloud"],
    heroEn: "",
    descriptionEn: "",
    heroJa: "",
    descriptionJa: "",
    releaseDate: new Date("2024-11-30"),
  }),
  new Service({
    iconSrc: TimeMeetIcon.src,
    appName: "Wash Tracker",
    color: "#40826e",
    techStack: ["SwiftUI", "SwiftData", "WidgetKit", "Xcode Cloud"],
    heroEn: "",
    descriptionEn: "",
    heroJa: "",
    descriptionJa: "",
    releaseDate: new Date("2024-11-30"),
  }),
];
