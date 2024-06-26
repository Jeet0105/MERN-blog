import { useSelector, useDispatch } from "react-redux";
import { Sidebar } from 'flowbite-react';
import { HiUser } from "react-icons/hi";
import { HiArrowSmRight } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { signoutSucess } from "../redux/user/userSlice";

function DashSidebar() {
    const { currentUser } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const location = useLocation();
    const [tab, setTab] = useState('');
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        setTab(tabFromUrl);
    }, [location.search]);

    const handleSignout = async () => {
        try {
            const res = await fetch('/api/user/signout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                dispatch(signoutSucess());
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Sidebar className="w-full md:w-[250px] md:border-r-2 md:border-[darkgray]">
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Item
                        as={Link}
                        to='/dashboard?tab=profile'
                        active={tab === 'profile'}
                        icon={HiUser}
                        label={currentUser.username}
                        labelColor='dark'
                    >
                        Profile
                    </Sidebar.Item>
                    <Sidebar.Item onClick={handleSignout} icon={HiArrowSmRight} className='cursor-pointer'>
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}

export default DashSidebar;