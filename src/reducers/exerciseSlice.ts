import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { ExerciseTask } from "../types/Exercise";

import { LoadExercisesList, SaveExerciseCompletion } from "../utils/ExerciseUtil";

interface ExerciseState {
    exercises: { [id: string] : ExerciseTask },
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
