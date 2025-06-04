# Simple GIF Maker (React, TypeScript, FFmpeg.wasm)

This example demonstrates how to use FFmpeg.wasm (specifically `@ffmpeg/ffmpeg` and `@ffmpeg/core`) within a React application built with TypeScript to create GIFs from video files directly in the browser. Users can upload a video, and the application uses FFmpeg compiled to WebAssembly to convert a segment of it into a GIF.

## Project Status & Dependencies

*   **Status:** This example has been updated to use modern versions of its core dependencies as of early 2025.
*   **Key Dependencies:**
    *   React: `^19.1.0`
    *   React DOM: `^19.1.0`
    *   React Scripts: `^5.0.1` (for building and development server)
    *   TypeScript: `^4.9.5`
    *   FFmpeg.wasm:
        *   `@ffmpeg/ffmpeg`: `^0.12.15`
        *   `@ffmpeg/core`: `^0.12.10`

## Setup and Usage Instructions

1.  **Navigate to the example directory:**
    ```bash
    cd examples/ffmpeg/gif_maker/ts
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    This will start the application locally, typically on `http://localhost:3000`.
    ```bash
    npm start
    ```

4.  **Build for production:**
    This will create an optimized build in the `build` directory.
    ```bash
    npm run build
    ```

## Core Logic Overview

The application utilizes FFmpeg.wasm to perform video-to-GIF conversion in the browser:

1.  **Import and Initialize FFmpeg:**
    The `FFmpeg` class is imported from `@ffmpeg/ffmpeg`. An instance is created, which will be used for all FFmpeg operations.
    ```typescript
    import { FFmpeg } from '@ffmpeg/ffmpeg';
    const ffmpeg = new FFmpeg();
    ```

2.  **Load FFmpeg Core:**
    Before any operations can be performed, the FFmpeg core engine (the `.wasm` file and potentially worker scripts) must be loaded.
    ```typescript
    await ffmpeg.load();
    ```

3.  **Write Input Video to WASM Memory:**
    The uploaded video file is read as an `ArrayBuffer`, converted to a `Uint8Array`, and then written to FFmpeg's virtual file system.
    ```typescript
    // 'video' is a File object from an input element
    const videoFileDataBuffer = await video.arrayBuffer();
    await ffmpeg.writeFile('input.mp4', new Uint8Array(videoFileDataBuffer));
    ```

4.  **Run FFmpeg Commands:**
    FFmpeg commands are executed using the `exec` method, passing arguments as an array of strings. For example, to create a GIF from `input.mp4`, starting at 1 second, lasting 3 seconds, with a frame rate of 10fps and scaled to 320px width:
    ```typescript
    await ffmpeg.exec([
      '-i', 'input.mp4',
      '-ss', '00:00:01', // Start time
      '-t', '3',         // Duration
      '-vf', 'fps=10,scale=320:-1:flags=lanczos', // Filters for FPS and scaling
      'output.gif'
    ]);
    ```
    *(Note: The actual command arguments in `App.tsx` are slightly different: `await ffmpeg.exec(['-i', 'test.mp4', '-t', '2.5', '-ss', '2.0', '-f', 'gif', 'out.gif']);`)*

5.  **Read the Output GIF:**
    The resulting GIF file is read from FFmpeg's virtual file system as a `Uint8Array`.
    ```typescript
    const data = await ffmpeg.readFile('output.gif');
    ```

6.  **Create Displayable GIF URL:**
    The `Uint8Array` data is converted into a `Blob` and then into an object URL that can be used as the `src` for an `<img>` tag to display the GIF.
    ```typescript
    // 'data' is the Uint8Array from readFile
    const url = URL.createObjectURL(new Blob([data], { type: 'image/gif' }));
    // setGif(url); // Example of how to use it in a React component
    ```

## Known Issues/Warnings

*   **Build Warning:**
    When running `npm run build`, you might see the following warning:
    ```
    Critical dependency: the request of a dependency is an expression
    ```
    This is a common warning when using packages like FFmpeg.wasm (or its underlying Emscripten-generated code) with Webpack. It usually relates to how Webpack tries to statically analyze dynamic imports or worker script loading. For this example, it generally does not affect the application's functionality.

*   **Remaining Vulnerabilities (from `npm audit` after `npm audit fix`):**
    As of the last dependency update (early 2025), the following notable vulnerabilities remained because their automatic fix would have involved breaking changes (e.g., downgrading `react-scripts` significantly):
    *   `nth-check <2.0.1` (High severity, indirectly via `react-scripts` -> `@svgr/webpack` -> `@svgr/plugin-svgo` -> `svgo` -> `css-select`)
    *   `ws 7.0.0 - 7.5.9` (High severity, likely via `webpack-dev-server` in `react-scripts`)
    These are often deep dependencies within the build tools and may be addressed in future updates of `react-scripts` or the respective transitive dependencies. For a production application, further investigation or mitigations for these might be necessary.

This example provides a solid foundation for more complex in-browser video and audio manipulation tasks using FFmpeg.wasm.
