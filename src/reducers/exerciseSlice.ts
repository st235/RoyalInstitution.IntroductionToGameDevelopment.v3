import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { PageWithExercise } from "../types/Page";

import { LoadPagesWithExercises, SaveExerciseCompletion } from "../utils/PageUtil";

interface ExerciseState {
    pages: { [id: string] : PageWithExercise },
};

const initialState: ExerciseState = {
    pages: Object.fromEntries(LoadPagesWithExercises().map(page => [page.id, page])),
};

const exerciseSlice = createSlice({
    name: "exercise",
    initialState,
    reducers: {
        completeExercise: (state, action: PayloadAction<string>) => {
            SaveExerciseCompletion(action.payload);
            state.pages = Object.fromEntries(
                LoadPagesWithExercises().map(page => [page.id, page])
            );
        },
    },
});

export { exerciseSlice };
export const { completeExercise } = exerciseSlice.actions;
export default exerciseSlice.reducer;
