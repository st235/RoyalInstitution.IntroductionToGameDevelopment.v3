import { pageCommonStateSliceFactory } from "./pageCommonSliceFactory";

const pageControllerMultipleObstacles = pageCommonStateSliceFactory("AdvancedController");

export { pageControllerMultipleObstacles };
export const { updateSandbox } = pageControllerMultipleObstacles.actions;
export default pageControllerMultipleObstacles.reducer;
