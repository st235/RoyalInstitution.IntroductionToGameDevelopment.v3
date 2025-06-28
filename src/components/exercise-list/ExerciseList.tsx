import "./ExerciseList.css";
import IconLock from "../../assets/ic-lock-fill.svg";
import IconCheckLg from "../../assets/ic-check-lg.svg";

import { type ExerciseTask } from "../../types/Exercise";
import IconButton from "../icon-button/IconButton";

type ExerciseListProps = {
    exercises: ExerciseTask[];
    onExerciseSelected: (exercise: ExerciseTask) => void;
};

function ExerciseList(props: ExerciseListProps) {
    return (
        <div className="exercise-list">
            {props.exercises.map(exercise => {
                const onClick = () => props.onExerciseSelected(exercise);

                if (exercise.state === "in-progress") {
                    return <IconButton key={exercise.id} variant="primary" textIcon={`${exercise.ordinal}`} onClick={onClick} />
                } else if (exercise.state === "completed") {
                    return <IconButton key={exercise.id} variant="primary" imageIcon={IconCheckLg} onClick={onClick} />
                } else { // Locked.
                    return <IconButton key={exercise.id} variant="primary" imageIcon={IconLock} onClick={onClick} />
                }
            })}
        </div>
    );
}

export default ExerciseList;
export type { ExerciseListProps };
