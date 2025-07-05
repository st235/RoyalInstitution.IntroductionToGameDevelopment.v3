import { pageCommonStateSliceFactory } from "./pageCommonSliceFactory";

const pageEasyController = pageCommonStateSliceFactory("EasyController");

export { pageEasyController };
export const { updateSandbox } = pageEasyController.actions;
export default pageEasyController.reducer;
