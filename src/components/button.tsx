import { Component, ComponentProps } from "solid-js";
import { tw } from "../utils";

const Themes = {
  primary: "bg-theme-primary text-theme-text",
  white: "bg-theme-white text-theme-primary border border-theme-border",
  inverted: "bg-theme-text text-theme-background",
  transparent: "bg-transparent text-blue-500 hover:bg-black/5 active:bg-back/10 shadow-0dp",
  disabled: "!bg-gray-200 !text-gray-700 cursor-default",
}


export type ButtonProps = { theme?: keyof typeof Themes} & ComponentProps<"button">;

export const Button: Component<ButtonProps> = (props) => {
  const theme = () => (props.disabled ? Themes["disabled"] : Themes[props.theme ?? "primary"])

  return <button {...props} class={tw("flex cursor-pointer items-center justify-center gap-2 rounded-md px-5 py-2 shadow-2dp transition active:brightness-90 hover:brightness-95", theme(), props.class)} />
}
