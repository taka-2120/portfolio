const Wrapper = ({ wide = false, children }: { wide?: boolean, children: React.ReactNode }) => (
	<div
		style={{
			padding: "32px",
			maxWidth: wide ? "1000px" : "700px",
			width: "100%",
			margin: "0 auto",
		}}
	>
		{children}
	</div>
);

export default Wrapper;
