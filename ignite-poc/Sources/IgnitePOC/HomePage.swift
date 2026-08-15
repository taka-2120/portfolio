import Ignite

enum PortfolioLanguage {
	case en, ja

	var greeting: String {
		switch self {
		case .en: "Software engineer focused on iOS and Web development."
		case .ja: "iOS・Web を中心に開発するソフトウェアエンジニアです。"
		}
	}
}

struct HomePage: StaticPage {
	var lang: PortfolioLanguage
	var title = "Yu Takahashi"

	var body: some HTML {
		Text("Yu Takahashi")
			.font(.title1)

		Text(lang.greeting)
			.foregroundStyle(.secondary)

		Text(markdown: "Validating **Markdown rendering** and inline `code` in Ignite.")

		CodeBlock(.swift) {
			"""
			struct ContentView: View {
			    var body: some View {
			        Text("Hello, Swift!")
			    }
			}
			"""
		}
	}
}
