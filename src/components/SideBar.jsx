import React from 'react'
import '@coreui/coreui/dist/css/coreui.min.css'
import './SideBar.css'
import { Link, useNavigate } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";

import {
  CBadge,
  CSidebar,
  CSidebarHeader,
  CSidebarNav,
  CNavGroup,
  CNavLink,
  CButton
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilBell,
  cilBlur,
  cilPuzzle,
  cilAddressBook,
  cilZoom,
  cilAccountLogout
} from '@coreui/icons'

function SideBar() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    console.log("Signed out");
    navigate("/login");
  };

  return (
    <CSidebar className="border-end" unfoldable>
      <CSidebarHeader className="border-bottom">
        <CIcon className='nav-icon' icon={cilBlur}></CIcon>
      </CSidebarHeader>

      <CSidebarNav>
        <CNavLink as={Link} to="/dashbord" className="custom-nav-link" style={{ textDecoration: 'none', color: 'inherit' }}>
          <CIcon customClassName="nav-icon" icon={cilSpeedometer} />
          &nbsp;Dashbord
        </CNavLink>

        <CNavGroup
          toggler={
            <>
              <CIcon customClassName="nav-icon" icon={cilPuzzle} />
              &nbsp;My Items
            </>
          }
        >
          <CNavLink as={Link} to="/mylostitem" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span className="nav-icon">
              <span className="nav-icon-bullet"></span>
            </span>
            &nbsp;My Lost Item
          </CNavLink>

          <CNavLink as={Link} to="/myfounditem" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span className="nav-icon">
              <span className="nav-icon-bullet"></span>
            </span>
            &nbsp;My Found Item
          </CNavLink>
        </CNavGroup>

        <CNavLink href="#">
          <CIcon customClassName="nav-icon" icon={cilBell} />
          &nbsp;Notification
          <CBadge color="primary ms-auto">NEW</CBadge>
        </CNavLink>

        <CNavLink href="https://coreui.io">
          <CIcon customClassName="nav-icon" icon={cilAddressBook} />
          &nbsp;Post
        </CNavLink>

        <CNavLink href="https://coreui.io/pro/">
          <CIcon customClassName="nav-icon" icon={cilZoom} />
          &nbsp;Help
        </CNavLink>
      </CSidebarNav>

      {/* Sign Out button at the bottom */}
      <div className=" border-top mt-auto flex hover:bg-red-500">
        
        <CButton
          className="w-100 d-flex align-items-center justify-content-center gap-2  "
          onClick={handleSignOut}
        >
       
            &nbsp; 
          <VscSignOut className='text-2xl '/>
          
        </CButton>
      </div>
    </CSidebar>
  )
}

export default SideBar;
