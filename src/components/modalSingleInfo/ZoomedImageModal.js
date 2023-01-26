import React from 'react'
import { Image } from "@nextui-org/react";
import { UniversalURL } from '../AsyncURL/BaseUrl';
import "./modal.css"

export default function ZoomedImageModal({getImgUrl,setShowZoomedImgModal,showZoomedImgModal}) {

    console.log(getImgUrl);
    return (
        <div className='zoomed_img_wrapper'>
            <button onClick={() => setShowZoomedImgModal(!showZoomedImgModal)} className='close' style={{color:"red", zIndex:"1000000"}}></button>
            <Image
            width={800}
            height={600}
            src={`${UniversalURL}file/file-priview/${getImgUrl}`}
            alt="Default Image"
            objectFit="cover"
                />
        </div>
)
}
