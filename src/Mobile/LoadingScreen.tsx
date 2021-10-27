import { LoadingOverlay } from "@mantine/core";

const LoadingScreen = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        zIndex: 100,
      }}
    >
      <LoadingOverlay
        visible={true}
        style={{ backgroundColor: "#000" }}
        overlayOpacity={1}
        loaderProps={{ size: "xl", color: "green", variant: "bars" }}
      />
    </div>
  );
};
export default LoadingScreen;
