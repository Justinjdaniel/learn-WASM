using System;
using System.Runtime.InteropServices.JavaScript; // Required for JSExport

public static partial class MyLibrary
{
    [JSExport]
    public static string Greet(string name)
    {
        return $"Hello, {name}! This message is from C# running in WASM.";
    }

    [JSExport]
    public static int Add(int a, int b)
    {
        return a + b;
    }

    // A method to demonstrate calling C# from JS which might take a bit longer
    [JSExport]
    public static string ComplexCalculation(string input)
    {
        Console.WriteLine($"C#: Received '{input}' for complex calculation.");
        // Simulate some work
        System.Threading.Thread.Sleep(100); // Note: Synchronous sleep, not ideal in real async scenarios
        return $"C#: Processed '{input}' and the result is: {input.ToUpper()}";
    }
}
