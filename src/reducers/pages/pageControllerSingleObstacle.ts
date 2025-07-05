import { pageCommonStateSliceFactory } from "./pageCommonSliceFactory";

const pageControllerSingleObstacle = pageCommonStateSliceFactory("AdvancedController");

export { pageControllerSingleObstacle };
export const { updateSandbox } = pageControllerSingleObstacle.actions;
export default pageControllerSingleObstacle.reducer;
