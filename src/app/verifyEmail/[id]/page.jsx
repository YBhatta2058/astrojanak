"use client"

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link';

const Page = ({ params }) => {
    const [err, setErr] = useState(false);
    const [verified, setVerified] = useState(false);

    const sendReq = async () => {
        try {
            await axios.post(`http://localhost:3000/api/users/verifyEmail`, {
                token: params.id
            });
            setVerified(true);
            setErr(false);
        } catch (error) {
            setErr(true);
            console.error("Error occurred during request:", error.message);
        }
    };

    useEffect(() => {
        sendReq();
    }, []); 

    return (
        <div>
            {err ? (
                <div>
                    Error while verifying. Click here to resend the verification link.
                </div>
            ) : (
                verified ? (
                    <div>
                        Verified Successfully. Go to <Link href = "http://localhost:3000/login">Go to login</Link>
                    </div>
                ) : (
                    <div>
                        Verifying...
                    </div>
                )
            )}
        </div>
    );
};

export default Page;
