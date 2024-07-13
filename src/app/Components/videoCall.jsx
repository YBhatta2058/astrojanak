import React, { useEffect, useRef } from 'react';

const VideoCall = () => {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const peerConnection = useRef(null);
    const signalingSocket = useRef(new WebSocket('ws://localhost:8080'));

    useEffect(() => {
        signalingSocket.current.onmessage = async (event) => {
            const message = JSON.parse(event.data);
            if (message.offer) {
                await handleOffer(message.offer);
            } else if (message.answer) {
                await handleAnswer(message.answer);
            } else if (message.iceCandidate) {
                await handleIceCandidate(message.iceCandidate);
            }
        };

        navigator.mediaDevices.enumerateDevices()
    .then(devices => {
        devices.forEach(device => {
            console.log(`${device.kind}: ${device.label} id ${device.deviceId}`);
        });
    })
    .catch(err => {
        console.error('Error accessing devices:', err);
    });

        const startVideoCall = async () => {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            localVideoRef.current.srcObject = stream;

            peerConnection.current = new RTCPeerConnection();
            stream.getTracks().forEach((track) => peerConnection.current.addTrack(track, stream));

            peerConnection.current.onicecandidate = (event) => {
                if (event.candidate) {
                    signalingSocket.current.send(JSON.stringify({ iceCandidate: event.candidate }));
                }
            };

            peerConnection.current.ontrack = (event) => {
                remoteVideoRef.current.srcObject = event.streams[0];
            };
        };

        startVideoCall();
    }, []);

    const handleOffer = async (offer) => {
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);
        signalingSocket.current.send(JSON.stringify({ answer }));
    };

    const handleAnswer = async (answer) => {
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
    };

    const handleIceCandidate = async (candidate) => {
        await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
    };

    return (
        <div>
            <video className = "h-[100vh] w-[100vw]" ref={localVideoRef} autoPlay muted />
            <video className = "h-[100vh] w-[100vw]" ref={remoteVideoRef} autoPlay />
        </div>
    );
};

export default VideoCall;
