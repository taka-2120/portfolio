"use server";

import { experiences } from "@/constants/experiences";
import "nextra-theme-docs/style.css";

const ExperienceListJa = async () =>
	experiences.map((experience) => {
		return (
			<div
				key={experience.nameEn}
				style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
			>
				<h2
					style={{
						fontSize: "30px",
						fontWeight: "bold",
						marginTop: "20px",
						paddingBottom: "4px",
					}}
				>
					{experience.nameJa}
				</h2>
				<p>
					<strong>期間</strong>:{" "}
					{`${experience.start.getFullYear()}/${experience.start.getMonth()} ~ ${experience.end ? `${experience.end.getFullYear()}/${experience.end.getMonth()}` : "Present"}`}
				</p>
				<p>
					<strong>役職</strong>: {experience.roleJa}
				</p>
			</div>
		);
	});

export default ExperienceListJa;
