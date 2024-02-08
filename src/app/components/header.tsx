"use client"

import React, { useState } from 'react';

import Cookies from 'js-cookie';

import '../snipped.css'

const Header = ({ isLoggedIn, skipLogin, pageName }: { isLoggedIn: boolean, skipLogin: boolean | undefined, pageName: string | undefined }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="relative w-full top-0 p-0">
            <div className="ast-primary-header-bar ast-primary-header main-header-bar site-header-focus-item snipcss-g39h2" data-section="section-primary-header-builder" style={{ backgroundColor: '#02132f' }}>
                <div className="site-primary-header-wrap ast-builder-grid-row-container site-header-focus-item ast-container" data-section="section-primary-header-builder">
                    <div className="ast-builder-grid-row ast-builder-grid-row-has-sides ast-builder-grid-row-no-center">
                        <div className="site-header-primary-section-left site-header-section ast-flex site-header-section-left">
                            <div className="ast-builder-layout-element ast-flex site-header-focus-item" data-section="title_tagline">
                                <div className="site-branding ast-site-identity" itemType="https://schema.org/Organization" >
                                    <span className="site-logo-img"><a href="/" className="custom-logo-link transparent-custom-logo" rel="home" itemProp="url" aria-label="NIKH"><img width={120} height={34} src="https://subra.ics.forth.gr/wp-content/uploads/2024/01/NIKH-logoname-120x34.png " className="custom-logo p-0" alt="" decoding="async" /></a><a href="/" className="custom-logo-link ast-transparent-mobile-logo" rel="home" itemProp="url"><img width={120} height={34} src="./NIKH-logoname-120x34.png" className="custom-logo" alt="" decoding="async" /></a></span>
                                </div>
                            </div>
                        </div>
                        <div className="site-header-primary-section-right site-header-section ast-flex ast-grid-right-section">
                            <div className="ast-builder-menu-1 ast-builder-menu ast-flex ast-builder-menu-1-focus-item ast-builder-layout-element site-header-focus-item" data-section="section-hb-menu-1">
                                <div className="ast-main-header-bar-alignment">
                                    <div className="main-header-bar-navigation">
                                        <nav className="site-navigation ast-flex-grow-1 navigation-accessibility site-header-focus-item" id="primary-site-navigation-desktop" aria-label="Site Navigation" itemType="https://schema.org/SiteNavigationElement" >
                                            <div className="main-navigation ast-inline-flex">
                                                <ul id="ast-hf-menu-1" className="main-header-menu ast-menu-shadow ast-nav-menu ast-flex  submenu-with-border stack-on-mobile">
                                                    <li id="menu-item-542" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-540 current_page_item menu-item-542"><a href="https://subra.ics.forth.gr/" aria-current="page" className="menu-link">Home</a></li>
                                                    <li id="menu-item-12" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-12"><a href="https://subra.ics.forth.gr/authorities/" className="menu-link">Authorities</a></li>
                                                    <li id="menu-item-11" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-11"><a href="https://subra.ics.forth.gr/citizens/" className="menu-link">Citizens</a></li>
                                                    <li id="menu-item-10" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-10"><a href="/scientists/" className={`menu-link ${pageName === 'scientists' ? "active-link" : ""}`}>Scientists</a></li>
                                                    <li id="menu-item-150" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-150"><a href="/tools/" className={`menu-link ${pageName === 'members' ? "active-link" : ""}`}>Tools</a></li>
                                                </ul>
                                            </div>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                            <div className={`ast-builder-layout-element ast-flex site-header-focus-item ast-header-button-1 ${skipLogin ? "invisible" : ""}`} data-section="section-hb-button-1">
                                {
                                    isLoggedIn ?
                                        <div className="ast-builder-button-wrap ast-builder-button-size-"><a className="ast-custom-button-link" onClick={() => { Cookies.remove('token', { path: '' }); window.location.reload();}}>
                                            <div style={{paddingLeft: '32px', paddingRight: "33px"}} className="ast-custom-button cursor-pointer">Logout</div>
                                        </a></div> :
                                        <div className="ast-builder-button-wrap ast-builder-button-size-"><a className="ast-custom-button-link" href="/login">
                                            <div className="ast-custom-button">Login</div>
                                        </a></div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;