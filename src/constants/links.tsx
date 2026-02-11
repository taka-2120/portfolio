import { FaAppStore, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "@/entities/link";

export const links: Link[] = [
	new Link({
		name: "GitHub",
		url: "https://github.com/taka-2120",
		icon: <FaGithub size={20} />,
	}),
	new Link({
		name: "X (Twitter)",
		url: "https://twitter.com/yutk_941",
		icon: <FaXTwitter size={20} />,
	}),
	new Link({
		name: "App Store",
		url: "https://apps.apple.com/developer/yu-takahashi/id1674352907",
		color: "#1a8cf0",
		icon: <FaAppStore size={20} />,
	}),
	new Link({
		name: "LinkedIn",
		color: "#0f50b4",
		url: "https://www.linkedin.com/in/yu-takahashi-5a4bb5253",
		icon: <FaLinkedin size={20} />,
	}),
];
