import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";

function DashProfile() {
    const { currentUser } = useSelector(state => state.user);
    return (
        <div className='md:ml-8 mx-auto p-3 w-full'>
            <h1 className="text-center my-7 text-3xl font-semibold">Profile</h1>
            <form className="flex flex-col gap-4 md:items-center">
                <div className="w-32 h-32 cursor-pointer self-center">
                    <img src={currentUser.profilePicture} alt="User" className="rounded-full w-full border-8 border-[lightgray] object-cover" />
                </div>
                <div className="md:w-[33%]">
                    <TextInput type="text" id="username" placeholder="username" defaultValue={currentUser.username} />
                </div>
                <div className="md:w-[33%]">
                    <TextInput type="email" id="email" placeholder="username" defaultValue={currentUser.email} />
                </div>
                <div className="md:w-[33%]">
                    <TextInput type="password" id="password" placeholder="Password" />
                </div>
                <Button type="submit" gradientDuoTone='purpleToBlue' outline>
                    Update
                </Button>
                <div className="text-red-700 flex justify-between md:w-[33%]">
                    <span className="cursor-pointer">Delete Account</span>
                    <span className="cursor-pointer">Sign Out</span>
                </div>
            </form>
        </div>
    )
}

export default DashProfile