# Getting Started with WebAssembly Development

Welcome! This guide will help you set up your local development environment so you can compile, run, and experiment with the WebAssembly (WASM) examples provided in this repository.

## Prerequisites

To effectively work with WebAssembly and the examples here, you'll need a few essential tools.

1.  **Node.js and npm/yarn:**
    *   **Why:** Node.js is a JavaScript runtime that's crucial for running many WebAssembly build toolchains, development servers, and JavaScript-based examples. `npm` (Node Package Manager) or `yarn` are used to manage project dependencies.
    *   **Installation:** Download and install Node.js from the [official Node.js website](https://nodejs.org/). `npm` is included with Node.js. You can install `yarn` separately if preferred (see yarn documentation).

2.  **Rust Toolchain (for Rust-based WASM examples):**
    *   **Why:** Rust is a popular language for WebAssembly due to its performance, safety features, and excellent tooling.
    *   **Installation:**
        1.  Install `rustup` (which includes `rustc` - the Rust compiler, and `cargo` - the Rust package manager) by following the instructions on the [official Rust installation page](https://www.rust-lang.org/tools/install).
        2.  Once Rust is installed, install `wasm-pack`, a tool for building and packaging Rust crates that target WebAssembly. Follow the [wasm-pack installation guide](https://rustwasm.github.io/wasm-pack/installer/).
            ```bash
            cargo install wasm-pack
            ```

3.  **Emscripten SDK (for C/C++ based WASM examples):**
    *   **Why:** Emscripten is a complete compiler toolchain for C and C++ that allows you to compile your code into WebAssembly. It provides libraries and tools to port existing C/C++ projects to the web.
    *   **Installation:** Follow the instructions on the [official Emscripten SDK installation page](https://emscripten.org/docs/getting_started/downloads.html). Installation typically involves cloning the SDK and running its setup scripts. This can be a more involved setup than other tools.

4.  **Modern Web Browser:**
    *   **Why:** You'll need a web browser to run and test WebAssembly modules that are designed for web environments.
    *   **Examples:** Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge. Ensure your browser is updated to a recent version for the best WASM support and developer tools.

5.  **Text Editor or Integrated Development Environment (IDE):**
    *   **Why:** You'll need a place to view and edit code.
    *   **Examples:** [Visual Studio Code (VS Code)](https://code.visualstudio.com/) (recommended for its excellent support for many languages and WASM-related extensions), Sublime Text, Atom, WebStorm, or any other editor you are comfortable with.

## Repository Setup

To get started with the examples in this repository:

1.  **Clone the Repository:**
    Open your terminal or command prompt and use the following command to clone the repository to your local machine. Replace `<repository_url>` with the actual URL of this repository.
    ```bash
    git clone <repository_url>
    ```
2.  **Navigate to the Repository Directory:**
    Once cloned, change into the repository's main directory:
    ```bash
    cd <repository_directory_name>
    ```
    (The directory name is usually the same as the repository name).

## Building and Running Examples (General Overview)

This repository contains various examples in the `/examples` directory. Each example is self-contained and will have its own `README.md` file with specific, detailed instructions on how to build and run it.

However, the general process will often look like this:

1.  **Navigate to an Example Directory:**
    ```bash
    cd examples/<specific_example_name>
    ```
2.  **Install Dependencies:**
    Many examples, especially those involving JavaScript or toolchains like `wasm-pack`, will require you to install dependencies using `npm` or `yarn`.
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Build the WebAssembly Module:**
    This step compiles your high-level code (e.g., Rust, C++) into a `.wasm` file.
    *   For Rust projects using `wasm-pack`:
        ```bash
        wasm-pack build --target web
        ```
    *   For C/C++ projects using Emscripten, the command might be `make` (if a Makefile is provided) or a direct call to `emcc`.
    *   Some projects might have npm scripts to simplify the build process:
        ```bash
        npm run build
        ```
4.  **Run the Example:**
    This usually involves starting a local development server to serve the HTML, JavaScript, and `.wasm` files.
    ```bash
    npm start
    # or
    # python -m http.server (for simple static hosting)
    ```
    Then, you'll open the provided URL (e.g., `http://localhost:8080`) in your web browser.

**Always refer to the specific `README.md` within each example's directory for precise commands and instructions.**

## Essential Browser Developer Tools for WASM

Modern browser developer tools offer good support for inspecting and debugging WebAssembly.

*   **Viewing WASM Modules:**
    *   In **Chrome DevTools**, open the "Sources" panel. You'll typically find your `.wasm` files listed there, often under a `wasm://` or similar scheme. If source maps are available and configured correctly (or if debugging symbols are included), you might be able to see a representation of your original source code (e.g., Rust or C++) and even set breakpoints. Otherwise, you can view the WebAssembly Text Format (.wat).
    *   **Firefox Developer Tools** offer similar capabilities under the "Debugger" panel.
*   **Console:** The browser's JavaScript console is invaluable for logging messages, observing errors, and debugging the interaction between your JavaScript host code and your WASM modules.
*   **Profiler:** The profiler can help you identify performance bottlenecks, sometimes even within WASM function calls.

Familiarizing yourself with these tools will be very helpful as you explore WebAssembly.

Happy Hacking!
