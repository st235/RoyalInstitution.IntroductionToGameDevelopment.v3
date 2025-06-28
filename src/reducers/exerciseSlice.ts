import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { PageWithExercise } from "../types/Page";

import { LoadExercisesList, SaveExerciseCompletion } from "../utils/PageUtil";

interface ExerciseState {
    exercises: { [id: string] : PageWithExercise },
};

const initialState: ExerciseState = {
    exercises: Object.fromEntries(LoadExercisesList().map(e => [e.id, e])),
};

const exerciseSlice = createSlice({
    name: "exercise",
    initialState,
    reducers: {
        completeExercise: (state, action: PayloadAction<string>) => {
            state.exercises[action.payload].state = "completed";
            SaveExerciseCompletion(action.payload);
        },
    },
});

export { exerciseSlice };
export const { completeExercise } = exerciseSlice.actions;
export default exerciseSlice.reducer;
