import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useState, useMemo } from "react";
import cx from "classnames";
import { AUTO_PLAY_STATE, GAME_MODE } from "../../types/gameMode";
import AutoPlayController from "../base/AutoPlayController";
import ManualPlayController from "../base/ManualPlayController";
import styles_ui from "./UI.module.scss";
import { AutoManualPlayStateContext } from "./AutoManualPlayStateContext";
import { hexToRgb } from "../utils";
import DifficultySelector from "../base/DifficultySelector/DifficultySelector";
import InputWithSwitch from "../base/InputWithSwitch";
const AutoManualPlayProvider = ({ children, config }) => {
  const [mode, setMode] = useState(GAME_MODE.AUTOPLAY);
  const [autoplayState, setAutoplayState] = useState(AUTO_PLAY_STATE.IDLE);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [playedRounds, setPlayedRounds] = useState(0);
  const [numberOfPlays, setNumberOfPlays] = useState(Infinity);
  const startAutoplay = useCallback((numPlays) => {
    setMode(GAME_MODE.AUTOPLAY);
    setAutoplayState(AUTO_PLAY_STATE.PLAYING);
    setNumberOfPlays(numPlays);
    setPlayedRounds(0); // Reset when starting autoplay
  }, []);
  const stopAutoplay = useCallback(() => {
    setAutoplayState(AUTO_PLAY_STATE.IDLE);
    setIsAutoPlaying(false);
  }, []);
  const updateAutoplayState = useCallback(
    (newState) => setAutoplayState(newState),
    [],
  );
  const playManualMode = useCallback(() => {
    setMode(GAME_MODE.MANUAL);
    setAutoplayState(AUTO_PLAY_STATE.IDLE);
  }, []);
  const resetState = useCallback(() => {
    setMode(GAME_MODE.MANUAL);
    setAutoplayState(AUTO_PLAY_STATE.IDLE);
    setPlayedRounds(0);
    setNumberOfPlays(0);
  }, []);
  const toggleMode = useCallback(() => {
    if (
      config.playOptions.isPlaying ||
      config.playOptions.disabledController ||
      autoplayState === AUTO_PLAY_STATE.PLAYING
    ) {
      return;
    }
    setNumberOfPlays(Infinity);
    setMode((prevMode) =>
      prevMode === GAME_MODE.MANUAL ? GAME_MODE.AUTOPLAY : GAME_MODE.MANUAL,
    );
  }, [autoplayState, config.playOptions]);
  const contextValue = useMemo(
    () => ({
      mode,
      config,
      manual: { playManualMode },
      autoPlay: {
        state: autoplayState,
        playedRounds,
        numberOfPlays,
        isActive: isAutoPlaying,
        start: startAutoplay,
        stop: stopAutoplay,
        updateState: updateAutoplayState,
        setIsActive: setIsAutoPlaying,
        setPlayedRounds,
        setNumberOfPlays,
        setState: setAutoplayState,
      },
      reset: resetState,
      toggleMode,
    }),
    [
      mode,
      config,
      playManualMode,
      autoplayState,
      playedRounds,
      numberOfPlays,
      isAutoPlaying,
      startAutoplay,
      stopAutoplay,
      updateAutoplayState,
      resetState,
      toggleMode,
    ],
  );
  return _jsxs(AutoManualPlayStateContext.Provider, {
    value: contextValue,
    children: [
      typeof children === "function" ? children(contextValue) : children,
      config.playOptions.displayController &&
        _jsxs("div", {
          className: cx(styles_ui.base, styles_ui.betForm),
          style: {
            "--play-top": config.panel.top,
            "--play-panel-bg": hexToRgb(config.panel.bgColorHex ?? "#01243A"),
            "--play-dropdown-bg": hexToRgb(
              config.dropdown.bgColorHex ?? "#01243A",
            ),
          },
          children: [
            _jsxs("div", {
              className: cx(styles_ui.auto),
              children: [
                _jsx(DifficultySelector, {
                  playOptions: config.playOptions,
                  dropdownConfig: config.dropdown,
                }),
                _jsx(InputWithSwitch, {
                  value: numberOfPlays === Infinity ? 0 : numberOfPlays,
                  type: "number",
                  onChange: (e) =>
                    setNumberOfPlays(Number(e.currentTarget.value)),
                  placeholder: "Number of Plays",
                  min: 0,
                  max: 99,
                  disabled:
                    config.playOptions.disabledController ||
                    mode === GAME_MODE.MANUAL,
                  currency: config.currencyOptions.currentCurrency,
                  switcherConfig: {
                    onSwitch: toggleMode,
                    isPlaying: isAutoPlaying || config.playOptions.isPlaying,
                    enabled: mode !== GAME_MODE.MANUAL,
                    currency: config.currencyOptions.currentCurrency,
                    disabled:
                      config.playOptions.disabledController ||
                      autoplayState === AUTO_PLAY_STATE.PLAYING,
                  },
                  children: _jsx("span", {
                    className: cx({
                      [styles_ui.disabled]:
                        mode !== GAME_MODE.AUTOPLAY ||
                        numberOfPlays !== Infinity ||
                        autoplayState === AUTO_PLAY_STATE.PLAYING,
                    }),
                    children: `∞`,
                  }),
                }),
              ],
            }),
            mode === GAME_MODE.MANUAL
              ? _jsx(ManualPlayController, {})
              : _jsx(AutoPlayController, {}),
          ],
        }),
    ],
  });
};
export default AutoManualPlayProvider;
//# sourceMappingURL=AutoManualPlayProvider.js.map
