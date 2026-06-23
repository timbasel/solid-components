import { A } from "@solidjs/router";
import { Component } from "solid-js";

export const Header: Component = () => {
  return (
    <header class="flex w-full items-center justify-between border-b border-b-neutral-400 p-4">
      <div>
        <A href="/">
          <span class="font-extralight">SOLID </span>
          <span class="font-medium">COMPONENTS</span>
        </A>
      </div>
    </header>
  );
};
