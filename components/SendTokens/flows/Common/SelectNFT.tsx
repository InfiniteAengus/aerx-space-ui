import Image from 'next/image';
import React, { useEffect } from 'react'
import { NFT } from '../../../../types/NFT';
import Button from '../../../Elements/Button';
import StepIndicator from '../../../StepIndicator';
import { nearStore } from "../../../../store/near";

interface IProps {
    setNFTsSelected: (nfts: Array<NFT>) => void,
    setFlow: (flow: number) => void
}

const SelectNFTs: React.FC<IProps> = ({ setNFTsSelected, setFlow }) => {
    const nearState = nearStore((state) => state);

    const [NFTs, setNFTs] = React.useState<Array<NFT>>([]);
    const [selectedNFTS, setSelectedNFTs] = React.useState<Array<number>>([]);
    const selectedNftStyle = {
        border: '3px solid #6054F0',
        borderRadius: '10px',
    }

    const handleSelectNFT = (nftId: number) => {
        if (selectedNFTS.includes(nftId)) {
            setSelectedNFTs(selectedNFTS.filter(id => id !== nftId));
        }
        else {
            setSelectedNFTs([...selectedNFTS, nftId]);
        }
    }

    const initNFTs = async () => {
        await nearState.pnftContract?.nft_tokens_for_owner({
            account_id: nearState.accountId
        }
        ).then((res => {
            setNFTs(res.map(function(nft: any) {
                return {
                    id: nft.token_id,
                    media: nft.metadata.media,
                    name: nft.metadata.title,
                    author_name: nft.owner_id
                }
            }).filter((nft: any) => !(nft.name).includes("ProfileNFT")));
        }))
    }

    useEffect(() => {
        const selectedNfts = NFTs.filter(nft => selectedNFTS.includes(nft.id));
        setNFTsSelected(selectedNfts);
    }, [selectedNFTS])

    useEffect(() => {
        initNFTs()
    }, [])

    return (
        <div className='w-[35vw] p-4'>
            <div className='w-full flex justify-around'>
                <label className='text-white'>Select NFT</label>
            </div>
            <div className='mt-4 h-[40vh] overflow-y-scroll nft-container'>
                <div className='grid grid-cols-3 relative'>
                    {NFTs.map((nft, nftIndex) => (
                        <div key={nftIndex} className='w-[143px] h-[200px] relative mt-3 ' onClick={() => handleSelectNFT(nft.id)}
                            style={(selectedNFTS.includes(nft?.id)) ? selectedNftStyle : {}}
                        >
                            <div className=''>
                                <img src={nft.media} 
                                    className='rounded-[10px] object-contain'
                                />
                            </div>

                            {!selectedNFTS.includes(nft.id) &&
                                <div className='absolute top-[70%] px-4  w-full'>
                                    <div className='flex flex-col text-[11px] backdrop-blur-sm p-2  rounded-[10px] text-center'>
                                        <label className='text-white  ' style={{ fontWeight: 'bolder' }}>{nft.name}</label>
                                        <label className='text-white'>{nft.author_name}</label>
                                    </div>
                                </div>
                            }

                            {selectedNFTS.includes(nft.id) &&
                                <div className='absolute top-0 w-full h-full bg-[#6154f05b] rounded-[10px]'>
                                    <div className='flex justify-around items-center h-full'>
                                        <div className='w-[30px] text-[11px] h-[30px] flex justify-around items-center bg-white text-purple rounded-full'>
                                            {selectedNFTS.findIndex(id => id === nft.id) + 1}
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    ))}
                </div>
            </div>
            <div className='mt-4'>
                <Button
                    onClick={() => setFlow(3)}
                    label={`Confirm: ${selectedNFTS.length} NFT's`}
                />
            </div>
            <div className='flex justify-around w-full mt-4'>
                <div className='flex gap-4'>
                    <StepIndicator bg='purple' />
                    <StepIndicator />
                </div>
            </div>
        </div>
    )
}

export default SelectNFTs;