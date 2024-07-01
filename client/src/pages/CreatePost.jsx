import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";

export default function CreatePost() {

    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({});

    const handleUploadImage = async () => {
        try {
            if (!file) {
                setImageUploadError('Please select an image')
                return;
            }
            setImageUploadError(null);
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageUploadProgress(progress.toFixed(0));
                },
                (error) => {
                    setImageUploadError(error);
                    setImageUploadProgress(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUploadProgress(null);
                        setImageUploadError(null);
                        setFormData({ ...formData, imageUrl: downloadURL });
                    });
                }
            );
        } catch (error) {
            setImageUploadError(error.message || "Image upload failed");
            setImageUploadProgress(null);
        }
    }

    return (
        <div className="p-3 max-w-3xl mx-auto min-h-screen">
            <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
            <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 sm:flex-row justify-between">
                    <TextInput type="text" placeholder="Title" required id="title" className="flex-1" />
                    <Select>
                        <option value="Uncategorized">Select a category</option>
                        <option value="javascript">Javascript</option>
                        <option value="reactjs">React.js</option>
                        <option value="nextjs">Next.js</option>
                    </Select>
                </div>
                <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
                    <FileInput type='file' accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
                    <Button disabled={imageUploadProgress} type="button" gradientDuoTone="purpleToBlue" size="sm" outline onClick={handleUploadImage}>
                        {
                            imageUploadProgress ? <div className="w-16 h-16"><CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}`} /></div> : "Upload Image"
                        }
                    </Button>
                </div>
                {
                    imageUploadError && (
                        <Alert color='failure'>
                            {imageUploadError}
                        </Alert>
                    )
                }
                {
                    formData.imageUrl && (
                        <img src={formData.imageUrl} alt="Uploaded Image" className="w-full h-72 object-cover"/>
                    )
                }
                <ReactQuill theme="snow" placeholder="Write someting...." className="h-72 mb-12" required />
                <Button type="submit" gradientDuoTone="purpleToPink">
                    Publish
                </Button>
            </form>
        </div>
    )
}
