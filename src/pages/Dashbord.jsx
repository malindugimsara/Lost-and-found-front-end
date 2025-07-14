import ResentItems from '../components/ResentItem.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from '../components/SideBar.jsx';
import AddLostItem from '../components/AddLostItem.jsx';
import AddFoundItem from '../components/AddFoundItem.jsx';
import LostFoundText from '../components/LostFoundText';

import React from 'react';

function Dashbord() {
  return (
    <>    
      <LostFoundText/>
      
      <div className='button-container'>
        <AddLostItem></AddLostItem> {/* Add Button */}
        <AddFoundItem></AddFoundItem> {/* Lost Button */}
      </div>
      
      <SideBar></SideBar>  {/* Side nav bar */}
      <ResentItems></ResentItems> {/* Recent Items */}
  
    </>
  );
}

export default Dashbord;