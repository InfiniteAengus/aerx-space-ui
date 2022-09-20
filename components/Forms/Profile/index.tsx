import React, { useState } from 'react';
import { Textarea } from '@chakra-ui/react';
import Image from 'next/image';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { pinToPinata } from '../../../lib/pinata';
import { IPFSDataType } from '../../../hooks/usePinata';
const shajs = require('sha.js');
import { nearStore } from '../../../store/near';
import { ProfileType } from '../../../types/stores';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const ThreeDModel = dynamic(() => import('../../3DModel'), { ssr: false });

const ProfileSettingForm: React.FC = () => {
  const router = useRouter();
  const {
    query: { avatarUrl },
  } = router;
  console.log('query', avatarUrl);
  const [file, setFile] = useState<File>();
  const [filePreview, setFilePreview] = useState<string>();
  const [ipfsData, setIpfsData] = useState<IPFSDataType>({
    fileUrl: null,
    fileSize: null,
    urlSha256: null,
  });
  const [creating, setCreating] = useState<boolean>(false);
  const nearState = nearStore((state) => state);
  const [showTriggers, setShowTriggers] = useState<boolean>(false);
  const initialValues = {
    name: '',
    userName: '',
    bio: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    userName: Yup.string().required('User name is required'),
    bio: Yup.string().required('Bio is required'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const { touched, values, getFieldProps, isValid, errors } = formik;

  const handleSubmit = async () => {
    if(creating) return;
    if(!file && !avatarUrl) return toast.error("Please select a profile image or use 3d avatar")
    setCreating(true);
    console.log('File: ', file);
    console.log('Username: ', formik.values.userName);
    let fileUrl:string = "";
    let fileUrlHash:string = "";
    if(!avatarUrl){
      let returnedIpfsData = await pinToPinata(
        file,
        'PROFILE',
        formik.values.userName
        );
        fileUrl = `${process.env.NEXT_PUBLIC_IPFS_BASE_URL}/${returnedIpfsData.IpfsHash}`;
        console.log('File url: ', fileUrl);
        const fileSize = returnedIpfsData.PinSize;
        console.log('File size: ', fileSize);
        fileUrlHash = new shajs.sha256().update(fileUrl).digest('base64');
        console.log('Encrypted url: ', fileUrlHash);
        //is the set state really needed?
    setIpfsData((prevIpfs) => ({
      ...prevIpfs,
      fileUrl: fileUrl,
      fileSize: fileSize,
      urlSha256: fileUrlHash,
    }));
  }
    const profileToMint = {
      title: 'AERX ProfileNFT for ' + formik.values.userName,
      username: formik.values.userName,
      description: formik.values.bio,
      media: avatarUrl ? avatarUrl : fileUrl,
      media_hash: fileUrlHash,
      issued_at: new Date().toISOString(),
      extra: formik.values.name,
      //Todo: confirm if there will be extra from project management
    };
    // console.log('Profile to mint: ', profileToMint);
    // console.log('Ipfs data: ', returnedIpfsData);

    try {
      await nearState.pnftContract
        ?.mint_profile(
          {
            user_id: nearState.accountId,
            username: profileToMint.username,
            token_metadata: profileToMint,
          },
          '300000000000000',
          '1300000000000000000000'
        )
        .then((res) => {
          toast.success(
            `AERX profileNFT minted Successfully with username: '${profileToMint.username}'`
          );
          const returnedProfile: any = {
            user_id: res.owner_id,
            username: res.token_id,
            fullName: formik.values.name,
            aboutMe: formik.values.bio,
            profileImg: res.metadata.media,
          };
          nearState.setProfile(returnedProfile);
          console.log('Profile: ', returnedProfile);
          window.location.replace(`${window.location.origin}/flow`);
        });
    } catch (error) {
      toast.error(`Unable to mint AERX profileNFT. Try again later`);
      console.error('Unable to mint AERX profileNFT: ', error);
    }
  };

  const uploadPhoto = () => {
    (document.getElementsByClassName('upload-photo')[0] as any).click();
  };

  function fileChange(event: any) {
    // alert("file changed")
    const file = event.target.files[0];
    if (file) {
      const filename = file?.name;
      var parts = filename.split('.');
      const fileType = parts[parts.length - 1];
      // setBody((prevBody: any) => {
      //     return {
      //         ...prevBody,
      //         media_extension: fileType,
      //     };
      // });
      setFilePreview(URL.createObjectURL(file));
      setFile(file);
      toast.success('Image selected');
    }
  }

  return (
    <div className="px-6">
      <Toaster />
      <div className="mt-4 flex w-ful gap-6">
        <div className=' relative'>
        <div
          className="h-[400px] w-[230px] bg-[#0000004d] p-2"
          style={{
            background: `${(!avatarUrl)
                ? 'url("/assets/images/profile-avatar-cover.svg")'
                : 'linear-gradient(180deg, #6054F0 0%, #332B8D 100%)'
              }`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            borderRadius: '20px',
            backgroundBlendMode: 'overlay',
          }}
        >
          {!avatarUrl && (
            <div className="flex flex-col justify-between h-[50%] text-sm pt-4">
              <div className="flex justify-around">
                <label className="text-white">Avatar</label>
              </div>

              <div
                className="w-full  flex flex-col justify-around cursor-pointer upload-trigger"
                onClick={uploadPhoto}
                onMouseEnter={() => setShowTriggers(true)}
                style={{
                  zIndex: showTriggers ? 5 : 1,
                }}
              >
                <Image
                  src="/assets/icons/upload-icon.svg"
                  alt="profile-avatar"
                  width={40}
                  height={40}
                  className="cursor-pointer"
                />
                <label className="text-white text-center cursor-pointer">
                  Upload
                </label>
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={fileChange}
                  className="upload-photo"
                />
              </div>

             

              <div
                className="w-full  flex flex-col justify-around cursor-pointer upload-trigger"
                onMouseEnter={() => setShowTriggers(true)}
                onClick={() => router.push('/create-avatar')}
                style={{
                  zIndex: showTriggers ? 5 : 1,
                }}
              >
                <Image
                  src="/assets/icons/3d-account-icon.svg"
                  alt="profile-avatar"
                  width={40}
                  height={40}
                />
                <label className="text-white text-center">3D avatar</label>
              </div>
            </div>
          )}

          <div style={{ width: '100%', height: '100%', margin: 'auto' }}>
            {avatarUrl && (
              <ThreeDModel
                src={Array.isArray(avatarUrl) ? avatarUrl[0] : avatarUrl}
              />
            )}
          </div>
          </div>


          {/* display the file preview  */}
          <div className='absolute top-0'
          style={{
            zIndex: 3,
          }} 
          onMouseEnter={() => setShowTriggers(true)}
          onMouseLeave={() => setShowTriggers(false)}
          >
          {filePreview && 
                <div>
                   <Image src={filePreview  as string} 
                   alt="profile-avatar" width={230} height={400} 
                   className="rounded-2xl" 
                   />
                </div>
              }
          </div>


        </div>
        <div className="w-[55%] ">
          <input
            type="text"
            placeholder="Full name"
            className="w-full text-sm  py-3 px-4 focus:outline-none bg-black rounded-md text-white"
            {...getFieldProps('name')}
            name="name"
            style={touched.name && errors.name ? { borderColor: 'red' } : {}}
          />
          <>
            {touched.name && errors.name && (
              <label className="text-red-500 text-sm">{errors?.name}</label>
            )}
          </>
          <input
            type="text"
            placeholder="Username"
            className="mt-[1em] w-full text-sm  py-3 px-4 focus:outline-none bg-black rounded-md text-white"
            {...getFieldProps('userName')}
            name="userName"
            style={
              touched.userName && errors.userName ? { borderColor: 'red' } : {}
            }
          />
          <>
            {touched.userName && errors.userName && (
              <label className="text-red-500 text-sm">{errors?.userName}</label>
            )}
          </>

          <Textarea
            placeholder="About"
            style={{
              border: 0,
              backgroundColor: 'black',
              marginTop: '1em',
              fontSize: '14px',
              color: 'white',
              resize: 'none',
            }}
            rows={14}
            {...getFieldProps('bio')}
            className={touched.bio && errors.bio ? 'border-red-500' : ''}
            name="bio"
          />
          <>
            {touched.bio && errors.bio && (
              <label className="text-red-500 text-sm">{errors?.bio}</label>
            )}
          </>
        </div>
      </div>
      <div className="w-full flex justify-around mt-4">
        <button
          disabled={
            (!isValid ||
              !touched.name ||
              !touched.userName ||
              !touched.bio 
              // ||(file && filePreview)
            )
              ? true
              : false
          }
          onClick={handleSubmit}
          className="text-white bg-purple p-2 rounded-[10px] w-[200px]"
          style={
            !isValid ||
              !touched.name ||
              !touched.userName ||
              !touched.bio 
              // ||  (file && avatarUrl)
              ? { opacity: 0.5 }
              : { opacity: 1 }
          }
        >
          {creating ? "Creating..." : "Create"}
        </button>
      </div>
    </div>
  );
};

export default ProfileSettingForm;
