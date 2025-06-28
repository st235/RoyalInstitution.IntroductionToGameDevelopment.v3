import RAW_EXERCISES from "../assets/exercises.json";

import type { Exercise, ExerciseTask, ExerciseState } from "../types/Exercise";

import { ReadFromLocalStorage, SaveToLocalStorage } from "./LocalStorageUtil";

const EXERCISES_LOOKUP: { [id: string]: Exercise } =
    Object.fromEntries(
        RAW_EXERCISES.exercises.map(exercise => {
            return {
                id: exercise.id,
                ordinal: exercise.ordinal,
                title: exercise.title,
                description: exercise.description,
                shoudOpen: exercise.shouldOpen ?? [],
            };
        })
        .map(exercise => [exercise.id, exercise])
    );

function LoadExercisesList(): ExerciseTask[] {
    const completedExerciseIds = new Set<string>(
        ReadFromLocalStorage<string[]>("completed-exercises-list")
    );
    const openedExerciseIds = new Set<string>(
        RAW_EXERCISES.openByDefault as string[]
    );

    for (const completedId of completedExerciseIds) {
        const openedIds = EXERCISES_LOOKUP[completedId].shoudOpen;
        for (const openedId of openedIds) {
            openedExerciseIds.add(openedId);
        }
    }

    return Object.values(EXERCISES_LOOKUP).map(exercise => {
        const isCompleted: boolean = completedExerciseIds.has(exercise.id);
        const isOpened: boolean = openedExerciseIds.has(exercise.id);

        let state: ExerciseState = "locked";
        if (isCompleted) {
            state = "completed";
        } else if (isOpened) {
            state = "in-progress";
        }

        return {
            ...exercise,
            state,
        };
    }).sort((one, another) => one.ordinal - another.ordinal);
}

function SaveExerciseCompletion(id: string) {
    const completedExerciseIds = new Set<string>(
        ReadFromLocalStorage<string[]>("completed-exercises-list")
    );
    completedExerciseIds.add(id);
    SaveToLocalStorage("completed-exercises-list", Array.from(completedExerciseIds.values()));
}

function LoadExerciseSandboxContent(id: string): string | undefined {
    return ReadFromLocalStorage<string>(`exercise-sandox-content-${id}`);
}

function SaveExerciseSandboxContent(id: string, content: string): boolean {
    return SaveToLocalStorage<string>(`exercise-sandox-content-${id}`, content);
}

export { LoadExercisesList, SaveExerciseCompletion, LoadExerciseSandboxContent, SaveExerciseSandboxContent };

