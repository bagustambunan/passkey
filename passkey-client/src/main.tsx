import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./v2/redux/store";
import Avatar from "./shared/components/Avatar";
import LayoutV2 from "./v2/app-layout/Layout";
import { pages as pagesV2 } from "./v2/constants/pages";
import("./v2/index.css");

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={<Avatar />}>
        <Routes>
          <Route path="/" element={<LayoutV2 />}>
            {pagesV2.map((page) => (
              <Route
                key={page.windowKey}
                path={page.route.replace("/", "")}
                element={<page.component />}
              />
            ))}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  </Provider>
);
