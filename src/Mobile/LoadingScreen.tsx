import { LoadingOverlay } from "@mantine/core";
import { useState } from "react";

const LoadingScreen = () => {
  const [chatsLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);
  return (
    <LoadingOverlay
      visible={chatsLoading}
      overlayColor="#111418"
      loaderProps={{ size: "xl", color: "green", variant: "bars" }}
      overlayOpacity={1}
      transitionDuration={500}
    />
  );
};
export default LoadingScreen;
