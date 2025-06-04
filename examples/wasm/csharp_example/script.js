// script.js - Using ES6 module syntax
import { dotnet } from './dist/dotnet.js'; // Assuming dotnet.js is copied to dist by build.sh

const statusDiv = document.getElementById('status');
const greetButton = document.getElementById('greetButton');
const addButton = document.getElementById('addButton');
const complexButton = document.getElementById('complexButton');

const nameInput = document.getElementById('nameInput');
const resultGreetDiv = document.getElementById('resultGreet');

const numAInput = document.getElementById('numA');
const numBInput = document.getElementById('numB');
const resultAddDiv = document.getElementById('resultAdd');

const complexInput = document.getElementById('complexInput');
const resultComplexDiv = document.getElementById('resultComplex');

async function main() {
    try {
        statusDiv.textContent = 'Initializing .NET WASM runtime...';
        const { getAssemblyExports, getConfig } = await dotnet
            .withDiagnosticTracing(false) // Disable noisy diagnostic tracing if not needed
            .create();

        statusDiv.textContent = '.NET WASM Runtime loading configuration...';
        const config = getConfig();
        const exports = await getAssemblyExports(config.mainAssemblyName); // mainAssemblyName from project properties

        statusDiv.textContent = '.NET WASM Runtime Initialized. C# functions ready.';
        console.log('.NET WASM Runtime Initialized.');
        console.log('Assembly Exports:', exports); // Log to see what C# methods are available

        // Enable buttons
        greetButton.disabled = false;
        addButton.disabled = false;
        complexButton.disabled = false;

        // --- Greet ---
        greetButton.addEventListener('click', () => {
            const name = nameInput.value;
            try {
                // Access exported C# static methods via exports.Namespace.Class.Method
                // Our C# class MyLibrary doesn't have a namespace, so it's directly on exports.
                // If MyLibrary was in namespace "MyNamespace", it would be exports.MyNamespace.MyLibrary.Greet
                const greeting = exports.MyLibrary.Greet(name);
                resultGreetDiv.textContent = greeting;
            } catch (e) {
                console.error("Error calling Greet:", e);
                resultGreetDiv.textContent = `Error: ${e.message}`;
            }
        });

        // --- Add ---
        addButton.addEventListener('click', () => {
            const a = parseInt(numAInput.value, 10);
            const b = parseInt(numBInput.value, 10);
            if (isNaN(a) || isNaN(b)) {
                resultAddDiv.textContent = 'Please enter valid numbers.';
                return;
            }
            try {
                const sum = exports.MyLibrary.Add(a, b);
                resultAddDiv.textContent = `Sum: ${a} + ${b} = ${sum}`;
            } catch (e) {
                console.error("Error calling Add:", e);
                resultAddDiv.textContent = `Error: ${e.message}`;
            }
        });

        // --- Complex Calculation ---
        complexButton.addEventListener('click', async () => {
            const input = complexInput.value;
            resultComplexDiv.textContent = 'Processing...';
            try {
                // JSExported methods can be async if they return Task/Task<T> in C#
                // If they are synchronous in C# but might take time,
                // it's good practice to call them such that the UI doesn't freeze.
                // For this example, MyLibrary.ComplexCalculation is synchronous in C#.
                // The .NET runtime handles the call.
                const result = await exports.MyLibrary.ComplexCalculation(input);
                resultComplexDiv.textContent = result;
            } catch (e) {
                console.error("Error calling ComplexCalculation:", e);
                resultComplexDiv.textContent = `Error: ${e.message}`;
            }
        });

    } catch (err) {
        console.error('Error initializing .NET WASM:', err);
        statusDiv.textContent = `Error: Failed to load .NET WASM - ${err.message}. See console for details.`;
    }
}

main();
