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
		color: "#b182ba",
		techStack: ["SwiftUI", "SwiftData", "Xcode Cloud"],
    storeURL: "https://apps.apple.com/app/time-meet/id6738675899",
		releaseDate: new Date("2025-01-12"),
		heroEn: "Smart Meeting Adjustment",
		descriptionEn: "Are you tired to adjust meeting times? This app will find your blank time slots in your Calendar app, and share it! Of course, you don't worry about time difference!",
		heroJa: "時間調整をスマートに",
		descriptionJa: "ミーティングの時間調整、面倒ではありませんか？カレンダーアプリから空き時間を探して、テキストで共有できます！もちろん、時差があっても大丈夫です！",
	}),
	new Service({
		iconSrc: TimeMeetIcon.src,
		appName: "Wash Tracker",
		color: "#2dabe6",
		techStack: ["SwiftUI", "SwiftData", "WidgetKit", "Xcode Cloud"],
		heroEn: "",
		descriptionEn: "",
		heroJa: "",
		descriptionJa: "",
	}),
	new Service({
		iconSrc: TimeMeetIcon.src,
		appName: "Beans Life",
		color: "#99bd5d",
		techStack: ["SwiftUI", "SwiftData", "Xcode Cloud"],
		heroEn: "",
		descriptionEn: "",
		heroJa: "",
		descriptionJa: "",
	}),
];
