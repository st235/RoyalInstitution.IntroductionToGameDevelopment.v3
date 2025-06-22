import "./TaskList.css";
import IconController from "../../assets/ic-controller.svg";
import IconLockFill from "../../assets/ic-lock-fill.svg";
import IconCheckLarge from "../../assets/ic-check-lg.svg";

import Footer from "./Footer";
import Header from "./Header";
import TaskItem from "./TaskItem";

export default function TaskList() {
    return (
        <div className="task-list">
            <Header />
            <div className="list">
                <TaskItem title="Hello world" subtitle="This is a very long text, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." icon={IconController} />
                <TaskItem title="Very long title very very long lol blha blha, heheh" subtitle="To unlock this item complete previous excersise" icon={IconController} />
                <TaskItem title="Disabled item" subtitle="To unlock this item complete previous excersise" icon={IconLockFill} />
                <TaskItem title="Completed item" subtitle="Completed item" icon={IconCheckLarge} />
            </div>
            <Footer />
        </div>
    );
}
