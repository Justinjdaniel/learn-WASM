// swift-tools-version:5.9
import PackageDescription

let package = Package(
    name: "SwiftWasmExample",
    platforms: [.macOS(.v13)], // Or a version compatible with Swift 5.9
    dependencies: [
        .package(url: "https://github.com/swiftwasm/JavaScriptKit", from: "0.19.0"), // Check for latest compatible version
        .package(url: "https://github.com/swiftwasm/carton", from: "1.0.3") // Or latest version
    ],
    targets: [
        .executableTarget(
            name: "SwiftWasmExampleApp", // Name of the executable product
            dependencies: [
                "JavaScriptKit"
            ],
            path: "Sources/SwiftWasmExampleApp" // Path to the source files
        )
    ]
)
