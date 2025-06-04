#!/bin/bash

echo "Building C# WASM Library..."

# Navigate to the C# project directory
cd CSharpWasmLib

# Clean previous builds (optional, but good practice)
dotnet clean
# Ensure the rm -rf command targets the correct .NET version used (net8.0 here)
rm -rf bin/Release/net8.0/browser-wasm/AppBundle

# Publish the project for browser-wasm
# This compiles the C# code to WASM and prepares necessary files in AppBundle
echo "Publishing for browser-wasm..."
dotnet publish -c Release -r browser-wasm

# Define output directory based on .NET 8.0
OUTPUT_DIR="./bin/Release/net8.0/browser-wasm/AppBundle"

if [ ! -d "$OUTPUT_DIR" ]; then
  echo "Error: AppBundle directory not found at $OUTPUT_DIR."
  echo "This is the expected output location for .NET 8.0 with browser-wasm."
  echo "Build failed or output directory structure is unexpected."
  exit 1
fi

echo "Build successful. Output files should be in $OUTPUT_DIR"
echo "Key files: dotnet.js, dotnet.wasm, and your app's DLLs (e.g., CSharpWasmLib.dll)."

# Go back to the example root
cd ..

echo "To make it easier to run, copying necessary files from AppBundle to a local 'dist' directory..."
# Create a 'dist' directory in 'csharp_example' to place runnable files
mkdir -p dist
# Copy all files from AppBundle to dist. This includes dotnet.js, dotnet.wasm, CSharpWasmLib.dll, etc.
cp CSharpWasmLib/bin/Release/net8.0/browser-wasm/AppBundle/*.* dist/
echo "Copied runtime files and CSharpWasmLib.dll to 'dist/' directory."
echo "Your index.html should be able to reference files from the 'dist' directory (e.g., './dist/dotnet.js')."
