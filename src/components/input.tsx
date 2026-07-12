import { Show, splitProps, type Component, type ComponentProps } from "solid-js";
import { tw } from "~/utils";

export type InputProps = {
  label?: string;
  inputClass?: string;
} & ComponentProps<"input">;

export const Input: Component<InputProps> = (props) => {
  const [, inputProps] = splitProps(props, ["class", "label", "inputClass"]);

  const isEmpty = () =>
    props.value === "" && props.placeholder === undefined && props.type !== "time";

  return (
    <div
      class={tw("relative flex h-min w-full items-baseline border-b border-border", props.class)}
    >
      <input
        type="text"
        name={props.label}
        class={tw(
          "peer block w-full bg-transparent outline-hidden",
          props.label ? "pt-5 pb-0" : "",
          props.disabled ? "text-text-disabled" : "",
          props.inputClass,
        )}
        {...inputProps}
        value={inputProps.value ?? ""}
      />
      <Show when={props.children}>
        <div class="mr-2">{props.children}</div>
      </Show>
      <Show when={props.label}>
        <label
          for={props.label}
          class={tw(
            "pointer-events-none absolute top-5 z-10 origin-left truncate text-clip transition duration-300 select-none peer-placeholder-shown:-translate-y-5 peer-placeholder-shown:scale-75 peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-primary",
            isEmpty() ? "translate-y-0 scale-100" : "-translate-y-5 scale-75",
          )}
        >
          {props.label}
        </label>
      </Show>
      {/* Animated Underline (as seperate div because pseudo-element leads to focus area issues on webkit */}
      <div class="absolute -bottom-px h-0.5 w-full scale-x-0 bg-primary transition duration-300 peer-focus:scale-x-100" />
    </div>
  );
};
