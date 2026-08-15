import Ignite

struct PortfolioLayout: Layout {
	var body: some Document {
		Body {
			Section {
				Link("Yu Takahashi", target: "/")
					.font(.title6)
				Spacer()
				Link("Projects", target: "/services")
				Link("Experience", target: "/experiences")
			}
			.class("portfolio-header")

			content

			Section {
				Text("© 2026 Yu Takahashi")
					.font(.small)
			}
			.class("portfolio-footer")
		}
	}
}
