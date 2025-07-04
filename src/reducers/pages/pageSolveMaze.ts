import { pageCommonStateSliceFactory } from "./pageCommonSliceFactory";

const pageSolveMaze = pageCommonStateSliceFactory("SolveMaze");

export { pageSolveMaze };
export const { updateSandbox } = pageSolveMaze.actions;
export default pageSolveMaze.reducer;
