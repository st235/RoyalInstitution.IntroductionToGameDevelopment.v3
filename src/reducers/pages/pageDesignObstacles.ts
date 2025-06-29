import { pageCommonStateSliceFactory } from "./pageCommonSliceFactory";

const pageDesignObstacles = pageCommonStateSliceFactory("DesignObstacles");

export { pageDesignObstacles };
export const { updateSandbox } = pageDesignObstacles.actions;
export default pageDesignObstacles.reducer;
