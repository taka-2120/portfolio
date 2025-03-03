import AppStoreBadge from "@/images/app-store.png";
import Image from "next/image";
import Link from "next/link";

const Download = ({ sentence, url }: { sentence: string; url: string }) => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: "15px",
				margin: "20px",
			}}
		>
			<h1 style={{ fontWeight: "bold", fontSize: "24px" }}>{sentence}</h1>
			<Link href={url}>
				<Image
					src={AppStoreBadge.src}
					height={100}
					width={100}
					objectFit={"contain"}
					alt={"Download on the App Store"}
					style={{ width: "auto", height: "60px" }}
				/>
			</Link>
		</div>
	);
};

export default Download;
