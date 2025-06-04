use wasm_bindgen::prelude::*;

// This attribute makes the function available to JavaScript.
#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

// Example of a function that could be more complex
#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    format!("Hello, {}! This message is from Rust via WASM.", name)
}
