import { GAME_MODE } from "../types";
import { PlaySide } from "../types/playController";

export const hexToRgb = (hex: string) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
        result[3],
        16,
      )}`
    : null;
};

export const selectButton = (gameMode: GAME_MODE, side = PlaySide.LEFT) => {
  const index = side === PlaySide.LEFT ? 0 : 1;
  const role = `role-${gameMode}-button`;
  const buttons = document.querySelectorAll<HTMLButtonElement>(
    `[data-role="${role}"]`,
  );
  return buttons[index];
};

export const addPressedClass = (
  gameMode: GAME_MODE,
  activeClassName: string,
  side?: PlaySide,
) => {
  const button = selectButton(gameMode, side);

  if (!button) {
    return;
  }
  if (!button.classList.contains(activeClassName)) {
    button.classList.add(activeClassName);
  }
};

export const removePressedClass = (
  gameMode: GAME_MODE,
  activeClassName: string,
  side?: PlaySide,
) => {
  const button = selectButton(gameMode, side);

  if (!button) {
    return;
  }
  if (button.classList.contains(activeClassName)) {
    button.classList.remove(activeClassName);
  }
};
