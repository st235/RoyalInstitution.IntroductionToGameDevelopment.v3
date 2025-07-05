import { configureStore } from "@reduxjs/toolkit";

import exerciseReducer from "../reducers/exerciseSlice";
import pageGameAndLearnReducer from "../reducers/pages/pageGameAndLearnSlice";
import pageDesignObstaclesReducer from "../reducers/pages/pageDesignObstacles";
import pageSolveMazeReducer from "../reducers/pages/pageSolveMaze";
import pageControllerNoObstaclesReducer from "../reducers/pages/pageControllerNoObstacles";
import pageControllerSingleObstacleReducer from "../reducers/pages/pageControllerSingleObstacle";
import pageControllerBoxObstacleReducer from "../reducers/pages/pageControllerBoxObstacle";
import pageControllerMultipleObstaclesReducer from "../reducers/pages/pageControllerMultipleObstacles";

export const store = configureStore({
    reducer: {
        exercise: exerciseReducer,
        pageGameAndLearn: pageGameAndLearnReducer,
        pageDesignObstacles: pageDesignObstaclesReducer,
        pageSolveMaze: pageSolveMazeReducer,
        pageControllerNoObstacles: pageControllerNoObstaclesReducer,
        pageControllerSingleObstacle: pageControllerSingleObstacleReducer,
        pageControllerBoxObstacle: pageControllerBoxObstacleReducer,
        pageControllerMultipleObstacles: pageControllerMultipleObstaclesReducer,
    },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
