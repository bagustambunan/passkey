import { Suspense } from "react";
import { useAppSelector } from "../../redux/hooks";
import { pages } from "../../constants/pages";
import Window from "../Window";

export default function WindowsContainer() {
  const { windows } = useAppSelector((state) => state.windows);

  return (
    <>
      {windows.map((window) => {
        const page = pages.find((p) => p.windowKey === window.windowKey);
        if (!page) return null;

        const PageComponent = page.component;

        return (
          <Window
            key={window.id}
            windowId={window.id}
            windowKey={window.windowKey}
            title={page.icon + " " + page.title}
            closable={true}
          >
            <Suspense fallback={null}>
              <PageComponent />
            </Suspense>
          </Window>
        );
      })}
    </>
  );
}
