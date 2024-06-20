import React, { useState } from "react";
import { Button } from "@material-tailwind/react";

import "../snipped-footer.css";

const Footer = () => {
  return (
    <div className="relative font-lato w-full p-0 mt-auto">
      <div
        className="elementor-element elementor-element-a514b5f e-flex e-con-boxed wpr-particle-no wpr-sticky-section-no e-con e-parent snipcss-Rw5hh"
        data-id="a514b5f"
        data-element_type="container"
        data-settings='{"background_background":"classic","content_width":"boxed","_ha_eqh_enable":false}'
        data-core-v316-plus="true"
      >
        <div className="e-con-inner">
          <div
            className="elementor-element elementor-element-befd6e6 e-con-full e-flex wpr-particle-no wpr-jarallax-no wpr-parallax-no wpr-sticky-section-no e-con e-child"
            data-id="befd6e6"
            data-element_type="container"
            data-settings='{"content_width":"full","_ha_eqh_enable":false}'
          >
            <div
              className="elementor-element elementor-element-f004050 elementor-position-left elementor-vertical-align-top elementor-widget elementor-widget-image-box"
              data-id="f004050"
              data-element_type="widget"
              data-widget_type="image-box.default"
            >
              <div className="elementor-widget-container">
                <div className="elementor-image-box-wrapper">
                  <figure className="elementor-image-box-img">
                    <img
                      style={{
                        width: "220px",
                        height: "41px",
                        paddingLeft: "3px",
                        paddingRight: "0px"
                      }}
                      src="./EN-Funded-by-the-EU-PANTONE-scaled.jpg"
                      className=""
                      alt=""
                    />
                  </figure>
                  <div className="elementor-image-box-content pl-0">
                    <p className="elementor-image-box-description">
                      Views and opinions expressed are those of the authors and
                      not necessarily reflect those of the European Union or the
                      European Health and Digital Executive Agency. Neither the
                      EU, nor the granting authority can be held responsible for
                      them.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="elementor-element elementor-element-be892db e-con-full e-flex wpr-particle-no wpr-jarallax-no wpr-parallax-no wpr-sticky-section-no e-con e-child"
            data-id="be892db"
            data-element_type="container"
            data-settings='{"content_width":"full","_ha_eqh_enable":false}'
          >
            <div
              className="elementor-element elementor-element-b10e05e elementor-widget elementor-widget-copyright"
              data-id="b10e05e"
              data-element_type="widget"
              data-settings='{"align":"right"}'
              data-widget_type="copyright.default"
            >
              <div className="elementor-widget-container">
                <div className="hfe-copyright-wrapper">
                  <span
                    className="font-lato"
                    style={{ paddingLeft: "0px", paddingRight: "8px" }}
                  >
                    Copyright © 2024 NIKH{" "}
                  </span>
                </div>
              </div>
            </div>
            <div
              className="elementor-element elementor-element-e2014cf elementor-align-right elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list"
              data-id="e2014cf"
              data-element_type="widget"
              data-widget_type="icon-list.default"
            >
              <div className="elementor-widget-container">
                <link
                  rel="stylesheet"
                  href="https://subra.ics.forth.gr/wp-content/plugins/elementor/assets/css/widget-icon-list.min.css"
                />
                <ul className="elementor-icon-list-items">
                  <li className="elementor-icon-list-item">
                    <a href="https://www.nextgem.eu/" target="_blank">
                      <span className="elementor-icon-list-text">
                        Designed &amp; Developed by NextGEM
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
