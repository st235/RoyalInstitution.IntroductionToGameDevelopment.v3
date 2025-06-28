import rawPages from "../assets/pages.json";

import type { PageStatic, PageWithExercise, PageState } from "../types/Page";

import { ReadFromLocalStorage, SaveToLocalStorage } from "./LocalStorageUtil";

const pagesLookup: { [id: string]: PageStatic } =
    Object.fromEntries(
        rawPages.pages.map(page => {
            return {
                id: page.id,
                ordinal: page.ordinal,
                title: page.title,
                description: page.description,
                shoudOpen: page.shouldOpen ?? [],
                sandboxPlaceholder: page.sandboxPlaceholder,
            };
        })
        .map(page => [page.id, page])
    );

function LoadPagesWithExercises(): PageWithExercise[] {
    const completedExerciseIds = new Set<string>(
        ReadFromLocalStorage<string[]>("completed-exercises-list")
    );
    const openedExerciseIds = new Set<string>(
        rawPages.openByDefault as string[]
    );

    for (const completedId of completedExerciseIds) {
        const openedIds = pagesLookup[completedId].shoudOpen;
        for (const openedId of openedIds) {
            openedExerciseIds.add(openedId);
        }
    }

    return Object.values(pagesLookup).map(exercise => {
        const isCompleted: boolean = completedExerciseIds.has(exercise.id);
        const isOpened: boolean = openedExerciseIds.has(exercise.id);

        let state: PageState = "locked";
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

export { LoadPagesWithExercises as LoadExercisesList, SaveExerciseCompletion, LoadExerciseSandboxContent, SaveExerciseSandboxContent };

