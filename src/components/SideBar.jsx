import React from 'react'
import '@coreui/coreui/dist/css/coreui.min.css'
import './SideBar.css'
import { Link } from "react-router-dom";

import {
  CBadge,
  CSidebar,
  CSidebarBrand,
  CSidebarHeader,
  CSidebarNav,
  CNavGroup,
  CNavLink,
  CNavItem,
  CNavTitle,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilCloudDownload, cilLayers, cilPuzzle, cilSpeedometer,cilZoom,cilBell ,cilAddressBook,cilBlur} from '@coreui/icons'

function SideBar() {
  return (
    <CSidebar className="border-end" unfoldable>
      <CSidebarHeader className="border-bottom">
        <CIcon className='nav-icon' icon={cilBlur}></CIcon>
      </CSidebarHeader>
      <CSidebarNav>
        <CNavLink as={Link} to="/dashbord" className="custom-nav-link" style={{ textDecoration: 'none', color: 'inherit' }}>
          <CIcon customClassName="nav-icon" icon={cilSpeedometer} />
          Dashbord
          {/* <Link to="/dashbord" style={{ textDecoration: 'none', color: 'inherit' }}>Dashbord</Link> */}

        </CNavLink>
        
        <CNavGroup
          toggler={
            <>
              <CIcon customClassName="nav-icon" icon={cilPuzzle} /> My Items{' '}
            </>
          }
        >
          <CNavLink as={Link} to="/mylostitem" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span className="nav-icon">
              <span className="nav-icon-bullet"></span>
            </span>{' '}
            My Lost Item
            {/* <Link to="/mylostitem" style={{ textDecoration: 'none', color: 'inherit' }}>My Lost Item</Link> */}
          </CNavLink>
          <CNavLink as={Link} to="/myfounditem" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span className="nav-icon">
              <span className="nav-icon-bullet"></span>
            </span>{' '}
            My Found Item
            {/* <Link to="/myfounditem" style={{ textDecoration: 'none', color: 'inherit' }}>My Found Item</Link> */}
          </CNavLink>
        </CNavGroup>

        <CNavLink href="#">
          <CIcon customClassName="nav-icon" icon={cilBell} /> Notification{' '}
          <CBadge color="primary ms-auto">NEW</CBadge>
        </CNavLink>
        
        <CNavLink href="https://coreui.io">
          <CIcon customClassName="nav-icon" icon={cilAddressBook} /> Post
        </CNavLink>
        <CNavLink href="https://coreui.io/pro/">
          <CIcon customClassName="nav-icon" icon={cilZoom} /> Help
        </CNavLink>
      </CSidebarNav>
    </CSidebar>
  )
}

export default SideBar;
