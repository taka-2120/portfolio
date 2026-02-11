const Wrapper = ({
	wide = false,
	children,
}: {
	wide?: boolean;
	children: React.ReactNode;
}) => (
	<div
		style={{
			padding: "40px 24px",
			maxWidth: wide ? "1000px" : "720px",
			width: "100%",
			margin: "0 auto",
			fontSize: "17px",
		}}
	>
		{children}
	</div>
);

export default Wrapper;
