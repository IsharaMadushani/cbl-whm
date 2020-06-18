import React, { useState, useEffect, useRef } from "react";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import Sidebar from "./Sidebar";
import MainPanel from "./MainPanel";
import { RoutesSwitcher } from "../../routes";


export default function Admin({ ...rest }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const mainPanel = useRef();

  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

 
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  
  useEffect(() => {
    let perfectScrollbar;

    if (navigator.platform.indexOf("Win") > -1) {
      perfectScrollbar = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        perfectScrollbar.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);


  return (
    <div>
      <Sidebar handleDrawerToggle={handleDrawerToggle} open={mobileOpen} {...rest} />
      <MainPanel mainPanelRef={mainPanel}>{RoutesSwitcher}</MainPanel>
    </div>
  );
}