import { configureStore } from "@reduxjs/toolkit";

import exerciseReducer from "../reducers/exerciseSlice";
import pageGameAndLearnReducer from "../reducers/pages/pageGameAndLearnSlice";
import pageDesignObstacles from "../reducers/pages/pageDesignObstacles";

export const store = configureStore({
    reducer: {
        exercise: exerciseReducer,
        pageGameAndLearn: pageGameAndLearnReducer,
        pageDesignObstacles: pageDesignObstacles,
    },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
