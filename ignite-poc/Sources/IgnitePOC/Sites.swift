import Foundation
import Ignite

struct EnSite: Site {
	var name = "Yu Takahashi's Portfolio"
	var url = URL(static: "https://yu-dev.vercel.app/en")
	var language: Language = .english
	var homePage = HomePage(lang: .en)
	var layout = PortfolioLayout()
}

struct JaSite: Site {
	var name = "Yu Takahashi のポートフォリオ"
	var url = URL(static: "https://yu-dev.vercel.app/ja")
	var language: Language = .japanese
	var homePage = HomePage(lang: .ja)
	var layout = PortfolioLayout()
}
