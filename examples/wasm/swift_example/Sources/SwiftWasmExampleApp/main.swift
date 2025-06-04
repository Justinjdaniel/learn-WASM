import JavaScriptKit

// --- Swift functions to be exported ---
func greet(name: String) -> String {
    return "Hello, \(name)! This is Swift running in WASM."
}

func add(a: Int, b: Int) -> Int {
    return a + b
}

// --- Exporting functions to JavaScript ---
// Get a reference to the JavaScript global object (window in browser)
let global = JSObject.global

// Create a JavaScript object to hold our exported functions
let swiftExports = JSObject.object() // Equivalent to {} in JS

// Wrap the Swift 'greet' function
let jsGreet = JSClosure { args -> JSValue in
    guard args.count == 1, let name = args[0].string else {
        return .string("Error: greet function expects one string argument.")
    }
    let result = greet(name: name)
    return .string(result)
}
swiftExports.greet = jsGreet.jsValue // Assign the JSClosure's JSValue

// Wrap the Swift 'add' function
let jsAdd = JSClosure { args -> JSValue in
    guard args.count == 2, let numA = args[0].number, let numB = args[1].number else {
        return .string("Error: add function expects two number arguments.")
    }
    // JavaScript numbers are doubles, cast to Int for Swift function
    let result = add(a: Int(numA), b: Int(numB))
    return .number(Double(result)) // Return as JS number (Double)
}
swiftExports.add = jsAdd.jsValue

// Assign the 'swiftExports' object to the global JavaScript scope
global.swiftExports = swiftExports

// Keep the program alive (important for WASM modules that provide functions)
// For a carton app, this might not be strictly necessary if carton manages the lifecycle,
// but it's good practice for WASI or other general WASM modules.
// However, for a browser app primarily driven by JS calls, this main might just set up exports and finish.
// Carton's entry point generation might handle the main loop.
// For now, let's assume carton handles the "keeping alive" part if needed for browser.
print("Swift WASM module initialized and functions exported to JavaScript under 'window.swiftExports'.")

// To prevent the program from exiting immediately if not running under carton's dev server
// or if there's no other mechanism keeping it alive.
// This is often not needed when using carton as it sets up an environment.
// For this example, simply setting up the exports and printing is enough for main.swift.
// If this were a long-running Swift app, you might need `RunLoop.main.run()`.
