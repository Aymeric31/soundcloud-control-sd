# SoundCloud Control Stream Deck Plugin

A Stream Deck plugin to control SoundCloud playback directly from your Elgato Stream Deck. This plugin allows you to initialize the audio context, play/pause tracks, and skip to the next track on SoundCloud.

---

## Features

- **Initialize Audio**: Activates the browser's `AudioContext` to enable playback control.
- **Play/Pause**: Toggles playback on SoundCloud.
- **Next Track**: Skips to the next track on SoundCloud.
- **Multi Action Support**: Preconfigured multi-action to streamline the workflow.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/soundcloud-control-sd.git
   cd soundcloud-control-sd
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the plugin:
   ```bash
   npm run build
   ```

4. Link the plugin to Stream Deck:
   - Create a symbolic link to the plugin folder in `%appdata%\Elgato\StreamDeck\Plugins\`:
     ```bash
     mklink /D "%appdata%\Elgato\StreamDeck\Plugins\com.pepepizza.soundcloud-control-sd.sdPlugin" "path\to\your\project\soundcloud-control-sd\com.pepepizza.soundcloud-control-sd.sdPlugin"
     ```

5. Restart Stream Deck to load the plugin.
   ```
   streamdeck restart com.pepepizza.soundcloud-control-sd
   ```


---

## Usage

### **1. Initialize Audio**
This action activates the browser's `AudioContext`, which is required for playback control. It simulates a user interaction to comply with browser security policies.

### **2. Play/Pause**
Toggles playback on SoundCloud. Ensure that the `AudioContext` is initialized before using this action.

### **3. Next Track**
Skips to the next track on SoundCloud.

### **4. Multi Action**
A preconfigured multi-action is included:
- **Step 1**: Open SoundCloud in Chrome with remote debugging enabled.
- **Step 2**: Initialize the audio context.
- **Step 3**: Start playback with the Play/Pause action.

---

## Recommended Setup

### **Chrome Setup**
Create a `.bat` file to open Chrome with the required debugging options:
```bat
@echo off
"C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222 --remote-allow-origins=http://localhost:9222 --user-data-dir="C:\ChromeRemoteDebug" https://soundcloud.com
```

### **Stream Deck Multi Action**
1. Add the `.bat` file as the first step in a multi-action.
2. Add the "Initialize Audio" action as the second step.
3. Add the "Play/Pause" action as the third step.

---

## Development

### **Folder Structure**
The repository contains the following structure:
```
src/
    actions/
        initializeaudio.ts
        playpause.ts
        next.ts
    plugin.ts
```

### **Build Process**
The project uses Rollup for bundling. To build the plugin:
```bash
npm run build
```

### **Rollup Configuration**
Ensure the following configuration in `rollup.config.mjs`:
```javascript
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/plugin.ts',
  output: {
    file: 'com.pepepizza.soundcloud-control-sd.sdPlugin/bin/plugin.js',
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    nodeResolve({
      browser: false,
      exportConditions: ['node'],
      preferBuiltins: true,
    }),
    commonjs(),
    json(),
    typescript(),
    terser(),
  ],
};
```

---

## Troubleshooting

### **JSON Errors**
If you encounter JSON-related errors during the build process, install the JSON plugin for Rollup:
```bash
npm install --save-dev @rollup/plugin-json
```

Add the following line to your `rollup.config.mjs`:
```javascript
import json from '@rollup/plugin-json';
```

### **Stream Deck Logs**
If the plugin does not work as expected, check the Stream Deck logs:
- **Windows**: `%appdata%\Elgato\StreamDeck\logs\`
- **macOS**: `~/Library/Application Support/com.elgato.StreamDeck/Logs/`

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the plugin.

```

---

### **Key Points in the README**
1. **Features**: Highlights the key functionalities of the plugin.
2. **Installation**: Provides step-by-step instructions for setting up the plugin.
3. **Usage**: Explains how to use the actions and the multi-action.
4. **Development**: Includes details about the folder structure, build process, and Rollup configuration.
5. **Troubleshooting**: Offers solutions for common issues.
6. **License**: Specifies the MIT license.
7. **Contributing**: Encourages contributions to the project.

This README is designed to be comprehensive and user-friendly for both end-users and developers.
