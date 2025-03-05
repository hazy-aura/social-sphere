import React from 'react';

const Ad = ({size}:{size:"sm"| "md"| "lg"}) => {
    return (
        <div className='p-4 bg-white rounded-lg shadow-md text-sm'>
            <h1>Ad Component</h1>
            <p>This is an advertisement.</p>
        </div>
    );
};

export default Ad;