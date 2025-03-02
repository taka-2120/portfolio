"use server";

import { experiences } from "@/constants/experiences";

const ExperienceList = () =>
	experiences.map((experience) => {
		return (
			<div key={experience.name}>
				<h2>
					{experience.name}
				</h2>
				<p>
					Range:{" "}
					{`${experience.start.getFullYear()}/${experience.start.getMonth()} ~ ${experience.end ? `${experience.end.getFullYear()}/${experience.end.getMonth()}` : "Present"}`}
				</p>
				<p>
					Role: {experience.role}
				</p>
			</div>
		);
	});

export default ExperienceList;
