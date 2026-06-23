import { Component, ComponentProps } from "solid-js";
import { twMerge } from "tailwind-merge";

export const Preview: Component<ComponentProps<"div">> = (props) => {
  return (
    <div
      {...props}
      class={twMerge(
        "my-4 flex w-full items-center justify-center border border-neutral-400 bg-neutral-200 p-10",
        props.class,
      )}
    >
      <div class="w-full max-w-md">{props.children}</div>
    </div>
  );
};
