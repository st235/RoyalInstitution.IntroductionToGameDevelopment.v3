type ExerciseState = "locked" | "in-progress" | "completed";

type Exercise = {
    id: string;
    ordinal: number;
    title: string;
    description: string;
    shoudOpen: string[];
};

type ExerciseTask = Exercise & {
    state: ExerciseState;
};

export type { Exercise, ExerciseTask, ExerciseState };
