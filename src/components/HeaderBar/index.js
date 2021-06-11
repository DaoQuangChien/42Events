import React, { useState } from "react";
import Modal from "antd/lib/modal/Modal";
import { SCROLL_DOWN } from "../../constants";
import useScrollDirection from "../../hooks/useScrollDirection";
import useWindowSize from "../../hooks/useWindowSize";
import Select from "antd/lib/select";
import "./style.scss";

const { Option } = Select;
const HeaderBar = () => {
  const [scrollDirection] = useScrollDirection();
  const [windowSize] = useWindowSize();
  const [menuPopupVisible, setMenuPopupVisible] = useState(false);
  const [languageMenuVisible, setLanguageMenuVisible] = useState(false);
  const [currentLang, setCurrentLang] = useState({
    title: "English",
    value: "en_US",
  });
  const onToggleMenuPopup = () => {
    setMenuPopupVisible(!menuPopupVisible);
  };
  const onHideMenuPopup = () => {
    setMenuPopupVisible(false);
  };
  const onToggleLanguageMenu = () => {
    setLanguageMenuVisible(!languageMenuVisible);
  };
  const onClickLanguageSelection = (e) => {
    e.preventDefault();
  };
  const languages = [
    {
      title: "English",
      value: "en_US",
    },
    {
      title: "简体中文",
      value: "zh_CN",
    },
    {
      title: "繁體中文",
      value: "zh_TW",
    },
    {
      title: "Bahasa Indonesia",
      value: "id_ID",
    },
    {
      title: "ภาษาไทย",
      value: "th_TH",
    },
    {
      title: "Tiếng Việt",
      value: "vi_VN",
    },
  ];
  const menuItems = [
    {
      icon: "https://virtual-race-submissions.s3-ap-southeast-1.amazonaws.com/images/Order-png-87a06012020-153245",
      title: "Log in",
    },
    {
      icon: "https://virtual-race-submissions.s3-ap-southeast-1.amazonaws.com/images/edit-png-r2q06012020-153245",
      title: "Sign up",
    },
    {
      icon: "https://virtual-race-submissions.s3-ap-southeast-1.amazonaws.com/images/guides-png-w9706012020-153245",
      title: "Guides and FAQ",
    },
    {
      icon: "https://virtual-race-submissions.s3-ap-southeast-1.amazonaws.com/images/contact-us-png-1nt06012020-153245",
      title: "Contact us",
    },
  ];

  return (
    <div
      className={
        scrollDirection === SCROLL_DOWN ? "header-bar down" : "header-bar up"
      }
    >
      <div className="header-bar-container">
        <img
          className="header-bar-icon"
          src="https://s3-ap-southeast-1.amazonaws.com/web42-assets/images/icons/Bell.png"
          alt="bell"
        />
        <p className="header-bar-title">Events</p>
        <img
          className="header-bar-icon toggle-menu-popup"
          src="https://s3-ap-southeast-1.amazonaws.com/web42-assets/images/icons/ic-menu.png"
          alt="bell"
          onClick={onToggleMenuPopup}
        />
      </div>
      <Modal
        visible={menuPopupVisible}
        closable={false}
        footer={null}
        onCancel={onHideMenuPopup}
        style={
          !windowSize.isDesktopSize && {
            top: 43,
            margin: 0,
            maxWidth: "100%",
          }
        }
        width={windowSize.isDesktopSize ? 360 : "100%"}
      >
        <div className="menu">
          {menuItems.map(({ icon, title, suffixItem }, i) => (
            <div className="menu-item" key={i}>
              <a className="menu-item-container" href="#">
                <img className="menu-item-prefix-icon" src={icon} alt={title} />
                <span className="menu-item-title">{title}</span>
                <img
                  className="menu-item-suffix-icon"
                  src="https://virtual-race-submissions.s3-ap-southeast-1.amazonaws.com/images/-png-dwc05122019-153508"
                  alt="iconArrowRight"
                />
              </a>
            </div>
          ))}
          <div className="menu-item menu-item-container">
            <img
              className="menu-item-prefix-icon"
              src="https://virtual-race-submissions.s3-ap-southeast-1.amazonaws.com/images/change-language-png-69e06012020-153245"
              alt="Language"
            />
            <span className="menu-item-title">Language</span>
            <Select
              value={currentLang.title}
              suffixIcon={
                <img
                  className="menu-item-suffix-icon language-suffix-icon"
                  src="https://virtual-race-submissions.s3-ap-southeast-1.amazonaws.com/images/-png-dwc05122019-153508"
                  alt="iconArrowRight"
                />
              }
              bordered={false}
              dropdownClassName="languages-dropdown"
            >
              {languages.map((language) => (
                <Option value={language.value} key={language.value}>
                  {language.title}
                </Option>
              ))}
            </Select>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default HeaderBar;
