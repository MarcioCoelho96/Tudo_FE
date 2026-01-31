# Tudo_FE

## Phone Number Input Screen

This screen displays a phone number input with:
- A country code selector (touchable/clickable) on the left
- A phone number input field on the right

### Key Changes Made

1. **Dynamic Layout**: Replaced absolute positioning with hardcoded pixel values with flexbox-based responsive layout
2. **Simplified Inputs**: Removed the hamburger menu icon, keeping clean pill-shaped inputs
3. **TouchableOpacity for Country Code**: The left input is now a `TouchableOpacity` that can be pressed to select a country code
4. **Responsive Design**: Uses `flex: 1` and percentage-based padding instead of fixed pixel calculations

### Files

- `src/screens/iphone_55.js` - The main screen component (original naming)
- `src/screens/PhoneNumberScreen.js` - Same component with cleaner naming

### Assets Required

Place your assets in the `assets/` folder:
- `assets/background.png` - The dark blue background image
- `assets/logo_background.png` - The pattern/logo tiles
