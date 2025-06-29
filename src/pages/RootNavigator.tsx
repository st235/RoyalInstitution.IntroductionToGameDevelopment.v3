import "./RootNavigator.css";

import type { PageWithExercise } from "../types/Page";

import { useState } from "react";
import { useAppSelector } from "../hooks/redux";

import SidebarLayout from "../components/sidebar-layout/SideBarLayout";
import NavigationRail from "../components/navigation-rail/NavigationRail";
import Logo from "../components/logo/Logo";
import InfoFooter from "../components/info-footer/InfoFooter";
import PageList from "../components/page-list/PageList";

import Overlay from "./overlay/Overlay";
import PageExercise0 from "./exercises/PageExercise0";
import PageExercise1 from "./exercises/PageExercise1";

type SidebarRailProps = {
  selectedPageId: string;
  exercises: PageWithExercise[];
  onExerciseSelected: (exercise: PageWithExercise) => void;
};

function SidebarRail(props: SidebarRailProps) {
  return (
    <NavigationRail
      header={<Logo />}
      footer={<InfoFooter />}>
        <PageList
          selectedPageId={props.selectedPageId}
          pages={props.exercises}
          onPageSelected={props.onExerciseSelected}/>
    </NavigationRail>
  );
}

function RootNavigator() {
  const exercises = useAppSelector(state => state.exercise.pages);
  const [selectedExerciseTaskId, setSelectedExerciseTaskId] = useState<string>("1");

  function onExerciseSelected(e: PageWithExercise) {
    if (e.state == "locked" || e.id == selectedExerciseTaskId) {
      return;
    }

    setSelectedExerciseTaskId(e.id);
  }

  return (
    <div id="root-navigator">
      <Overlay />
      <SidebarLayout
        sidebar={
          <SidebarRail
            selectedPageId={selectedExerciseTaskId}
            exercises={Object.values(exercises)}
            onExerciseSelected={onExerciseSelected} />
        }
      >
        {selectedExerciseTaskId === "1" && <PageExercise0 page={exercises[selectedExerciseTaskId]} />}
        {selectedExerciseTaskId === "2" && <PageExercise1 page={exercises[selectedExerciseTaskId]} />}
      </SidebarLayout>
    </div>
  )
}

export default RootNavigator;
