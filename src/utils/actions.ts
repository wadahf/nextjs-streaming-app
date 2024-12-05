"use server";
import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

export const getToken = async (): Promise<string> => {
  const streamApiKey = process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY;
  const streamApiSecret = process.env.STREAM_VIDEO_API_SECRET;

  if (!streamApiKey || !streamApiSecret) {
    throw new Error("Stream API key or secret is not set");
  }

  const user = await currentUser();

  console.log("Generating token for user: ", user?.id);

  if (!user) {
    throw new Error("User not authenticated");
  }

  const streamClient = new StreamClient(streamApiKey, streamApiSecret);

  const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60;
  const issuedAt = Math.floor(Date.now() / 1000) - 60;
  const token = streamClient.generateUserToken({
    user_id: user.id,
    exp: expirationTime,
    iat: issuedAt,
  });

  console.log("Successfully generated Token", token);

  return token;
};
