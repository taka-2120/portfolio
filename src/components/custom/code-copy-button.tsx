"use client";

import { useEffect } from "react";

const CodeCopyButton = () => {
	useEffect(() => {
		const figures = document.querySelectorAll<HTMLElement>(
			".mdx-prose [data-rehype-pretty-code-figure]",
		);

		const cleanups: (() => void)[] = [];

		for (const figure of figures) {
			if (figure.querySelector(":scope > .code-copy-button")) continue;

			const pre = figure.querySelector("pre");
			if (!pre) continue;

			const button = document.createElement("button");
			button.type = "button";
			button.className = "code-copy-button";
			button.textContent = "Copy";
			button.setAttribute("aria-label", "Copy code to clipboard");

			let resetTimeout: ReturnType<typeof setTimeout>;
			const onClick = () => {
				navigator.clipboard.writeText(pre.textContent ?? "").then(() => {
					button.textContent = "Copied!";
					button.classList.add("copied");
					clearTimeout(resetTimeout);
					resetTimeout = setTimeout(() => {
						button.textContent = "Copy";
						button.classList.remove("copied");
					}, 2000);
				});
			};

			button.addEventListener("click", onClick);
			cleanups.push(() => {
				button.removeEventListener("click", onClick);
				clearTimeout(resetTimeout);
				button.remove();
			});

			figure.append(button);
		}

		return () => {
			for (const cleanup of cleanups) cleanup();
		};
	}, []);

	return null;
};

export default CodeCopyButton;
