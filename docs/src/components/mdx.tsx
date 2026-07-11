import { ComponentProps, createSignal, onMount, Show } from "solid-js";
import { twMerge } from "tailwind-merge";

export const MDXComponents = {
  h1: (props: ComponentProps<"h1">) => {
    return <h1 {...props} class={twMerge("py-8 text-6xl font-extralight")} />;
  },
  h2: (props: ComponentProps<"h2">) => {
    return <h2 {...props} class={twMerge("py-6 text-3xl font-extralight")} />;
  },
  h3: (props: ComponentProps<"h2">) => {
    return <h3 {...props} class={twMerge("py-2 text-xl font-extralight")} />;
  },
  pre: (props: ComponentProps<"pre">) => {
    return (
      <pre
        {...props}
        class={twMerge(
          "my-4 overflow-x-auto border border-neutral-700 bg-neutral-900 p-4 text-sm leading-relaxed",
          props.class,
        )}
      />
    );
  },
  code: (props: ComponentProps<"code">) => {
    const isBlock = "data-language" in props;
    if (isBlock) {
      return <code {...props} class={twMerge("font-mono", props.class)} />;
    } else {
      return (
        <code
          {...props}
          class={twMerge(
            "border border-neutral-400 bg-neutral-200 px-1.5 py-0.5 font-mono text-sm text-neutral-700 dark:bg-neutral-700 dark:text-neutral-100",
            props.class,
          )}
        />
      );
    }
  },
  live: (props: ComponentProps<"div">) => {
    const [mounted, setMounted] = createSignal(false);
    onMount(() => setMounted(true));
    return (
      <div
        {...props}
        class={twMerge(
          "flex w-full items-center justify-center border border-neutral-400 bg-neutral-100 p-10 dark:bg-neutral-800",
        )}
      >
        <div class="w-full max-w-md">
          <Show when={mounted()}>{props.children}</Show>
        </div>
      </div>
    );
  },
} as const;
