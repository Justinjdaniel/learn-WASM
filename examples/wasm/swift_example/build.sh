#!/bin/bash

echo "Building Swift WASM Example with Carton..."

# Ensure Swift environment is set up (e.g., via swiftenv or toolchain selection)
# This script assumes SwiftWasm compatible Swift (e.g., 5.9.2+) and carton are available.

# Install carton if not available as a global command (often it's run via swift run carton)
# swift package plugin --list can show available plugins.
# For this script, we'll use 'swift run carton'.

# Clean previous builds (optional, but good practice)
# swift run carton clean # 'carton clean' might not be a command,
                         # cleaning build artifacts is usually 'rm -rf .build Bundle'
rm -rf .build
rm -rf Bundle
rm -rf dist   # Clean our custom dist directory

# Bundle the project for release
# This command compiles Swift code to WASM, creates JS bindings, and packages everything.
# It will create a 'Bundle' directory by default.
# We use --custom-index-page to use our own HTML file.
echo "Running carton bundle..."
swift run carton bundle --custom-index-page ./custom_index.html

# Check if Bundle directory was created
if [ ! -d "Bundle" ]; then
    echo "Error: 'Bundle' directory not found. Carton build might have failed."
    exit 1
fi

echo "Carton bundle successful. Output files are in 'Bundle/' directory."
echo "Key files: index.html (our custom one), main.wasm, and JS loader."

# Create a 'dist' directory for consistency with other examples,
# and copy the contents of 'Bundle' into it.
mkdir -p dist
cp -R Bundle/* dist/

echo "Copied all files from 'Bundle/' to 'dist/'."
echo "The example can now be served from the 'dist/' directory or by serving 'examples/wasm/swift_example/dist/index.html'."
echo "Make sure your local server serves from 'examples/wasm/swift_example/' and you access 'dist/index.html',"
echo "or serve directly from 'dist/'."
