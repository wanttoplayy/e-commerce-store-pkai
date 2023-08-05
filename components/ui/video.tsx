import React from "react";

const VideoPlayer = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <h2>วีดีโอสินค้าของเรา</h2>

      {/* Replace <video> with YouTube iframe */}
      <iframe
        width="700"
        height="394"
        src="https://www.youtube.com/embed/alE3S1nTCIc"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
