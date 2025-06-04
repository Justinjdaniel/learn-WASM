const numberInput = document.getElementById('numberInput');
const calculateButton = document.getElementById('calculateButton');
const resultDiv = document.getElementById('result');

// Module is a global variable created by the Emscripten glue code (factorial.js)
// We need to wait for the WASM module to be initialized.
Module.onRuntimeInitialized = function() {
    console.log('WASM Module Initialized');
    calculateButton.disabled = false; // Enable button once WASM is ready

    // Check if factorial function is available
    if (Module._factorial) {
        console.log('Factorial function found in WASM module.');
    } else {
        console.error('Factorial function NOT found. Check EXPORTED_FUNCTIONS in compile script.');
        resultDiv.textContent = 'Error: Factorial function not loaded from WASM.';
        return;
    }
};

calculateButton.disabled = true; // Initially disable button

calculateButton.addEventListener('click', () => {
    const num = parseInt(numberInput.value, 10);
    resultDiv.textContent = ''; // Clear previous result

    if (isNaN(num)) {
        resultDiv.textContent = 'Please enter a valid number.';
        return;
    }
    if (num < 0) {
        resultDiv.textContent = 'Factorial is not defined for negative numbers.';
        return;
    }

    if (Module._factorial) {
        try {
            // Using ccall for simplicity here, cwrap could also be used for a more JavaScript-like function
            const result = Module.ccall(
                'factorial', // C function name
                'number',    // Return type
                ['number'],  // Argument types
                [num]        // Arguments
            );
            resultDiv.textContent = `Factorial(${num}) = ${result}`;
        } catch (e) {
            console.error('Error calling WASM function:', e);
            resultDiv.textContent = 'Error executing WASM function.';
        }
    } else {
        resultDiv.textContent = 'WASM module or factorial function not ready.';
        console.error('Factorial function not available on Module object.');
    }
});

// Fallback if onRuntimeInitialized is not called (e.g. error during WASM loading)
setTimeout(() => {
    if (!Module.calledRun) { // calledRun is true if main() has been called
        if (!Module._factorial) { // Double check if factorial is still not there
             console.error("WASM module failed to load properly.");
             resultDiv.textContent = 'Error: WASM module did not load. Check console for details (e.g., factorial.wasm not found).';
             calculateButton.disabled = true;
        }
    }
}, 2000); // Adjust timeout as needed
