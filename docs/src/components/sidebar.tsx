import { A, RouteDefinition } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Component, For } from "solid-js";

const mdxRoutes = import.meta.glob<RouteDefinition>("../routes/**/*.{md,mdx}", {
  eager: true,
  import: "frontmatter",
});
const mdxInfo = new Map<string, RouteDefinition["info"]>();
for (const [file, frontmatter] of Object.entries(mdxRoutes)) {
  if (!frontmatter) continue;
  const path =
    file
      .replace(/.*\/routes/, "")
      .replace(/\.(md|mdx)$/, "")
      .replace(/\/index$/, "")
      .replace(/\/+/g, "/") || "/";
  mdxInfo.set(path, frontmatter);
}

export const Sidebar: Component = () => {
  // add mdx info to route definitions
  const routes: RouteDefinition[] = FileRoutes().map((route) => ({
    ...route,
    info: { ...route.info, ...mdxInfo.get(route.path ?? "") },
  }));
  const topics = routes
    .sort((a, b) => (a.info?.name > b.info?.name ? -1 : 1))
    .reduce(
      (topics, route) => {
        const name = route.info?.topic ?? "";
        if (name === "") return topics;

        topics[name] = topics[name] ?? [];
        topics[name].push(route);
        return topics;
      },
      {} as Record<string, RouteDefinition[]>,
    );

  return (
    <nav class="h-full min-w-64 border-r border-neutral-400 p-4">
      <For each={Object.entries(topics)}>
        {([topic, routes]) => (
          <>
            <div class="px-4 py-2 font-medium">{topic.toUpperCase()}</div>
            <div class="flex flex-col gap-2">
              <For each={routes}>
                {(route) => (
                  <A
                    href={route.path}
                    class="rounded-lg py-2 pl-8 font-extralight hover:bg-neutral-300 dark:hover:bg-neutral-700"
                  >
                    {route.info?.name ?? "INVALID ROUTE NAME"}
                  </A>
                )}
              </For>
            </div>
          </>
        )}
      </For>
    </nav>
  );
};
