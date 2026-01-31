# Tudo_FE

React Native mobile application for Tudo.

## Getting Started

### Prerequisites

- Node.js >= 18
- React Native CLI
- Xcode (for iOS) or Android Studio (for Android)

### Installation

```bash
# Install dependencies
npm install

# For iOS, install pods
cd ios && pod install && cd ..
```

### Running the App

```bash
# Start Metro bundler
npm start

# Run on iOS Simulator
npm run ios

# Run on Android Emulator
npm run android
```

## How to View the App

### Option 1: iOS Simulator (Mac only)
1. Open Xcode and install iOS Simulator
2. Run `npm run ios`

### Option 2: Android Emulator
1. Open Android Studio > Virtual Device Manager
2. Create and start an emulator
3. Run `npm run android`

### Option 3: Physical Device
1. Connect your device via USB
2. Enable Developer Mode on your device
3. Run `npm run android` or `npm run ios`

---

## Figma Integration

**Design File:** https://www.figma.com/design/CHPrkdGjQUMRM3FbsDMCOr/tudo?node-id=430-175

### Setting Up Figma MCP in Cursor

1. Copy the example config:
   ```bash
   cp .cursor/mcp.json.example .cursor/mcp.json
   ```

2. Edit `.cursor/mcp.json` and replace `YOUR_FIGMA_API_KEY_HERE` with your actual Figma API key

3. Get your Figma API key from: Figma → Settings → Personal access tokens

4. Restart Cursor

> **Note:** Never commit `.cursor/mcp.json` - it contains your API key. The `.gitignore` is configured to exclude it.

### Exporting Assets from Figma

1. Open your Figma design file
2. Select the element you want to export (e.g., background, logo pattern)
3. In the right panel, scroll to "Export"
4. Choose format (PNG for images, SVG for icons)
5. Click "Export" and save to `/assets` folder

### Assets Needed

Place these in the `/assets` folder:
- `background.png` - The dark blue background
- `logo_background.png` - The "tvo" pattern tiles

After adding assets, update the screen files to enable them:

```javascript
// In src/screens/PhoneNumberScreen.js
const IMG_BACKGROUND = require('../../assets/background.png')
const IMG_LOGO_PATTERN = require('../../assets/logo_background.png')
```

---

## Phone Number Input Screen

Located at `src/screens/PhoneNumberScreen.js`

### Features

- **Dynamic Layout**: Uses flexbox instead of absolute positioning
- **Country Code Selector**: Touchable element for selecting country codes
- **Phone Number Input**: Text input for entering phone numbers
- **Responsive Design**: Adapts to all screen sizes

### Customizing the Country Code Picker

Edit the `handleCountryCodePress` function to implement your country selection:

```javascript
const handleCountryCodePress = () => {
  // Navigate to country picker
  navigation.navigate('CountryPicker')
  
  // Or show a modal
  setShowCountryModal(true)
}
```

---

## Project Structure

```
/workspace
├── App.js                 # Main app entry with navigation
├── index.js               # React Native entry point
├── package.json           # Dependencies
├── assets/                # Images and assets
│   ├── background.png
│   └── logo_background.png
└── src/
    └── screens/
        ├── index.js
        ├── PhoneNumberScreen.js
        └── iphone_55.js
```
