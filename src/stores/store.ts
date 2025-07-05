import { configureStore } from "@reduxjs/toolkit";

import exerciseReducer from "../reducers/exerciseSlice";
import pageGameAndLearnReducer from "../reducers/pages/pageGameAndLearnSlice";
import pageDesignObstaclesReducer from "../reducers/pages/pageDesignObstacles";
import pageSolveMazeReducer from "../reducers/pages/pageSolveMaze";
import pageEasyControllerReducer from "../reducers/pages/pageEasyController";

export const store = configureStore({
    reducer: {
        exercise: exerciseReducer,
        pageGameAndLearn: pageGameAndLearnReducer,
        pageDesignObstacles: pageDesignObstaclesReducer,
        pageSolveMaze: pageSolveMazeReducer,
        pageEasyController: pageEasyControllerReducer,
    },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
