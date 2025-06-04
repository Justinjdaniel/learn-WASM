# Go (Golang) to WASM Example: Concatenate Strings & Add Numbers

This example demonstrates how to compile Go functions to WebAssembly (WASM) and call them from JavaScript in a web browser. The Go program exposes two functions:
- `goConcatStrings(s1, s2 string) string`: Concatenates two strings.
- `goAddNumbers(n1, n2 float64) float64`: Adds two floating-point numbers.

These functions are made available on the JavaScript global scope.

## Files

- `main.go`: Contains the Go source code. It defines the `concatStrings` and `addNumbers` functions and uses `syscall/js` to register them as JavaScript global functions. The `main` function keeps the Go program running.
- `compile.sh`: A shell script to compile `main.go` into `main.wasm` using the Go compiler with `GOOS=js` and `GOARCH=wasm` environment variables.
- `index.html`: The main HTML page that loads the WASM module and provides a simple UI to interact with the Go functions.
- `script.js`: JavaScript code that:
    - Initializes the Go WASM environment using `wasm_exec.js`.
    - Fetches, instantiates, and runs the `main.wasm` module.
    - Calls the global functions exposed by the Go program (`goConcatStrings`, `goAddNumbers`).
- `wasm_exec.js`: **Required.** This JavaScript support file is provided by the Go installation. It contains the necessary glue code to run Go-compiled WASM modules in the browser. You must copy this file into this directory.
- `main.wasm` (Generated): The compiled WebAssembly module.

## Prerequisites

1.  **Go Toolchain**: Install Go (if you haven't already) from [golang.org/dl](https://golang.org/dl/). Version 1.11 or later is needed for WebAssembly support.

## How to Get `wasm_exec.js`

The `wasm_exec.js` file is crucial for running Go WebAssembly programs. You need to copy it from your Go installation's `misc/wasm` directory into this example's directory (`examples/wasm/go_example/`).

On a Unix-like system, you can typically find it and copy it using a command like:

```bash
cp "$(go env GOROOT)/misc/wasm/wasm_exec.js" .
```
Execute this command while you are in the `examples/wasm/go_example/` directory.

## How to Build

1.  Ensure you have `wasm_exec.js` in the current directory (`examples/wasm/go_example/`) as described above.
2.  Navigate to the Go example directory:
    ```bash
    cd examples/wasm/go_example
    ```
3.  Make the compile script executable (if it isn't already):
    ```bash
    chmod +x compile.sh
    ```
4.  Run the compilation script:
    ```bash
    ./compile.sh
    ```
    This will generate `main.wasm`. If successful, you'll see a confirmation message.

## How to Run

1.  After successfully building the WASM module (`main.wasm` is present) and ensuring `wasm_exec.js` is also present, you need to serve the files using a local web server. Browsers typically restrict loading WASM files directly from the local file system due to security policies.

2.  A simple way to start a web server (if you have Python 3) from the `examples/wasm/go_example/` directory is:
    ```bash
    python -m http.server
    ```
    Or for Python 2:
    ```bash
    python -m SimpleHTTPServer
    ```
    This will usually serve files from the current directory at `http://localhost:8000`.

3.  Open your web browser and navigate to `http://localhost:8000/index.html` (or the appropriate URL if your server uses a different port).

4.  You should see input fields and buttons for both functions. Interact with them to see the results computed by the Go WASM module. The browser's developer console will also show messages from the Go program (e.g., "Go WebAssembly Initialized").

## Notes

- The `syscall/js` package in `main.go` is essential for interacting with JavaScript (defining functions, getting/setting global variables).
- The Go `main()` function uses an empty channel `<-c` to prevent the program from exiting, which is necessary for keeping the WASM module alive and responsive to JavaScript calls.
- `GOOS=js` and `GOARCH=wasm` are environment variables that instruct the Go compiler to target WebAssembly.
- The `script.js` uses `new Go()` and `go.importObject` (from `wasm_exec.js`) to set up the Go WASM environment. `go.run()` starts the execution of the WASM module.
- Functions exposed from Go are attached to the JavaScript `globalThis` (which is `window` in browsers).
