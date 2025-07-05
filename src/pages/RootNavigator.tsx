import "./RootNavigator.css";

import type { PageWithExercise } from "../types/Page";

import { useAppSelector } from "../hooks/redux";
import { useLocalStorageState } from "../hooks/useLocalStorage";

import SidebarLayout from "../components/sidebar-layout/SideBarLayout";
import NavigationRail from "../components/navigation-rail/NavigationRail";
import Logo from "../components/logo/Logo";
import InfoFooter from "../components/info-footer/InfoFooter";
import PageList from "../components/page-list/PageList";

import MinScreenSizeOverlay from "./min-screen-size-overlay/MinScreenSizeOverlay";
import PageExercise0 from "./exercises/PageExercise0";
import PageExercise1 from "./exercises/PageExercise1";
import PageExercise2 from "./exercises/PageExercise2";
import PageExercise3 from "./exercises/PageExercise3";

type SidebarRailProps = {
  selectedPageId: string;
  pages: PageWithExercise[];
  onPageSelected: (page: PageWithExercise) => void;
};

function SidebarRail(props: SidebarRailProps) {
  return (
    <NavigationRail
      header={<Logo />}
      footer={<InfoFooter />}>
        <PageList
          selectedPageId={props.selectedPageId}
          pages={props.pages}
          onPageSelected={props.onPageSelected}/>
    </NavigationRail>
  );
}

function RootNavigator() {
  const pages = useAppSelector(state => state.exercise.pages);
  const [selectedPageId, setSelectedPageId] = useLocalStorageState<string>("root.selected-page", "1");

  function onPageSelected(e: PageWithExercise) {
    if (e.state == "locked" || e.id == selectedPageId) {
      return;
    }

    setSelectedPageId(e.id);
  }

  return (
    <div id="root-navigator">
      <MinScreenSizeOverlay />
      <SidebarLayout
        sidebar={
          <SidebarRail
            selectedPageId={selectedPageId}
            pages={Object.values(pages)}
            onPageSelected={onPageSelected} />
        }
      >
        {selectedPageId === "1" && <PageExercise0 page={pages[selectedPageId]} />}
        {selectedPageId === "2" && <PageExercise1 page={pages[selectedPageId]} />}
        {selectedPageId === "3" && <PageExercise2 page={pages[selectedPageId]} />}
        {selectedPageId === "4" && <PageExercise3 page={pages[selectedPageId]} />}
      </SidebarLayout>
    </div>
  )
}

export default RootNavigator;
