import "./ExerciseCard.css";

import DOMPurify from "dompurify";

type ExerciseCardProps = {
    ordinal: number;
    title: string;
    description: string;
};

function ExerciseCard(props: ExerciseCardProps) {
    return (
        <div className="exercise-card">
            <div className="row-title">
                <span className="icon">{props.ordinal}</span>
                <h1 className="title">{props.title}</h1>
            </div>
            <p className="description" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(props.description)}}/>
        </div>
    );
}

export default ExerciseCard;
export type { ExerciseCardProps };
