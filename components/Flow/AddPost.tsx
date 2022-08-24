import { Textarea } from '@chakra-ui/react';
import Image from 'next/image';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { pinToPinata } from '../../lib/pinata';
import { nearStore } from '../../store/near';
const shajs = require('sha.js');

interface IProps {
    onClose: () => void;
}


const CreatePostForm: React.FC = () => {
    const [filePreview, setFilePreview] = useState<string>();
    const nearState = nearStore((state) => state);
    //Todo: handle together with
    const handlePost = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log("Post button clicked")
        console.log("Post details before removing: ", nearState.postDetails)
        let postToMint;
        if (nearState.postDetails.title == "") {
            postToMint = {
                title: `AERX-postNFT for ${nearState.profile.username}`,
                description: nearState.postDetails.body,
                media: nearState.postDetails.media,
                media_hash: nearState.postDetails.mediaHash,
                issued_at: new Date().toISOString(),
                //extra will be used to handle the toghether with on the create post
            }
        } else {
            postToMint = {
                title: nearState.postDetails.title,
                description: nearState.postDetails.body,
                media: nearState.postDetails.media,
                media_hash: nearState.postDetails.mediaHash,
                issued_at: new Date().toISOString(),
                //extra will be used to handle the toghether with on the create post
            }
        }
        try {
            console.log("Post to mint: ", postToMint)
            await nearState.pnftContract?.mint_post({
                user_id: nearState.accountId,
                origin_post_id: 0,
                token_metadata: postToMint
            },
                "300000000000000"
            ).then((res) => {
                toast.success(`Your AERX-postNFT has been minted succesfully`)
                console.log("Minted post: ", res)
                //save post

            })
        } catch (err) {
            toast.error("Unable to mint AERX-postNFT. Try again later")
            console.error("Unable to mint AERX postNFT: ", err)

        }
        nearState.removepostDetails()
    }

    const updateTitle = (e: any) => {
        const val = e.currentTarget.value;
        if (val != "") {
            nearState.postDetails.title = val;
        }

    }

    //Todo: handle file preview
    const updateMedia = async (e: any) => {
        const file = e.target.files[0];
        if (file) {
            toast.success("Image selected")
            const filename = file?.name;
            var parts = filename.split(".");
            const fileType = parts[parts.length - 1];
            setFilePreview(URL.createObjectURL(file));
            await pinToPinata(file, "POST", nearState.profile?.username).then((res: { IpfsHash: any; }) => {
                const fileUrl = `${process.env.NEXT_PUBLIC_IPFS_BASE_URL}/${res.IpfsHash}`
                console.log("File url: ", fileUrl)
                const fileUrlHash = new shajs.sha256().update(fileUrl).digest("base64");
                console.log("Encrypted url: ", fileUrlHash)
                nearState.postDetails.media = fileUrl;
                nearState.postDetails.mediaType = fileType;
                nearState.postDetails.mediaHash = fileUrlHash;
            })
        } else {
            toast.error("No image found")
        }
    }

    const uploadPhoto = () => {
        console.log("Update photo clicked");
        (document.getElementsByClassName('upload-photo')[0] as any).click();
    }

    return (
        <div>
            <h1 className='text-white text-center text-sm' style={{
                fontWeight: 'bolder'
            }}>Create Post</h1>

            <form className='w-full p-2 px-6'>
                <div>
                    <label className='text-white opacity-[20%] text-sm'>Name: </label>
                    <input placeholder='Post title'
                        className='focus:outline-none border-none text-white w-full bg-transparent text-sm mt-4'
                        onChange={updateTitle}
                    />
                    <div className='bg-white opacity-[15%] p-[0.5px] mt-4' />
                </div>

                <div className='mt-4'>
                    <label className='text-white opacity-[20%] text-sm'>Type: </label>

                    <div className='flex flex-wrap gap-3 mt-4'>
                        <div className='bg-[#6154f027] p-2 rounded-full w-[max-content] flex gap-2 px-4'>
                            <Image src="/assets/icons/text-post-icon.svg" alt="comment" width={15} height={15} />
                            <label className='text-purple text-sm'>Post</label>
                        </div>
                        <div className='bg-[#ff76272f] p-2 rounded-full w-[max-content] flex gap-2 px-4'>
                            <Image src="/assets/icons/tempo-post-icon.svg" alt="comment" width={15} height={15} />
                            <label className='text-[#FF7527] text-sm'>Tempo</label>
                        </div>
                        <div className='bg-[#ec52a427] p-2 rounded-full w-[max-content] flex gap-2 px-4'>
                            <Image src="/assets/icons/music-post-icon.svg" alt="comment" width={15} height={15} />
                            <label className='text-[#ec52a4] text-sm'>Music</label>
                        </div>
                    </div>
                    <div className='bg-white opacity-[15%] p-[0.5px] mt-6' />
                </div>

                <div className='mt-4'>
                    <label className='text-white opacity-[20%] text-sm'>Together with: </label>

                    <div className='bg-[#ffffff1a] p-2 mt-4 cursor-pointer rounded-full w-[35px] h-[35px] flex justify-around'>
                        <Image src="/assets/icons/add-post-white-icon.svg"
                            alt="Add post" width={10} height={10}
                            className="cursor-pointer"
                        />
                    </div>
                    <div className='bg-white opacity-[15%] p-[0.5px] mt-6' />
                </div>

                <div className='mt-4'>
                    <label className='text-white opacity-[20%] text-sm'>Add content: </label>

                    <div>
                        <div className='flex gap-8'>
                            <div>
                                <div className='bg-[#ffffff1a] p-[6px] cursor-pointer mt-4 rounded-full w-[35px] h-[35px] flex justify-around'
                                    onClick={uploadPhoto}
                                >
                                    <Image src="/assets/icons/default-image-icon.svg"
                                        alt="Upload image" width={25} height={25}
                                        className="cursor-pointer"

                                    />
                                    <input type="file"
                                        hidden
                                        accept='image/*'
                                        onChange={updateMedia}
                                        className="upload-photo"
                                    />
                                </div>

                                <div className='mt-2 flex justify-around'>
                                    <label className='text-[#ffffff47] text-sm'>Photo</label>
                                </div>
                            </div>

                            <div>
                                <div className='bg-[#ffffff1a] p-[6px] mt-4 cursor-pointer rounded-full w-[35px] h-[35px] flex justify-around'>
                                    <Image src="/assets/icons/camera-icon.svg"
                                        alt="Upload image" width={25} height={25}
                                        className="cursor-pointer"
                                    />
                                </div>
                                <div className='mt-2 flex justify-around'>
                                    <label className='text-[#ffffff47] text-sm'>Video</label>
                                </div>
                            </div>

                            <div>
                                <div className='bg-[#ffffff1a] p-[6px] mt-4 cursor-pointer rounded-full w-[35px] h-[35px] flex justify-around'>
                                    <Image src="/assets/icons/text-icon.svg"
                                        alt="Upload image" width={25} height={25}
                                        className="cursor-pointer"
                                    />
                                </div>
                                <div className='mt-2 flex justify-around'>
                                    <label className='text-[#ffffff47] text-sm'>Text</label>
                                </div>
                            </div>
                        </div>
                        <div className='bg-white opacity-[15%] p-[0.5px] mt-6' />
                    </div>

                    <div className='mt-4'>
                        <div className='flex gap-2 items-center cursor-pointer'>
                            <Image src="/assets/icons/link-icon.svg" alt="Add post" width={20} height={20}
                                className="cursor-pointer"
                            />
                            <label className='text-white text-[11px] cursor-pointer'>Copy Link</label>
                        </div>

                        <div className='flex gap-2 items-center cursor-pointer mt-2'>
                            <Image src="/assets/icons/share-icon.svg" alt="Add post" width={20} height={20}
                                className="cursor-pointer"
                            />
                            <label className='text-white text-[11px] cursor-pointer'>Copy Link</label>
                        </div>
                    </div>

                    <div className='w-full flex justify-around  mt-6'>
                        <button
                            onClick={handlePost}
                            className='p-3 rounded-[10px] text-[#ffffff53]  bg-black-light w-full'
                        >Post
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

const AddPost: React.FC<IProps> = ({ onClose }) => {
    const nearState = nearStore((state) => state);
    const updateBody = (e: any) => {
        const val = e.currentTarget.value;
        if (val != "") {
            nearState.postDetails.body = val;
        }

    }

    return (
        <div className='w-full  h-full flex'>
            <div className='flex justify-between w-full h-full'>
                <div className='h-full w-[50%]'>
                    <div className='h-[50%] flex justify-around bg-black-light' style={{ borderRadius: '10px 10px 0px 0px' }}>
                        <Image src="/assets/icons/default-image-icon.svg"
                            alt="avatar" width={100} height={100}
                        />
                    </div>
                    <div className='h-[50%] p-4'>
                        <textarea
                            className='w-full h-[100%] focus:outline-none bg-transparent text-sm'
                            placeholder='Type something ...'
                            style={{
                                resize: 'none',
                                color: 'white'
                            }}
                            onChange={updateBody}

                        />
                    </div>
                </div>
                <div className='p-2 w-[50%]'>
                    <div className='w-full'>
                        <div className='w-full flex justify-between'>
                            <div />
                            <Image src="/assets/icons/modal-close.svg"
                                alt='close modal' width={20} height={20}
                                className='cursor-pointer'
                                onClick={onClose}
                            />
                        </div>

                        <CreatePostForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPost;