import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

import { LoadExerciseSandboxContent, SaveExerciseSandboxContent, DeleteExerciseSandboxContent } from "../../utils/PageUtil";

interface PageWithSandbox {
    sandbox?: string;
};

const pageCommonStateSliceFactory = (pageId: string) => {
    const initialState: PageWithSandbox = {
        sandbox: LoadExerciseSandboxContent(pageId),
    };

    return createSlice({
        name: `page${pageId}CommonSlice`,
        initialState,
        reducers: {
            updateSandbox: (state, action: PayloadAction<string | undefined>) => {
                const sandboxContent = action.payload;
                if (sandboxContent) {
                    state.sandbox = sandboxContent;
                    SaveExerciseSandboxContent(pageId, sandboxContent);
                } else {
                    state.sandbox = undefined;
                    DeleteExerciseSandboxContent(pageId);
                }
            },
        },
    });
}


export { pageCommonStateSliceFactory };
