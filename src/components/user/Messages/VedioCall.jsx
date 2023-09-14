import React from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
const VedioCall = () => {
  let roomID = 'swalih room'
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const userIds = searchParams.get('ids')
  console.log(userIds);
  const {Token,id} = useSelector((state)=>state.Client)
  const myMeeting = async (element)=>{
    roomID = roomID.replace(/\s+/g, '');
    console.log(roomID,'jdfajklfjk');
    const appID = 655253335 ;
    const serverSecret = "b88a13c7040e5fc44ed7d2b8e83febd3";
    const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  Date.now().toString(),  Date.now().toString());


   // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Personal link',
          url:
           window.location.protocol + '//' + 
           window.location.host + window.location.pathname +
            '?roomID=' +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
      },
    });


};

return (
  <div
    className="myCallContainer"
    ref={myMeeting}
    style={{ width: '100vw', height: '100vh' }}
  ></div>
);
}
  



export default VedioCall
