import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import "./Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Sidebar Toggle Button */}
      <Button
        className={`sidebar-toggle ${isOpen ? "open" : ""}`}
        onClick={toggleSidebar}
        icon={isOpen ? <CloseOutlined /> : <MenuOutlined />}
        size="large"
      />

      {/* Sidebar Menu */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <ul>
          
          <li><Link to="/User" onClick={toggleSidebar}>User</Link></li>
          <li><Link to="/Company" onClick={toggleSidebar}>Company</Link></li>
          <li><Link to="/Employer" onClick={toggleSidebar}>Employer</Link></li>
          <li><Link to="/Internship" onClick={toggleSidebar}>Internship</Link></li>
          <li><Link to="/ApplicationForm" onClick={toggleSidebar}>ApplicationForm</Link></li>
          
          

          
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
