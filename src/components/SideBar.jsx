// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Home from "../assets/home.png"
// import Transactions from "../assets/list.png"
// import Close from "../assets/close.png"

// const SideBar = () => {
//   const [hover, setHover] = useState(null)
//   const [sideBarClose, setSideBarClose] = useState(false)
//   const navigate = useNavigate()

//   const toggleSidebar = () => {
//     setSideBarClose((prev) => !prev)
//   }

//   const handleNavigation = (path) => {
//     navigate(path)
//   }

//   return (
//     <div
//       style={{
//         background: "white",
//         width: sideBarClose ? "60px" : "18%",
//         minWidth: sideBarClose ? "60px" : "150px",
//         padding: "1%",
//         transition: "width 0.3s ease, min-width 0.3s ease"
//       }}
//     >
//       <div 
//         style={{ 
//           fontSize: "18px", 
//           display: "flex", 
//           gap: sideBarClose ? "0px" : "8px", 
//           alignItems: "center", 
//           background: "#D3E2D3", 
//           padding: "5px 5px 5px 5px", 
//           marginBottom: "10px", 
//           borderRadius: "5px",
//           cursor: "pointer",
//           justifyContent: sideBarClose ? "center" : "flex-start"
//         }}
//         onClick={toggleSidebar}
//       >
//         <img src={Close} style={{width: "15px", transform: sideBarClose ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease"}}/>
//         {!sideBarClose && <div style={{background: "#D3E2D3"}}>FineTrack</div>}
//       </div>
      
//       <div 
//         style={{ 
//           fontSize: "18px", 
//           display: "flex", 
//           gap: sideBarClose ? "0px" : "8px", 
//           alignItems: "center", 
//           backgroundColor: hover === "dashboard" ? "#eee" : "transparent", 
//           padding: "5px 5px 5px 5px", 
//           marginBottom: "10px",
//           justifyContent: sideBarClose ? "center" : "flex-start",
//           cursor: "pointer"
//         }} 
//         onMouseEnter={() => setHover("dashboard")}
//         onMouseLeave={() => setHover(null)}
//         onClick={() => handleNavigation("/")}
//       >
//         <img src={Home} style={{width: "15px"}}/>
//         {!sideBarClose && <span style={{color: "black"}}>Dashboard</span>}
//       </div>
      
//       <div 
//         style={{ 
//           fontSize: "18px", 
//           display: "flex", 
//           gap: sideBarClose ? "0px" : "8px", 
//           alignItems: "center", 
//           backgroundColor: hover === "transactions" ? "#eee" : "transparent", 
//           padding: "5px 5px 5px 5px",
//           justifyContent: sideBarClose ? "center" : "flex-start",
//           cursor: "pointer"
//         }} 
//         onMouseEnter={() => setHover("transactions")}
//         onMouseLeave={() => setHover(null)}
//         onClick={() => handleNavigation("/transactions")}
//       >
//         <img src={Transactions} style={{width: "15px"}}/>
//         {!sideBarClose && <span style={{color: "black"}}>Transactions</span>}
//       </div>
//     </div>
//   );
// };

// export default SideBar;




import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, List, ChevronLeft, ChevronRight, BarChart3, Settings, CreditCard, PieChart, User, LogOut } from "lucide-react";

