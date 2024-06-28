import { useSelector } from "react-redux";
import { Sidebar } from 'flowbite-react';
import { HiUser } from "react-icons/hi";
import { HiArrowSmRight } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function DashSidebar() {
    const { currentUser } = useSelector(state => state.user);

    const location = useLocation();
    const [tab, setTab] = useState('');
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        setTab(tabFromUrl);
    }, [location.search]);

    return (
        <Sidebar className="w-full md:w-[250px]">
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                        <Sidebar.Item as={Link} to='/dashboard?tab=profile' active={tab === 'profile'} icon={HiUser} label={currentUser.username} labelColor='dark'>
                            Profile
                        </Sidebar.Item>
                    <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer'>
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}

export default DashSidebar