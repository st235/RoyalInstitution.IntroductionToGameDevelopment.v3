import "./TaskList.css";

import Footer from "./Footer";
import Header from "./Header";
import TaskItem from "./TaskItem";

export default function TaskList() {
    return (
        <div className="task-list">
            <Header />
            <div className="list">
                <TaskItem />
            </div>
            <Footer />
        </div>
    );
}
