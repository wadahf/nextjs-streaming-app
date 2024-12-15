import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export default function useLocalCall(id: string) {
  const [call, setCall] = useState<Call>();
  const [isCallLoading, setIsCallLoading] = useState(true);

  const client = useStreamVideoClient();

  useEffect(() => {
    if (!client) return;

    const loadCall = async () => {
      setIsCallLoading(true);

      const { calls } = await client.queryCalls({
        filter_conditions: { id },
      });

      if (calls.length > 0) {
        const call = calls[0];
        console.log("call before call.get() function: ", call);
        await call.get();
        console.log("call after call.get() function: ", call);
        setCall(call);
      }
      setIsCallLoading(false);
    };
    loadCall();
  }, [client, id]);

  return { call, isCallLoading };
}
