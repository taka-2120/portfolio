import Service from "@/entities/service";
import BeansLifeIcon from "@/images/beans-life.png";
import EcoNotifyIcon from "@/images/eco-notify.png";
import TimeMeetIcon from "@/images/time-meet.png";
import WashTrackerIcon from "@/images/wash-tracker.png";

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
		descriptionEn:
			"Are you tired to adjust meeting times? This app will find your blank time slots in your Calendar app, and share it! Of course, you don't worry about time difference!",
		heroJa: "時間調整をスマートに",
		descriptionJa:
			"ミーティングの時間調整、面倒ではありませんか？カレンダーアプリから空き時間を探して、テキストで共有できます！もちろん、時差があっても大丈夫です！",
	}),
	new Service({
		iconSrc: WashTrackerIcon.src,
		appName: "Wash Tracker",
		color: "#2dabe6",
		techStack: ["SwiftUI", "SwiftData", "WidgetKit", "Xcode Cloud"],
		heroEn: "Keep your clothes clean!",
		descriptionEn:
			"Keep your clothes clean! Oh, that cloth wasn't washed for few days? Don't do this again! You can record last washed date for your each cloth. Using the timer feature, you can receive a notification after finishing laundry!",
		heroJa: "汚い服はすぐ洗う!",
		descriptionJa:
			"汚い服はすぐ洗おう! そういえばあの服、数日間洗ってない…? こんなことを無くすために、それぞれの洗濯物を最後に新った日を記録しておきましょう! タイマー機能を使えば、洗濯が終わったタイミングでお知らせします!",
	}),
	new Service({
		iconSrc: BeansLifeIcon.src,
		appName: "Beans Life",
		color: "#99bd5d",
		techStack: ["SwiftUI", "SwiftData", "WidgetKit", "Xcode Cloud"],
		heroEn: "Log your favorite coffee beans!",
		descriptionEn:
			"Log your favorite coffee beans! You can log your favorite coffee beans and its flavor, best by, price, or package image. Do you want to care about the amount of caffeines? Of course! You can log it in this app or in widget directly from your home screen.",
		heroJa: "好きなコーヒー豆を記録しよう!",
		descriptionJa:
			"それぞれのお豆のフレーバーや賞味期限、値段、写真アプリのどこかに行ってしまいがちなパッケージ画像を記録できます。カフェインの摂取量が気になる…? そんな要望にも応えて、アプリからでもホーム画面のウィジェットからでも、コーヒーを飲んだ瞬間に摂取量を記録できます!",
	}),
];
