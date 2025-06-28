import "./RootNavigator.css";

import type { PageWithExercise } from "../types/Page";

import { useState } from "react";
import { useAppSelector } from "../hooks/redux";

import SidebarLayout from "../components/sidebar-layout/SideBarLayout";
import NavigationRail from "../components/navigation-rail/NavigationRail";
import Logo from "../components/logo/Logo";
import InfoFooter from "../components/info-footer/InfoFooter";
import ExerciseList from "../components/exercise-list/ExerciseList";

import PageExercise0 from "./exercises/PageExercise0";

type SidebarRailProps = {
  selectedTaskId: string;
  exercises: PageWithExercise[];
  onExerciseSelected: (exercise: PageWithExercise) => void;
};

function SidebarRail(props: SidebarRailProps) {
  return (
    <NavigationRail
      header={<Logo />}
      footer={<InfoFooter />}>
        <ExerciseList
          exercises={props.exercises}
          onExerciseSelected={props.onExerciseSelected}/>
    </NavigationRail>
  );
}

function RootNavigator() {
  const exercises = useAppSelector(state => state.exercise.exercises);
  const [selectedExerciseTaskId, setSelectedExerciseTaskId] = useState<string>("1");

  function onExerciseSelected(e: PageWithExercise) {
    if (e.state == "locked" || e.id == selectedExerciseTaskId) {
      return;
    }

    setSelectedExerciseTaskId(e.id);
  }

  return (
    <div id="root-navigator">
      <SidebarLayout
        sidebar={
          <SidebarRail
            selectedTaskId={selectedExerciseTaskId}
            exercises={Object.values(exercises)}
            onExerciseSelected={onExerciseSelected} />
        }
      >
        {selectedExerciseTaskId === "1" && <PageExercise0 page={exercises[selectedExerciseTaskId]} />}
      </SidebarLayout>
    </div>
  )
}

export default RootNavigator;
