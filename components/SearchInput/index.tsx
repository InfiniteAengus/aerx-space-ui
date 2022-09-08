import Image from 'next/image';
import React from 'react';

export interface Props {
    width?:string,
    backgroundColor?:string,
    placeholder?: string,
    onChange?: (value:string) => void,
}
const SearchInput: React.FC<Props> = ({backgroundColor='bg-[#2b2b2b]', width='200px', placeholder="Search user", onChange }) => {
    return (
        <div className={`${backgroundColor} px-3 py-2 rounded-md flex items-center  gap-2 w-[${width}]`}>
            <div className='mt-1'>
            <Image src={'/assets/icons/search-input-icon.svg'}  width={15} height={15} alt="Search" />
            </div>
            <div>
              <input type="text" 
              placeholder={placeholder} className='text-white bg-transparent text-sm focus:outline-none' style={{}}
              onChange={(e) => onChange && onChange(e.target.value)}
              />
            </div>
        </div>
    )
}
export default SearchInput;