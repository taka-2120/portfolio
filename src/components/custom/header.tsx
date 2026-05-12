"use client";

import { usePathname, useRouter } from "next/navigation";

const Header = ({ lang }: { lang: string }) => {
	const pathname = usePathname();
	const router = useRouter();

	const switchLang = (newLang: string) => {
		if (newLang === lang) return;
		router.replace(pathname.replace(`/${lang}`, `/${newLang}`));
	};

	const navItems = [
		{
			label: lang === "ja" ? "プロジェクト" : "Projects",
			href: `/${lang}/services`,
		},
		{
			label: lang === "ja" ? "経歴" : "Experience",
			href: `/${lang}/experiences`,
		},
	];

	return (
		<>
			<style>{`
				.portfolio-header {
					position: sticky;
					top: 0;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 14px 24px;
					background: rgba(var(--nextra-bg), 0.85);
					backdrop-filter: blur(12px);
					-webkit-backdrop-filter: blur(12px);
					z-index: 1000;
					border-bottom: 1px solid rgba(128, 128, 128, 0.15);
					color: inherit;
				}
				.portfolio-header a.site-name {
					font-size: 0.95rem;
					font-weight: 600;
					text-decoration: none;
					color: inherit;
					letter-spacing: -0.01em;
				}
				.portfolio-header .nav {
					display: flex;
					align-items: center;
					gap: 20px;
				}
				.portfolio-header .nav-link {
					font-size: 0.875rem;
					text-decoration: none;
					color: inherit;
					opacity: 0.6;
					transition: opacity 0.2s;
				}
				.portfolio-header .nav-link:hover {
					opacity: 1;
				}
				.portfolio-header .lang-switch {
					display: flex;
					align-items: center;
					gap: 2px;
					margin-left: 4px;
				}
				.portfolio-header .lang-btn {
					background: none;
					border: none;
					cursor: pointer;
					padding: 2px 4px;
					font-size: 0.8rem;
					color: inherit;
					opacity: 0.4;
					transition: opacity 0.2s;
					font-family: inherit;
				}
				.portfolio-header .lang-btn.active {
					opacity: 1;
					font-weight: 600;
				}
				.portfolio-header .lang-btn:hover {
					opacity: 0.8;
				}
				.portfolio-header .lang-divider {
					opacity: 0.25;
					font-size: 0.8rem;
				}
				@media (max-width: 480px) {
					.portfolio-header {
						padding: 12px 16px;
					}
					.portfolio-header .nav {
						gap: 14px;
					}
				}
			`}</style>
			<header className="portfolio-header">
				<a href={`/${lang}`} className="site-name">
					Yu Takahashi
				</a>
				<nav className="nav">
					{navItems.map((item) => (
						<a key={item.href} href={item.href} className="nav-link">
							{item.label}
						</a>
					))}
					<span className="lang-switch">
						<button
							type="button"
							onClick={() => switchLang("en")}
							className={`lang-btn ${lang === "en" ? "active" : ""}`}
						>
							EN
						</button>
						<span className="lang-divider">/</span>
						<button
							type="button"
							onClick={() => switchLang("ja")}
							className={`lang-btn ${lang === "ja" ? "active" : ""}`}
						>
							JA
						</button>
					</span>
				</nav>
			</header>
		</>
	);
};

export default Header;
