import { pageCommonStateSliceFactory } from "./pageCommonSliceFactory";

const pageGameAndLearnSlice = pageCommonStateSliceFactory("GameAndLearn");

export { pageGameAndLearnSlice };
export const { updateSandbox } = pageGameAndLearnSlice.actions;
export default pageGameAndLearnSlice.reducer;
