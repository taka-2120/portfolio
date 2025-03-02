"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Header = ({ lang }: { lang: string }) => {
	const [value, setValue] = useState(lang);
	const pathname = usePathname();
	const router = useRouter();

	return (
		<header className="header">
			<div className="site-name">
				<a href="/">Yu's Portfolio</a>
			</div>
			<div className="language-selector">
				<select
					value={value}
					onChange={(e) => {
						setValue(e.target.value);
						if (e.target.value === lang) return;
						router.replace(pathname.replace(`/${lang}`, `/${e.target.value}`));
					}}
				>
					<option value="en" key={"en"}>
						English
					</option>
					<option value="ja" key={"ja"}>
						日本語
					</option>
				</select>
			</div>
			<style jsx>{`
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #333;
            color: white;
            padding: 15px 20px;
        }
        .site-name {
            font-size: 1.5em;
            font-weight: bold;
        }
        .language-selector select {
            padding: 5px;
            font-size: 1em;
        }
  `}</style>
		</header>
	);
};

export default Header;
