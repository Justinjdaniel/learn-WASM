#!/bin/bash
# Ensure Emscripten SDK is installed and configured in your environment.
# You might need to source emsdk_env.sh if it's not already in your PATH.
# Example: source /path/to/emsdk/emsdk_env.sh

echo "Compiling factorial.c to factorial.wasm..."
emcc factorial.c -o factorial.wasm -s WASM=1 -s EXPORTED_FUNCTIONS="['_factorial']" -s EXTRA_EXPORTED_RUNTIME_METHODS="['ccall', 'cwrap']" -O3

if [ -f factorial.wasm ]; then
  echo "Compilation successful: factorial.wasm created."
  echo "Also created factorial.js (Emscripten glue code)."
else
  echo "Compilation failed."
  exit 1
fi
