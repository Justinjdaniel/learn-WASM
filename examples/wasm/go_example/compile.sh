#!/bin/bash

echo "Compiling main.go to main.wasm..."
# GOOS=js GOARCH=wasm are environment variables that tell the Go compiler to build for WebAssembly.
GOOS=js GOARCH=wasm go build -o main.wasm main.go

if [ -f main.wasm ]; then
  echo "Compilation successful: main.wasm created."
  echo "Ensure you have wasm_exec.js from your Go installation in this directory."
  echo "(Typically found at \`\$(go env GOROOT)/misc/wasm/wasm_exec.js\`)"
else
  echo "Compilation failed."
  exit 1
fi