const SideBar = () => {
  const [hover, setHover] = useState(null)
  const [sideBarClose, setSideBarClose] = useState(false)
  const [activeItem, setActiveItem] = useState("dashboard")

  const toggleSidebar = () => {
    setSideBarClose((prev) => !prev)
  }

  const handleItemClick = (itemId) => {
    setActiveItem(itemId)
  }

  const menuItems = [
    { id: "dashboard", path: "/", icon: Home, label: "Dashboard" },
    { id: "transactions", path: "/transactions", icon: List, label: "Transactions" },
    { id: "analytics", path: "/analytics", icon: BarChart3, label: "Analytics" },
    { id: "budget", path: "/budget", icon: PieChart, label: "Budget" },
    { id: "cards", path: "/cards", icon: CreditCard, label: "Cards" },
  ]

  const bottomMenuItems = [
    { id: "profile", path: "/profile", icon: User, label: "Profile" },
    { id: "settings", path: "/settings", icon: Settings, label: "Settings" },
  ]

  const sidebarStyle = {
    background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
    width: sideBarClose ? "70px" : "280px",
    minWidth: sideBarClose ? "70px" : "280px",
    height: "100vh",
    padding: sideBarClose ? "16px 8px" : "24px 16px",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    borderRight: "1px solid #e2e8f0",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
    display: "flex",
    flexDirection: "column",
    position: "relative"
  }

  const logoLinkStyle = {
    display: "flex",
    alignItems: "center",
    gap: sideBarClose ? "0px" : "12px",
    padding: sideBarClose ? "12px 0" : "16px 12px",
    marginBottom: "32px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
    color: "white",
    textDecoration: "none",
    justifyContent: sideBarClose ? "center" : "flex-start",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
    position: "relative",
    overflow: "hidden"
  }

  const logoIconStyle = {
    width: "24px",
    height: "24px",
    transition: "transform 0.3s ease",
    zIndex: 2
  }

  const logoTextStyle = {
    fontSize: "20px",
    fontWeight: "700",
    letterSpacing: "-0.02em",
    transition: "opacity 0.3s ease",
    opacity: sideBarClose ? 0 : 1,
    whiteSpace: "nowrap"
  }

  const getLinkStyle = (itemId, isActiveItem = false) => ({
    display: "flex",
    alignItems: "center",
    gap: sideBarClose ? "0px" : "12px",
    padding: sideBarClose ? "14px 0" : "14px 16px",
    marginBottom: "4px",
    borderRadius: "12px",
    textDecoration: "none",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    justifyContent: sideBarClose ? "center" : "flex-start",
    position: "relative",
    overflow: "hidden",
    background: isActiveItem 
      ? "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)"
      : hover === itemId 
        ? "#f1f5f9" 
        : "transparent",
    border: isActiveItem ? "1px solid #bfdbfe" : "1px solid transparent",
    transform: hover === itemId && !isActiveItem ? "translateX(4px)" : "translateX(0px)",
    boxShadow: isActiveItem ? "0 2px 8px rgba(59, 130, 246, 0.15)" : "none"
  })

  const getIconStyle = (itemId, isActiveItem = false) => ({
    width: "20px",
    height: "20px",
    color: isActiveItem ? "#2563eb" : hover === itemId ? "#475569" : "#64748b",
    transition: "all 0.3s ease",
    transform: hover === itemId ? "scale(1.1)" : "scale(1)",
    zIndex: 2
  })

  const getLabelStyle = (itemId, isActiveItem = false) => ({
    fontSize: "15px",
    fontWeight: isActiveItem ? "600" : "500",
    color: isActiveItem ? "#1e40af" : hover === itemId ? "#334155" : "#475569",
    transition: "all 0.3s ease",
    opacity: sideBarClose ? 0 : 1,
    whiteSpace: "nowrap"
  })

  const toggleButtonStyle = {
    position: "absolute",
    top: "24px",
    right: "-12px",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    background: "white",
    border: "2px solid #e2e8f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    zIndex: 10
  }

  const dividerStyle = {
    height: "1px",
    background: "linear-gradient(90deg, transparent 0%, #e2e8f0 50%, transparent 100%)",
    margin: sideBarClose ? "16px 0" : "24px 0",
    opacity: 0.6
  }

  const sectionTitleStyle = {
    fontSize: "12px",
    fontWeight: "600",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    margin: sideBarClose ? "0" : "0 0 12px 16px",
    opacity: sideBarClose ? 0 : 1,
    transition: "opacity 0.3s ease"
  }

  

  return (
    <div style={sidebarStyle}>
      {/* Toggle Button */}
      <div 
        style={toggleButtonStyle}
        onClick={toggleSidebar}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#f8fafc"
          e.target.style.transform = "scale(1.1)"
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "white"
          e.target.style.transform = "scale(1)"
        }}
      >
        {sideBarClose ? <ChevronRight size={14} color="#64748b" /> : <ChevronLeft size={14} color="#64748b" />}
      </div>

      {/* Logo */}
      <Link 
        to="/"
        style={logoLinkStyle}
        onClick={() => handleItemClick("dashboard")}
        onMouseEnter={(e) => {
          e.target.style.transform = "translateY(-2px)"
          e.target.style.boxShadow = "0 8px 20px rgba(59, 130, 246, 0.4)"
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "translateY(0px)"
          e.target.style.boxShadow = "0 4px 12px rgba(59, 130, 246, 0.3)"
        }}
      >
        <BarChart3 style={logoIconStyle} />
        {!sideBarClose && <div style={logoTextStyle}>FineTrack</div>}
      </Link>

      {/* Main Navigation */}
      <div style={{flex: 1}}>
        {!sideBarClose && <div style={sectionTitleStyle}>Main Menu</div>}
        
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActiveItem = activeItem === item.id
          
          return (
            <Link
              key={item.id}
              to={item.path}
              style={getLinkStyle(item.id, isActiveItem)}
              onMouseEnter={() => setHover(item.id)}
              onMouseLeave={() => setHover(null)}
              onClick={() => handleItemClick(item.id)}
            >
              <Icon style={getIconStyle(item.id, isActiveItem)} />
              {!sideBarClose && <span style={getLabelStyle(item.id, isActiveItem)}>{item.label}</span>}
              
              {/* Active indicator */}
              {isActiveItem && (
                <div style={{
                  position: "absolute",
                  left: "0",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "3px",
                  height: "24px",
                  background: "linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%)",
                  borderRadius: "0 2px 2px 0"
                }} />
              )}
            </Link>
          )
        })}
      </div>

      {/* Divider */}
      <div style={dividerStyle} />


      {/* Tooltip for collapsed state */}
      {sideBarClose && hover && hover !== "logout" && (
        <div style={{
          position: "fixed",
          left: "80px",
          top: "200px",
          background: "#1f2937",
          color: "white",
          padding: "8px 12px",
          borderRadius: "6px",
          fontSize: "14px",
          fontWeight: "500",
          whiteSpace: "nowrap",
          zIndex: 1000,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          pointerEvents: "none"
        }}>
          {menuItems.find(item => item.id === hover)?.label || 
           bottomMenuItems.find(item => item.id === hover)?.label}
          
          {/* Tooltip arrow */}
          <div style={{
            position: "absolute",
            left: "-4px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "0",
            height: "0",
            borderTop: "4px solid transparent",
            borderBottom: "4px solid transparent",
            borderRight: "4px solid #1f2937"
          }} />
        </div>
      )}
    </div>
  );
};

export default SideBar;