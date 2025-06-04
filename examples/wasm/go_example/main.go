package main

import (
    "fmt"
    "syscall/js"
)

// Function to concatenate two strings
func concatStrings(this js.Value, args []js.Value) interface{} {
    if len(args) != 2 {
        return "Error: Expected 2 string arguments"
    }
    s1 := args[0].String()
    s2 := args[1].String()
    return s1 + s2
}

// Function to add two numbers
func addNumbers(this js.Value, args []js.Value) interface{} {
    if len(args) != 2 {
        return js.ValueOf("Error: Expected 2 number arguments")
    }
    n1 := args[0].Float()
    n2 := args[1].Float()
    return js.ValueOf(n1 + n2)
}

func registerCallbacks() {
    js.Global().Set("goConcatStrings", js.FuncOf(concatStrings))
    js.Global().Set("goAddNumbers", js.FuncOf(addNumbers))
    fmt.Println("Go WASM functions registered. Call goConcatStrings(s1, s2) or goAddNumbers(n1, n2) from JavaScript.")
}

func main() {
    // Need a channel to keep the Go program alive. Otherwise, it will exit immediately.
    c := make(chan struct{}, 0)
    fmt.Println("Go WebAssembly Initialized")
    registerCallbacks()
    <-c // Block main from exiting
}
