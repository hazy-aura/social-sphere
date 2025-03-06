import Image from 'next/image';
import React from 'react';

const Ad = ({size}:{size:"sm"| "md"| "lg"}) => {
    return (
        <div className='p-4 bg-white rounded-lg shadow-md text-sm'>
            {/* TOP */}
            <div className='flex items-center justify-between text-gray-500 font-medium'>
                <span> Sponsored Ad</span>
                <Image src="/more.png" alt='' height={16} width={16}/>
            </div>

            {/* Bottom */}
            <div></div>
        </div>
    );
};

export default Ad;