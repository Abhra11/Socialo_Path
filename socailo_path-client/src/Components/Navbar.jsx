import "./Navbar.css";
import PersonIcon from "@mui/icons-material/Person";
import TextsmsIcon from "@mui/icons-material/Textsms";
import CampaignIcon from "@mui/icons-material/Campaign";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

const Navbar = () => {
  return (
    <div className="navbarContainer">
      <div className="navbarLeft">
        <span className="logo">SocialoPath</span>
      </div>
      <div className="navbarCenter">
        <div className="searchbar">
          <SearchIcon className="searchIcon" />
          <input placeholder="Search...." className="searchInput" />
        </div>
      </div>
      <div className="navbarRight">
        <div className="navbarLinks">
          <span className="navbarLink">Homepage</span>
          <span className="navbarLink">Timeline</span>
        </div>

        <div className="navbarIcons">
          <div className="navbarIconItem">
            <PersonIcon />
            <span className="navbarIconBadge">1</span>
          </div>
          <div className="navbarIconItem">
            <CampaignIcon />
            <span className="navbarIconBadge">2</span>
          </div>
          <div className="navbarIconItem">
            <TextsmsIcon />
            <span className="navbarIconBadge">3</span>
          </div>
        </div>
        <img src="/assets/person/1.jpeg" alt="" className="navbarImg" />
      </div>
    </div>
  );
};

export default Navbar;
