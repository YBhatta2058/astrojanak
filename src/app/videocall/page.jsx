// "use client";
// import React, { useEffect, useState } from 'react';
// import AgoraRTC from 'agora-rtc-sdk-ng';
// import axios from 'axios';
// import { useAuth } from '../hooks/useAuth';
// import VideoTrack from '../Components/VideoTrack';
// import Navbar from '../Components/Navbar';

// const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

// const VideoCall = () => {
//   const [inCall, setInCall] = useState(false);
//   const [canCall, setCanCall] = useState(false);
//   const [localVideoTrack, setLocalVideoTrack] = useState(null);
//   const [remoteVideoTrack, setRemoteVideoTrack] = useState(null);
//   const { user } = useAuth();
//   const APP_ID = "29d406ccb09b4d5bbc5d5ab59b1945e1";
//   const CHANNEL = "test";
//   const TOKEN_ENDPOINT = "/api/agora/generateToken";
//   const APPOINTMENT_CHECK_ENDPOINT = "/api/appointments/checkAppointment";

//   const checkAppointment = async () => {
//     try {
//       const response = await axios.get(APPOINTMENT_CHECK_ENDPOINT, {
//         params: {
//           userId: user._id,
//         },
//       });
//       if (response.data.canCall) {
//         setCanCall(true);
//       } else {
//         setCanCall(false);
//         alert('You cannot start a call at this time.');
//       }
//     } catch (error) {
//       console.error('Error checking appointment:', error);
//       setCanCall(false);
//     }
//   };

//   const joinChannel = async () => {
//     const uid = Math.floor(Math.random() * 10000);

//     const response = await fetch(TOKEN_ENDPOINT, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ channelName: CHANNEL, uid, role: "publisher" }),
//     });
//     const data = await response.json();
//     const token = data.token;

//     await client.join(APP_ID, CHANNEL, token, uid);

//     const [localAudioTrack, localVideoTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
//     setLocalVideoTrack(localVideoTrack);

//     await client.publish([localAudioTrack, localVideoTrack]);

//     client.on("user-published", async (user, mediaType) => {
//       await client.subscribe(user, mediaType);
//       if (mediaType === "video") {
//         setRemoteVideoTrack(user.videoTrack);
//       }
//       if (mediaType === "audio") {
//         user.audioTrack.play();
//       }
//     });

//     client.on("user-unpublished", (user) => {
//       if (user.videoTrack) {
//         setRemoteVideoTrack(null);
//       }
//     });

//     setInCall(true);
//   };

//   const leaveChannel = async () => {
//     if (localVideoTrack) {
//       localVideoTrack.stop();
//       localVideoTrack.close();
//     }
//     await client.leave();
//     setInCall(false);
//     setLocalVideoTrack(null);
//     setRemoteVideoTrack(null);
//   };

//   useEffect(() => {
//     checkAppointment();
//   }, []);

//   return (
//     <>
//       <Navbar />
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//       <h1 className="mb-4 text-2xl font-bold text-gray-800">Video Call</h1>
//       <div className="relative w-4/5 max-w-5xl bg-black rounded-lg overflow-hidden">
//         {remoteVideoTrack ? (
//           <VideoTrack track={remoteVideoTrack} isLocal={false} />
//         ) : (
//           <div className="w-full h-96 bg-gray-800 flex items-center justify-center text-white">Waiting for remote video...</div>
//         )}
//         {localVideoTrack && <VideoTrack track={localVideoTrack} isLocal={true} />}
//       </div>
//       {!inCall ? (
//         canCall ? (
//           <button onClick={joinChannel} className="mt-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Join Call</button>
//         ) : (
//           <button disabled className="mt-4 px-4 py-2 text-white bg-gray-500 rounded">Cannot Join Call</button>
//         )
//       ) : (
//         <button onClick={leaveChannel} className="mt-4 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600">Leave Call</button>
//       )}
//     </div>
//     </>
//   );
// };

// export default VideoCall;


"use client";
import React, { useEffect, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import VideoTrack from '../Components/VideoTrack';
import Navbar from '../Components/Navbar';

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

const VideoCall = () => {
  const [inCall, setInCall] = useState(false);
  const [canCall, setCanCall] = useState(false);
  const [localVideoTrack, setLocalVideoTrack] = useState(null);
  const [remoteVideoTrack, setRemoteVideoTrack] = useState(null);
  const { user } = useAuth();  // Get the client user info
  const APP_ID = "29d406ccb09b4d5bbc5d5ab59b1945e1";
  const CHANNEL = "test";
  const TOKEN_ENDPOINT = "/api/agora/generateToken";
  const APPOINTMENT_CHECK_ENDPOINT = "/api/appointments/checkAppointment";

  const checkAppointment = async () => {
    try {
      const response = await axios.get(APPOINTMENT_CHECK_ENDPOINT, {
        params: {
          userId: user._id,
        },
      });
      if (response.data.canCall) {
        setCanCall(true);
      } else {
        setCanCall(false);
        alert('You cannot start a call at this time.');
      }
    } catch (error) {
      console.error('Error checking appointment:', error);
      setCanCall(false);
    }
  };

  const joinChannel = async () => {
    const uid = Math.floor(Math.random() * 10000);

    const response = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ channelName: CHANNEL, uid, role: "publisher" }),
    });
    const data = await response.json();
    const token = data.token;

    await client.join(APP_ID, CHANNEL, token, uid);

    const [localAudioTrack, localVideoTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
    setLocalVideoTrack(localVideoTrack);

    await client.publish([localAudioTrack, localVideoTrack]);

    client.on("user-published", async (user, mediaType) => {
      await client.subscribe(user, mediaType);
      if (mediaType === "video") {
        setRemoteVideoTrack(user.videoTrack);
      }
      if (mediaType === "audio") {
        user.audioTrack.play();
      }
    });

    client.on("user-unpublished", (user) => {
      if (user.videoTrack) {
        setRemoteVideoTrack(null);
      }
    });

    setInCall(true);
  };

  const leaveChannel = async () => {
    if (localVideoTrack) {
      localVideoTrack.stop();
      localVideoTrack.close();
    }
    await client.leave();
    setInCall(false);
    setLocalVideoTrack(null);
    setRemoteVideoTrack(null);
  };

  useEffect(() => {
    checkAppointment();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">Video Call</h1>
        <div className="relative w-4/5 max-w-5xl bg-black rounded-lg overflow-hidden">
          {remoteVideoTrack ? (
            <div className="relative w-full h-96">
              <VideoTrack track={remoteVideoTrack} isLocal={false} />
              <div className="absolute bottom-2 left-2 text-white bg-black px-2 py-1 rounded">
                {`Client: ${user.name}`}
              </div>
            </div>
          ) : (
            <div className="w-full h-96 bg-gray-800 flex items-center justify-center text-white">Waiting for remote video...</div>
          )}
          {localVideoTrack && <VideoTrack track={localVideoTrack} isLocal={true} />}
        </div>
        {!inCall ? (
          canCall ? (
            <button onClick={joinChannel} className="mt-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Join Call</button>
          ) : (
            <button disabled className="mt-4 px-4 py-2 text-white bg-gray-500 rounded">Cannot Join Call</button>
          )
        ) : (
          <button onClick={leaveChannel} className="mt-4 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600">Leave Call</button>
        )}
      </div>
    </>
  );
};

export default VideoCall;