import {
  ComponentProps,
  createEffect,
  createSignal,
  ParentComponent,
  Show,
  splitProps,
} from "solid-js";
import { twMerge } from "tailwind-merge";

type InputProps = {
  label?: string;
  inputClass?: string;
  labelClass?: string;
  underlineClass?: string;
} & ComponentProps<"input">;

export const Input: ParentComponent<InputProps> = (props) => {
  const [, htmlProps] = splitProps(props, [
    "label",
    "class",
    "inputClass",
    "labelClass",
    "underlineClass",
  ]);

  const isEmpty = () =>
    htmlProps.value === "" && htmlProps.placeholder === undefined && htmlProps.type !== "time";
  const [empty, setEmpty] = createSignal(isEmpty());
  createEffect(() => setEmpty(isEmpty()));

  return (
    <div
      class={twMerge(
        "relative flex h-min w-full items-baseline border-b border-gray-300",
        props.class,
      )}
    >
      <input
        autocomplete="false"
        type="text"
        name={props.label}
        class={twMerge(
          "peer block w-full bg-transparent outline-hidden",
          props.label ? "pt-5 pb-0" : "",
          props.disabled ? "text-gray-500" : "",
          props.inputClass,
        )}
        {...htmlProps}
        value={htmlProps.value ?? ""}
      />
      <Show when={props.children}>
        <div class="mr-2">{props.children}</div>
      </Show>
      <Show when={props.label}>
        <label
          for={props.label}
          class={twMerge(
            "pointer-events-none absolute top-5 z-10 origin-left truncate text-clip transition duration-300 select-none peer-placeholder-shown:-translate-y-5 peer-placeholder-shown:scale-75 peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-blue-500 dark:peer-focus:text-blue-200",
            empty() ? "translate-y-0 scale-100" : "-translate-y-5 scale-75",
            props.labelClass,
          )}
        >
          {props.label}
        </label>
      </Show>
      {/* Animated Underline (as seperate div because pseudo-element leads to focus area issues on webkit */}
      <div
        class={twMerge(
          "absolute -bottom-px h-0.5 w-full scale-x-0 bg-blue-500 transition duration-300 peer-focus:scale-x-100 dark:bg-blue-200",
          props.underlineClass,
        )}
      />
    </div>
  );
};
