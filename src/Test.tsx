import FuzzyText from "./components/ErrorBoundary/404page";

const Test = () => {
    const enableHover = true;
    const hoverIntensity = 0.5;
  return (
    <div className="w-full h-full flex items-center bg-red-500 justify-center">
      <FuzzyText
        baseIntensity={0.2}
        hoverIntensity={hoverIntensity}
        enableHover={enableHover}
        color="black"
      >
        404 <br />
        Not found
      </FuzzyText>
    </div>
  );
};

export default Test;
