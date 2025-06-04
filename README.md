# Modern WebAssembly Learning Repository

Welcome! This repository is designed to be a top-tier, modern resource for learning WebAssembly (WASM) in 2025. Our goal is to provide clear explanations, practical examples, and up-to-date information to help you master WASM.

For detailed documentation, please see the [docs](./docs) directory.

This repository is organized into the following main directories:
*   `/docs`: Contains detailed documentation, guides, and conceptual explanations.
*   `/src`: Will house core library code or reusable modules (currently planned).
*   `/examples`: Provides practical, hands-on examples of WebAssembly in action.
    *   **FFmpeg GIF Maker**: A TypeScript example demonstrating video to GIF conversion using FFmpeg.wasm. (See `examples/ffmpeg/gif_maker/ts`)
    *   **C to WASM (Factorial)**: A simple example showing how to compile a C function (factorial) to WASM using Emscripten and call it from JavaScript. [Details here](./examples/wasm/c_example/README.md).
    *   **Rust to WASM (Add & Greet)**: A basic example demonstrating how to compile Rust functions to WASM using `wasm-pack` and `wasm-bindgen`, then call them from JavaScript. [Details here](./examples/wasm/rust_example/README.md).
    *   **Go to WASM (Concat & Add)**: A basic example demonstrating how to compile Go functions to WASM using standard Go tooling (`GOOS=js GOARCH=wasm`) and call them from JavaScript. [Details here](./examples/wasm/go_example/README.md).
    *   **C# to WASM (Greet, Add & Complex Calc)**: A basic example demonstrating how to compile C# methods to WASM using the .NET SDK (`browser-wasm` target) and call them from JavaScript. [Details here](./examples/wasm/csharp_example/README.md).
    *   **Swift to WASM (Greet & Add)**: A basic example demonstrating how to compile Swift functions to WASM using SwiftWasm (`carton` build tool) and `JavaScriptKit` for interop. [Details here](./examples/wasm/swift_example/README.md).
*   `/tests`: Will include tests for any code developed in `/src` or `/examples`.
*   `/build`: Will be used for build artifacts and outputs.
*   `/scripts`: Contains utility scripts for building, testing, or managing the repository.
