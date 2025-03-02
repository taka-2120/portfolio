"use server";

import { experiences } from "@/constants/experiences";
import "nextra-theme-docs/style.css";

const ExperienceListEn = async () =>
	experiences.map((experience) => {
		return (
			<div key={experience.nameEn} style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
				<h2 style={{ fontSize: "30px", fontWeight: "bold", marginTop: "20px", paddingBottom: "4px" }}>
					{experience.nameEn}
				</h2>
				<p>
					<strong>Range</strong>:{" "}
					{`${experience.start.getFullYear()}/${experience.start.getMonth()} ~ ${experience.end ? `${experience.end.getFullYear()}/${experience.end.getMonth()}` : "Present"}`}
				</p>
				<p><strong>Role</strong>: {experience.roleEn}</p>
			</div>
		);
	});

export default ExperienceListEn;
