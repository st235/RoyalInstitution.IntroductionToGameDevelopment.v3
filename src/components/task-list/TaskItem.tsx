import "./TaskItem.css";

type TaskItemProps = {
    expanded?: boolean;
    completed?: boolean;
    enabled?: boolean;
    title: string;
    subtitle: string;
    icon: string;
};

function TaskItem(props: TaskItemProps) {
    return (
        <div className="item">
            <div className="icon">
                <img src={props.icon} />
            </div>
            <div className="text">
                <span className="title">{props.title}</span>
                <span className="subtitle">{props.subtitle}</span>
            </div>
        </div>
    );
}

export default TaskItem;
export type { TaskItemProps };
