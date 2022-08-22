import React, { useState } from "react";
import { Textarea } from "@chakra-ui/react";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';


const ProfileSettingForm: React.FC = () => {
    const [file, setFile] = useState<File>();
    const [filePreview, setFilePreview] = useState<string>();

    const initialValues = {
        name: "",
        userName: "",
        bio: ""
    }

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        userName: Yup.string().required("User name is required"),
        bio: Yup.string().required("Bio is required")
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: values => {
            console.log(values)
        }
    });

    const { touched, values, getFieldProps, isValid, errors } = formik;
    let file_url: string = "";//temporary fix to get file url because state return undefined on first attempt
    const handleSubmit = () => {
        // const dataToPost = { ...values, image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" };
        // alert('Data to post: ' + JSON.stringify(dataToPost));
        console.log("File_url: ", file_url)
    }

    const uploadPhoto = () => {
        (document.getElementsByClassName('upload-photo')[0] as any).click();
    }

    function fileChange(event: any) {
        const file = event.target.files[0];
        if (file) {
            const filename = file?.name;
            var parts = filename.split(".");
            const fileType = parts[parts.length - 1];
            // setBody((prevBody: any) => {
            //     return {
            //         ...prevBody,
            //         media_extension: fileType,
            //     };
            // });
            setFilePreview(URL.createObjectURL(file));
            setFile(file)
            toast.success("Image selected")
            file_url = URL.createObjectURL(file);
        }
    }


    return (
        <div className="px-6">
            <Toaster />
            <div className="mt-4 flex w-ful gap-6">
                <div className="h-[400px] w-[230px] bg-[#0000004d] p-2" style={{
                    backgroundImage: `url("/assets/images/profile-avatar-cover.svg")`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    borderRadius: "20px",
                    backgroundBlendMode: "overlay",
                }}>
                    <div className="flex flex-col justify-between h-[70%] text-sm pt-4">
                        <div className="flex justify-around">
                            <label className="text-white">Avatar</label>
                        </div>

                        <div className="w-full  flex flex-col justify-around cursor-pointer" onClick={uploadPhoto}>
                            <Image src="/assets/icons/upload-icon.svg" alt="profile-avatar" width={40} height={40} className="cursor-pointer" />
                            <label className="text-white text-center cursor-pointer">Upload</label>
                            <input type="file"
                                hidden
                                accept='image/*'
                                onChange={fileChange}
                                className="upload-photo"
                            />
                        </div>


                        <div className="w-full  flex flex-col justify-around">
                            <Image src="/assets/icons/3d-account-icon.svg" alt="profile-avatar" width={40} height={40} />
                            <label className="text-white text-center">3D avatar</label>
                        </div>
                    </div>
                </div>
                <div className="w-[55%] ">
                    <input
                        type="text"
                        placeholder="Full name"
                        className="w-full text-sm  py-3 px-4 focus:outline-none bg-black rounded-md text-white"
                        {...getFieldProps("name")}
                        name="name"
                        style={touched.name && errors.name ? { borderColor: "red" } : {}}
                    />
                    <>
                        {touched.name && errors.name && <label className="text-red-500 text-sm">{errors?.name}</label>}
                    </>
                    <input
                        type="text"
                        placeholder="Username"
                        className="mt-[1em] w-full text-sm  py-3 px-4 focus:outline-none bg-black rounded-md text-white"
                        {...getFieldProps("userName")}
                        name="userName"
                        style={touched.userName && errors.userName ? { borderColor: "red" } : {}}
                    />
                    <>
                        {touched.userName && errors.userName && <label className="text-red-500 text-sm">{errors?.userName}</label>}
                    </>

                    <Textarea placeholder="About"
                        style={{
                            border: 0,
                            backgroundColor: 'black',
                            marginTop: '1em',
                            fontSize: '14px',
                            color: 'white',
                            resize: 'none'
                        }}
                        rows={14}
                        {...getFieldProps("bio")}
                        className={touched.bio && errors.bio ? "border-red-500" : ""}
                        name="bio"
                    />
                    <>
                        {touched.bio && errors.bio && <label className="text-red-500 text-sm">{errors?.bio}</label>}
                    </>
                </div>
            </div>
            <div className="w-full flex justify-around mt-4">
                <button
                    disabled={(!isValid
                        || (!touched.name || !touched.userName || !touched.bio)
                        || !file) ? true : false}
                    onClick={handleSubmit}
                    className="text-white bg-purple p-2 rounded-[10px] w-[200px]"
                    style={(!isValid || (!touched.name || !touched.userName || !touched.bio)
                        || !file
                    ) ? { opacity: 0.5 } : { opacity: 1 }}
                >
                    Create
                </button>
            </div>
        </div>
    );
}

export default ProfileSettingForm;
