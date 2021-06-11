import React, { useState, useEffect, useRef, useCallback } from "react";
import useClickOutsize from "../../hooks/useClickOutside";
import useWindowSize from "../../hooks/useWindowSize";
import "./style.scss";

const getOverlayElement = () => {
  let overlayElement = document.querySelector(".select-overlay.selection-list");

  if (!overlayElement) {
    overlayElement = document.createElement("div");
    overlayElement.className = "select-overlay selection-list";
    document.body.appendChild(overlayElement);
  }
  return overlayElement;
};
const SelectComponent = ({
  title,
  visible,
  options,
  value,
  defaultSelectedOption,
  renderSelected,
  style,
  onSelect,
}) => {
  const [selectedOption, setSelectedOption] = useState();
  const [showSelection, setShowSelection] = useState();
  const [highlightTitle, setHighlightTitle] = useState();
  const [windowSize] = useWindowSize();
  const selectionListRef = useRef();
  const selectedTitleRef = useRef();
  const handleOverlayElement = useCallback(() => {
    const overlayElement = getOverlayElement();

    if (showSelection) {
      overlayElement.className = "select-overlay selection-list show";
    } else {
      overlayElement.className = "select-overlay selection-list hide";
    }
  }, [showSelection]);
  const handleToggleSelection = () => {
    if (!showSelection && !windowSize.isDesktopSize) {
      document.body.style.overflow = "hidden";
    }
    setShowSelection(!showSelection);
  };
  const closeSelection = () => {
    setShowSelection(false);
    document.body.style.removeProperty("overflow");
  };
  const handleSelectOption = (option) => () => {
    if (onSelect && typeof onSelect === "function") {
      onSelect(option);
    } else {
      setSelectedOption(option);
    }
    closeSelection();
  };

  useClickOutsize([selectionListRef, selectedTitleRef], closeSelection);
  useEffect(() => {
    const isDefaultOptionSelected =
      selectedOption?.value ===
      (defaultSelectedOption?.value || options[0].value);

    setHighlightTitle(!isDefaultOptionSelected && selectedOption);
  }, [selectedOption, options, defaultSelectedOption]);
  useEffect(() => {
    setSelectedOption(value);
  }, [value]);
  useEffect(() => {
    setShowSelection(visible);
  }, [visible]);
  useEffect(() => {
    handleOverlayElement();
  }, [handleOverlayElement]);
  return (
    <div className="select-container">
      <div
        className={
          highlightTitle ? "select-selected active" : "select-selected"
        }
        onClick={handleToggleSelection}
        ref={selectedTitleRef}
      >
        {renderSelected ? renderSelected : selectedOption?.title || "Filters"}
      </div>
      <div
        className={
          showSelection
            ? "select-options-container shadowed show"
            : "select-options-container shadowed hide"
        }
        style={style}
        ref={selectionListRef}
      >
        <div className="header">
          <span className="close-btn" onClick={closeSelection}>
            x
          </span>
          <span className="header-title">{title}</span>
        </div>
        <ul>
          {options.map((option) => (
            <li
              className={`${option.customEle ? "custom-ele" : ""} ${
                !option.hideTick && selectedOption?.value === option.value
                  ? "select-option selected"
                  : "select-option"
              }`}
              onClick={handleSelectOption(option)}
              key={option.value}
            >
              {option.customEle ? option.customEle : option.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SelectComponent;
