import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { ParentComponent, Suspense } from "solid-js";
import { MDXProvider } from "solid-mdx";
import { Header, MDXComponents, Sidebar } from "./components";
import "./style.css";

const App: ParentComponent = (props) => {
  return (
    <div class="flex h-screen w-screen flex-col bg-neutral-200 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
      <Header />
      <div class="flex min-h-0 grow">
        <Sidebar />
        <div class="h-full w-full overflow-scroll">
          <main class="mx-auto max-w-6xl p-4 pb-20">
            <MDXProvider components={MDXComponents}>
              <Suspense>{props.children}</Suspense>
            </MDXProvider>
          </main>
        </div>
      </div>
    </div>
  );
};

export default () => (
  <Router base={import.meta.env.BASE_URL} root={App}>
    <FileRoutes />
  </Router>
);
