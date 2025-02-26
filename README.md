# MultiPlayController

The `MultiPlayController` component is a key part of the gameplay interface, allowing users to initiate a play based on their current game state. It supports manual play, autoplay, dynamic currency handling, and play amount adjustments.

---

## Component Overview

The `MultiPlayController` allows the user to:

- Select a currency.
- Adjust the play amount.
- Start a play (manual or auto).
- Cash out winnings.
- Toggle between manual play and autoplay.

---

## Setup

### 1. Install the package using npm:

```bash
npm install @enigma-lake/multi-play-controller-sdk
```

### 2. Import the component and styles in your project:

```tsx
import {
  AUTO_PLAY_STATE,
  GAME_MODE,
  AutoManualPlayProvider,
} from "@enigma-lake/multi-play-controller-sdk";

import "@enigma-lake/multi-play-controller-sdk/dist/style.css";
```

---

## Context & Provider

### `AutoManualPlayProvider`

The `AutoManualPlayProvider` wraps the PlayController, managing both manual play and autoplay. It uses React Context to provide game state and actions throughout the component tree.

🔹 **Features of `AutoManualPlayProvider`**:

- **Manages Game Mode**: Switches between MANUAL and AUTOPLAY.
- **Handles Autoplay**: Sets the number of plays, tracks rounds, and stops automatically.
- **Provides Context:** Exposes state and functions for controlling play behavior.

## Props

### 1. `StylingProps`

Handles the styling-related properties for the component.

- **`panel` (optional)**: Custom styling for the play controller.

  - **`bgColorHex`**: Hex color for the panel background.
  - **`bottom`**: Position of the panel relative to the window.

- **`dropdown` (optional)**: Custom styling for the dropdown.
  - **`bgColorHex`**: Hex color for the panel background.
  - **`riskColorConfig`**: Object defining colors for different risk levels.
    - **`LOW`**: color (e.g." #1AE380")
    - **`MEDIUM`**: color (e.g." #FAEB78")
    - **`HIGH`**: color (e.g." #FF5646")

### 2. `CurrencyProps`

Handles currency-related logic and settings.

- **`currencyOptions`**: An object containing the following properties:
  - **`currentCurrency`**: The currently selected currency (e.g., `Currency.SWEEPS`).
  - **`currencies`**: Array of available currencies that the user can choose from.

### 3. `ActionsProps`

Defines functions for the user actions.

- **`onPlay`**: A callback function to trigger when the user starts a play.
- **`onAutoPlay`**: A callback function to trigger when the user starts autoplay.

### 4. `PlaySettingsProps`

Handles game-specific settings and states.

- **`playOptions`**: An object containing the following properties:
  - **`isPlaying`**: Boolean flag indicating whether the game is currently in progress.
  - **`canCashout`**: Boolean flag indicating whether the user can cash out their current play.
  - **`disabledController`**: Boolean flag to disable all interactive elements in the component.
  - **`displayController`**: Boolean flag to determine if the play controller should be visible.
  - **`playHook`**: A hook providing the current play amount, play limits, and a function to set the play amount.
    - **`playLimits`**: Play limits for the game.
    - **`leftPlayAmount`**: The current left play amount.
    - **`rightPlayAmount`**: The current right play amount.
    - **`setLeftBetAmount`**: A function to set the left play amount.
    - **`setRightBetAmount`**: A function to set the right play amount.
  - **`autoPlayDelay`** (optional): The delay (in milliseconds) before auto play starts.
  - **`currentRisk`**: The current risk setting.
  - **`onRiskChange`**: Callback function to handle risk selection.
  - **`risks`**: Array of available risk types.

---

## Example Usage

```tsx
import "@enigma-lake/multi-play-controller-sdk/dist/style.css";
import { AutoManualPlayProvider, GAME_MODE, AUTO_PLAY_STATE } from "@enigma-lake/multi-play-controller-sdk";
import { Currency } from "@enigma-lake/zoot-platform-sdk";

const GameExample = () => {
  const config = {
    currencyOptions: {
      currentCurrency: Currency.SWEEPS,
      currencies: [Currency.SWEEPS, Currency.GOLD],
    },
    onPlay: () => console.log("Play button clicked"),
    onAutoPlay: (selection, next, stop) => {
      console.log("Auto Play started with selection:", selection);
      next(); // Proceed to the next autoplay round
      stop(); // Stop autoplay (e.g., in case of an error or when the user chooses to stop)
    },
    playOptions: {
      displayController: true,
      canCashout: false,
      isPlaying: false,
      disabledController: false,
      playHook: () => {
        return {
          playLimits: { min: 1, max: 100 },
          leftPlayAmount: 10,
          rightPlayAmount: 10,
          setLeftBetAmount: (value) => console.log("New left play amount:", value),
          setRightBetAmount: (value) => console.log("New right play amount:", value),
        };
      },
    },
    panel: {
      bottom: window.innerWidth < 450 ? "55px" : "70px",
      bgColorHex: "#08643F"
    },
    dropdown: {
      bgColorHex: "#10243F",
      riskColorConfig: {
        LOW: "#1AE380",
        MEDIUM: "#FAEB78",
        HIGH: "#FF5646",
      },
    }
  };

  return (
    <AutoManualPlayProvider config={config}>
      {({ autoPlay: { selection, setSelection, state }, mode }) => (
        // children content
      )}
    </AutoManualPlayProvider>
  );
};
```

---

## Key Features

1. **Dynamic Currency Handling**:

   - Supports multiple currencies (e.g., SWEEPS, GOLD).
   - Allows users to switch currencies easily.

2. **Play Amount Adjustment**:

   - Allows users to set different play amounts for left and right bets.
   - Validates play amounts against user balance and play limits.

3. **Custom Styling**:

   - Supports customizable input and button colors.

4. **Play & Cashout Actions**:
   - Allows users to initiate gameplay seamlessly.

---

## Development Notes

1. **Play Amount Validation**:

   - The play amount is validated to ensure it falls within the minimum and maximum limits.

2. **Responsive Design**:
   - The component is styled to be responsive and integrate seamlessly into various layouts.
