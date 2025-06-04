// DOM Elements
const numAInput = document.getElementById('numA');
const numBInput = document.getElementById('numB');
const addButton = document.getElementById('addButton');
const resultAddDiv = document.getElementById('resultAdd');

const nameInput = document.getElementById('nameInput');
const greetButton = document.getElementById('greetButton');
const resultGreetDiv = document.getElementById('resultGreet');

async function runWasm() {
    try {
        // Import the functions from the WASM module.
        // wasm-pack generates a .js file (e.g., rust_wasm_example.js) in the 'pkg' directory
        // that exports an init function and the bindgen functions.
        // The name 'rust_wasm_example' comes from Cargo.toml's [package].name
        const { add, greet, default: init } = await import('./pkg/rust_wasm_example.js');

        // Initialize the WASM module. This is required by wasm-bindgen.
        await init();
        console.log("WASM Module Initialized (Rust)");

        // Enable buttons now that WASM is ready
        addButton.disabled = false;
        greetButton.disabled = false;

        // Add event listener for the 'add' button
        addButton.addEventListener('click', () => {
            const a = parseInt(numAInput.value, 10);
            const b = parseInt(numBInput.value, 10);

            if (isNaN(a) || isNaN(b)) {
                resultAddDiv.textContent = 'Please enter valid numbers for addition.';
                return;
            }
            const sum = add(a, b);
            resultAddDiv.textContent = `Result of ${a} + ${b} = ${sum}`;
        });

        // Add event listener for the 'greet' button
        greetButton.addEventListener('click', () => {
            const name = nameInput.value;
            if (!name.trim()) {
                resultGreetDiv.textContent = 'Please enter a name.';
                return;
            }
            const greeting = greet(name);
            resultGreetDiv.textContent = greeting;
        });

    } catch (error) {
        console.error("Error loading or running WASM module (Rust):", error);
        resultAddDiv.textContent = "Failed to load WASM module. Check console.";
        resultGreetDiv.textContent = "Failed to load WASM module. Check console.";
        addButton.disabled = true;
        greetButton.disabled = true;
    }
}

// Disable buttons initially
addButton.disabled = true;
greetButton.disabled = true;

runWasm();
