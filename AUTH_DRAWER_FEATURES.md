# Auth Drawer - Sign In / Sign Up Component

## Features

### ✨ Dynamic Height Based on Content
- **No Scrolling**: The drawer automatically adjusts its height based on the content
- **Sign In Mode**: Compact height with only essential fields (Email, Password)
- **Sign Up Mode**: Taller height with additional fields (Name, Confirm Password, Terms checkbox)
- **Smooth Transitions**: Height changes are animated with smooth easing curves

### 🎨 Interactive Switcher
- Tab-style switcher at the top of the drawer
- Seamlessly switch between Sign In and Sign Up modes
- Active tab is highlighted with a different background
- Form state resets when switching modes

### 📱 Responsive Design
- Works perfectly on mobile and desktop
- Swipe to close functionality
- Backdrop click to dismiss
- Keyboard (ESC) support

### 🔐 Authentication Features

#### Sign In Mode
- Email field
- Password field with show/hide toggle
- Remember me checkbox
- Forgot password link

#### Sign Up Mode
- Full name field
- Email field
- Password field with show/hide toggle
- Confirm password field with show/hide toggle
- Password match validation
- Terms & Conditions agreement checkbox

### 🎯 Social Login
- Google sign-in button with branded icon
- Facebook sign-in button with branded icon
- "Or continue with" divider

### ✨ Polish & UX
- Staggered field animations for smooth entry
- Icon indicators for each field (User, Mail, Lock icons)
- Real-time password visibility toggles
- Form validation feedback
- Gradient submit buttons with hover effects
- Dark mode support

## Usage

```tsx
import { AuthDrawer } from '@/components/drawer';

<AuthDrawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onSignIn={(email, password) => {
    // Handle sign in
    console.log('Sign in:', email, password);
  }}
  onSignUp={(name, email, password) => {
    // Handle sign up
    console.log('Sign up:', name, email, password);
  }}
/>
```

## Technical Details

### Height Management
- Uses `height: auto` for natural content-based sizing
- Maximum height is capped at 90vh for safety
- CSS transitions handle smooth height changes
- No fixed size prop - drawer adapts to content

### Performance
- Hardware-accelerated animations
- Smooth 60fps transitions
- Optimized re-renders when switching modes

### Accessibility
- Proper aria-labels for password toggles
- Form labels properly associated with inputs
- Keyboard navigation support
- Focus management

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization
The drawer can be easily customized through CSS variables and class overrides. The component uses BEM naming convention for easy styling.

