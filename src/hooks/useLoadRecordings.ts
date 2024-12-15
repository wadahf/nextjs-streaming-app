import { useUser } from "@clerk/nextjs";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

const useLoadRecordings = (call: Call) => {
  const { user } = useUser();
  const [reocrdings, setRecordings] = useState<CallRecording[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    const getRecordings = async () => {
      setIsLoading(true);
      const { recordings } = await call.queryRecordings();

      setRecordings(recordings);
      setIsLoading(false);
    };
    getRecordings();
  }, [call, user?.id]);

  return { isLoading, reocrdings };
};

export default useLoadRecordings;
