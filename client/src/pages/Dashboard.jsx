import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPost from '../components/DashPost';

function Dashboard() {
  const location = useLocation();
  const [tab,setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    setTab(tabFromUrl);
  }, [location.search]);
  
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-52'>
        {/* sidebar */}
        <DashSidebar/>
      </div>
      {/* profile... */}
      {tab==='profile'? <DashProfile/> : null}
      {tab==='posts'? <DashPost /> :null}
    </div>
  )
}

export default Dashboard