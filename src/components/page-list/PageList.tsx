import "./PageList.css";
import IconLock from "../../assets/ic-lock-fill.svg";
import IconCheck from "../../assets/ic-check-circle.svg";

import { type PageWithExercise } from "../../types/Page";
import IconButton from "../icon-button/IconButton";

type PageListProps = {
    selectedPageId?: string;
    pages: PageWithExercise[];
    onPageSelected: (exercise: PageWithExercise) => void;
};

function PageList(props: PageListProps) {
    return (
        <div className="exercise-list">
            {props.pages.map(page => {
                const onClick = () => props.onPageSelected(page);

                let variant = "primary";
                let icon = undefined;

                if (page.state === "completed") {
                    variant = "accent";
                    icon = IconCheck;
                } else if (page.state == "locked") {
                    variant = "secondary";
                    icon = IconLock;
                }

                return <IconButton
                    key={page.id}
                    variant={variant}
                    textSymbol={`${page.ordinal}`}
                    iconOverlay={icon}
                    onClick={onClick}
                    isSelected={props.selectedPageId == page.id}
                />
            })}
        </div>
    );
}

export default PageList;
export type { PageListProps };
