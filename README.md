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

---

## Phone Number Input Screen

Located at `src/screens/PhoneNumberScreen.js`

### Features

- **Dynamic Layout**: Uses flexbox instead of absolute positioning
- **Country Code Selector**: Touchable element for selecting country codes
- **Phone Number Input**: Text input for entering phone numbers
- **Responsive Design**: Adapts to all screen sizes

### Assets Required

Place these in the `/assets` folder:
- `background.png` - The dark blue background image
- `logo_background.png` - The pattern/logo tiles

After adding assets, update the screen file to enable them:

```javascript
// In src/screens/PhoneNumberScreen.js
const IMG_BACKGROUND = require('../../assets/background.png')
const IMG_LOGO_PATTERN = require('../../assets/logo_background.png')
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
