import Ignite

func buildSites() async throws {
	var enSite = EnSite()
	try await enSite.publish(buildDirectoryPath: "Build/en")

	var jaSite = JaSite()
	try await jaSite.publish(buildDirectoryPath: "Build/ja")
}

try await buildSites()
