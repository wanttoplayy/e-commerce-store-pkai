import React from 'react';

const VideoPlayer = () => {
    return (
        <div className='flex flex-col items-center gap-4 '>
            <h2>วีดีโอสินค้าของเรา</h2>
            <video controls className='w-[700px]'>
                <source src="@/public/introduce.mp4" type=' mp4' />
            </video>
        </div>
    );
};

export default VideoPlayer;
