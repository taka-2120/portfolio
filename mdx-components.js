import { useMDXComponents as getThemeComponents } from "nextra-theme-docs";

const themeComponents = getThemeComponents({
  wrapper: ({ children }) => (
    <div
      style={{
        gap: "32px",
        padding: "32px",
        maxWidth: "1000px",
        width: "100%",
        margin: "0 auto",
      }}
    >
      {children}
    </div>
  ),
});

export function useMDXComponents(components) {
  return {
    ...themeComponents,
    ...components,
  };
}
