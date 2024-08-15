import { RtcTokenBuilder, RtcRole } from 'agora-access-token';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { channelName, uid, role, expireTime } = await request.json();

  const appId = process.env.AGORA_APP_ID;
  const appCertificate = process.env.AGORA_APP_CERTIFICATE;
  
  if (!appId || !appCertificate) {
    return NextResponse.json({ error: 'App ID or App Certificate is missing.' }, { status: 500 });
  }

  const expirationTimeInSeconds = expireTime || 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  // Ensure the role is set properly based on the user
  const token = RtcTokenBuilder.buildTokenWithUid(
    appId,
    appCertificate,
    channelName,
    uid,
    role,
    privilegeExpiredTs
  );

  return NextResponse.json({ token });
}
