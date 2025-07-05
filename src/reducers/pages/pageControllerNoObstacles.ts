import { pageCommonStateSliceFactory } from "./pageCommonSliceFactory";

const pageControllerNoObstacles = pageCommonStateSliceFactory("EasyController");

export { pageControllerNoObstacles };
export const { updateSandbox } = pageControllerNoObstacles.actions;
export default pageControllerNoObstacles.reducer;
