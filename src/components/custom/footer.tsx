"use client";

const Footer = () => (
	<footer className="footer">
		<small>
			<time>{new Date().getFullYear()}</time> &copy; Yu Takahashi
		</small>
		<style jsx>{`
			.footer {
				display: flex;
				justify-content: center;
				width: 100%;
				padding: 32px 24px;
				opacity: 0.5;
				font-size: 0.85rem;
			}
		`}</style>
	</footer>
);

export default Footer;
