# Assets Folder

Add your image assets here:

## Required Files

1. **background.png** - The dark blue background image
   - Solid dark blue color (#2B4066)
   - Used as the screen background

2. **logo_background.png** - The "tuo" logo pattern
   - Repeating "tuo" text pattern
   - Orange (#E8A07A) and gray (#7A8BA3) colors
   - Used as overlay pattern on the background

## After Adding Assets

Update the screen files to enable the assets:

```javascript
// In src/screens/PhoneNumberScreen.js (around line 14-19)
// Change from:
const IMG_BACKGROUND = null
const IMG_LOGO_PATTERN = null

// To:
const IMG_BACKGROUND = require('../../assets/background.png')
const IMG_LOGO_PATTERN = require('../../assets/logo_background.png')
```

Also remove or comment out the null assignments.
