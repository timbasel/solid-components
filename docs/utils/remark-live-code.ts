import { Parser } from "acorn";
import jsx from "acorn-jsx";

type Node = { type: string; value?: string; children?: Node[]; data?: unknown };
type CodeNode = { type: "code"; value: string; lang?: string | null; meta?: string | null };

const TAG = "live";

const parser = Parser.extend(jsx());

export function remarkLiveCode() {
  const visit = (node: Node) => {
    if (!node.children) return;
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      if (child.type === "code" && hasLiveTag(child as CodeNode)) {
        node.children.splice(i + 1, 0, createPreviewNode(child as CodeNode));
        stripLiveTag(child as CodeNode);
        i++; // skip inserted node
      } else {
        visit(child);
      }
    }
  };
  return (tree: Node) => visit(tree);
}

const createPreviewNode = (node: CodeNode): Node => {
  const lines = node.value.split("\n");
  const jsxStart = lines.findIndex((line) => line.startsWith("<"));
  const body =
    jsxStart === -1
      ? node.value
      : `${lines.slice(0, jsxStart).join("\n")}\nreturn (\n${lines.slice(jsxStart).join("\n")}\n);`;

  const value = `<Preview>{(() => {\n${body}\n})()}</Preview>`;
  const estree = parser.parse(value, { ecmaVersion: "latest", sourceType: "module" });

  return {
    type: "mdxFlowExpression",
    value,
    data: { estree },
  };
};

function splitTokens(meta: string | null | undefined): string[] {
  return (meta ?? "").split(/\s+/).filter(Boolean);
}

function hasLiveTag(node: CodeNode): boolean {
  return splitTokens(node.meta).includes(TAG);
}

function stripLiveTag(node: CodeNode) {
  node.meta =
    splitTokens(node.meta)
      .filter((t) => t !== TAG)
      .join(" ") || null;
}
