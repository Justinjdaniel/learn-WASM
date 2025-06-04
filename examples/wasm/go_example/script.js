// DOM Elements
const str1Input = document.getElementById('str1');
const str2Input = document.getElementById('str2');
const concatButton = document.getElementById('concatButton');
const resultConcatDiv = document.getElementById('resultConcat');

const numAInput = document.getElementById('numA');
const numBInput = document.getElementById('numB');
const addButton = document.getElementById('addButton');
const resultAddDiv = document.getElementById('resultAdd');

// Disable buttons initially
concatButton.disabled = true;
addButton.disabled = true;

if (!WebAssembly.instantiateStreaming) { // Older browsers (e.g., Edge legacy)
    WebAssembly.instantiateStreaming = async (resp, importObject) => {
        const source = await (await resp).arrayBuffer();
        return await WebAssembly.instantiate(source, importObject);
    };
}

async function runGoWasm() {
    try {
        const go = new Go(); // Go specific: Instantiate the Go support object

        const wasmModule = await WebAssembly.instantiateStreaming(
            fetch("main.wasm"), // Path to your wasm file
            go.importObject    // Go specific: The import object from the Go support object
        );

        // Go specific: Run the WASM instance
        // This promise resolves after the Go program calls syscall.Exit(0)
        // Our Go program in main.go doesn't exit, so this will run indefinitely.
        // We run it in the background and don't await it here.
        go.run(wasmModule.instance);
        console.log("Go WASM Initialized and running. Check Go program's fmt.Println messages.");

        // Functions are registered on the global scope by the Go program
        // Wait a brief moment for Go's fmt.Println and function registration to occur
        setTimeout(() => {
            if (typeof goConcatStrings === 'function' && typeof goAddNumbers === 'function') {
                console.log("Go functions (goConcatStrings, goAddNumbers) are available globally.");
                concatButton.disabled = false;
                addButton.disabled = false;
            } else {
                console.error("Go functions not found on global scope. Check Go program registration.");
                resultConcatDiv.textContent = "Error: Go functions not loaded.";
                resultAddDiv.textContent = "Error: Go functions not loaded.";
            }
        }, 100); // Adjust timeout if needed, for Go program to print and register

    } catch (error) {
        console.error("Error loading or running Go WASM module:", error);
        resultConcatDiv.textContent = "Failed to load Go WASM module. Check console.";
        resultAddDiv.textContent = "Failed to load Go WASM module. Check console.";
    }
}

concatButton.addEventListener('click', () => {
    const s1 = str1Input.value;
    const s2 = str2Input.value;
    if (typeof goConcatStrings === 'function') {
        const result = goConcatStrings(s1, s2);
        resultConcatDiv.textContent = `Concatenated: "${result}"`;
    } else {
        resultConcatDiv.textContent = 'Error: goConcatStrings function not available.';
    }
});

addButton.addEventListener('click', () => {
    const a = parseFloat(numAInput.value);
    const b = parseFloat(numBInput.value);

    if (isNaN(a) || isNaN(b)) {
        resultAddDiv.textContent = 'Please enter valid numbers for addition.';
        return;
    }
    if (typeof goAddNumbers === 'function') {
        const sum = goAddNumbers(a, b);
        resultAddDiv.textContent = `Sum: ${a} + ${b} = ${sum}`;
    } else {
        resultAddDiv.textContent = 'Error: goAddNumbers function not available.';
    }
});

runGoWasm();
