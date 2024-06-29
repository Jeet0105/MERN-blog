import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import { updateFailure, updateStart, updateSuccess } from "../redux/user/userSlice";

function DashProfile() {
    const { currentUser } = useSelector(state => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadingProgress, setImageFileUploadingProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [imageFileUploading, setimageFileUploading] = useState(false);
    const [updateUserSuccess,setUpdateUserSuccess] = useState(null);
    const [updateUserError,setUpdateUserError] = useState(null);
    const filePickerRef = useRef();
    const [formData, setFormData] = useState({})
    const dispatch = useDispatch();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }
    }, [imageFile]);

    const uploadImage = async () => {
        setImageFileUploadError(null);
        setimageFileUploading(true);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                setImageFileUploadingProgress(progress.toFixed(0));
            },
            (error) => {
                setImageFileUploadError(
                    'Could not upload image (File must be less than 2MB)'
                );
                setImageFileUploadingProgress(null);
                setImageFile(null);
                setImageFileUrl(null);
                console.log(error);
                setimageFileUploading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL);
                    setFormData({ ...formData, profilePicture: downloadURL });
                    setimageFileUploading(false);
                });
            }
        );
    };

    const handleChange = (e) => {
        setUpdateUserSuccess(null)
        setUpdateUserError(null);
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(formData).length === 0) {
            setUpdateUserError("No changes made");
            return;
        }
        if (imageFileUploading) {
            setUpdateUserError("Please wait for image to upload")
            return;
        }
        try {
            dispatch(updateStart());
            const res = await fetch(`/api/user/update/${currentUser._id}`,{
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData) 
            });
            const data = await res.json();
            if(!res.ok){
                dispatch(updateFailure(data.message));
                setUpdateUserError(data.message);
            }else{
                dispatch(updateSuccess(data));
                setUpdateUserSuccess("User's profile updated sucessfully")
            }
        } catch (error) {
            setUpdateUserError(error.message);
            dispatch(updateFailure(error.message));
        }
    };

    return (
        <div className='md:ml-8 mx-auto p-3 w-full'>
            <h1 className="text-center my-7 text-3xl font-semibold">Profile</h1>
            <form className="flex flex-col gap-4 md:items-center" onSubmit={handleSubmit}>
                <input type="file" accept="image/*" onChange={handleImageChange} ref={filePickerRef} hidden />
                <div className="w-32 h-32 cursor-pointer self-center relative" onClick={() => filePickerRef.current.click()}>
                    {imageFileUploadingProgress && (
                        <CircularProgressbar
                            value={imageFileUploadingProgress || 0}
                            text={`${imageFileUploadingProgress || 0}%`}
                            strokeWidth={5}
                            styles={{
                                root: {
                                    width: '100%',
                                    height: '100%',
                                    position: "absolute",
                                    top: 0,
                                    left: 0
                                },
                                path: {
                                    stroke: `rgba(62,152,199,${imageFileUploadingProgress / 100})`
                                },
                            }}
                        />
                    )}
                    <img src={imageFileUrl || currentUser.profilePicture} alt="User" className="rounded-full w-full h-full border-8 border-[lightgray] object-cover" />
                </div>
                {imageFileUploadError &&
                    <Alert color='failure'>
                        {imageFileUploadError}
                    </Alert>
                }
                <div className="md:w-[33%] mt-3">
                    <TextInput type="text" id="username" placeholder="username" defaultValue={currentUser.username} onChange={handleChange} />
                </div>
                <div className="md:w-[33%]">
                    <TextInput type="email" id="email" placeholder="email" defaultValue={currentUser.email} onChange={handleChange} />
                </div>
                <div className="md:w-[33%]">
                    <TextInput type="password" id="password" placeholder="Password" onChange={handleChange} />
                </div>
                {imageFileUploadError && (
                    <div className="text-red-600 text-center">
                        {imageFileUploadError}
                    </div>
                )}
                <Button type="submit" gradientDuoTone='purpleToBlue' outline>
                    Update
                </Button>
                {
                    updateUserSuccess && <Alert color='success' className="my-3">{updateUserSuccess}</Alert>
                }
                {
                    updateUserError && <Alert color='failure' className="my-3">{updateUserError}</Alert>
                }
                <div className="text-red-700 flex justify-between md:w-[33%]">
                    <span className="cursor-pointer">Delete Account</span>
                    <span className="cursor-pointer">Sign Out</span>
                </div>
            </form>
        </div>
    );
}

export default DashProfile;
