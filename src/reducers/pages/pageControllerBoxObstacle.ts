import { pageCommonStateSliceFactory } from "./pageCommonSliceFactory";

const pageControllerBoxObstacle = pageCommonStateSliceFactory("AdvancedController");

export { pageControllerBoxObstacle };
export const { updateSandbox } = pageControllerBoxObstacle.actions;
export default pageControllerBoxObstacle.reducer;
