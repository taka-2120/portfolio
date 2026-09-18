// swift-tools-version:6.0
import PackageDescription

let package = Package(
	name: "IgnitePOC",
	platforms: [.macOS(.v13)],
	dependencies: [
		.package(url: "https://github.com/twostraws/Ignite", from: "0.6.9")
	],
	targets: [
		.executableTarget(
			name: "IgnitePOC",
			dependencies: [.product(name: "Ignite", package: "Ignite")]
		)
	]
)
