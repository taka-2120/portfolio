"use client";

const Footer = () => (
	<footer className="footer">
		<small>
			<time>{new Date().getFullYear()}</time> © Yu Takahashi
			{/* <a href="/privacy-policy">Privacy Policy</a> */}
		</small>
		<style jsx>{`
      .footer {
        display: flex;
        justify-content: center;
        width: 100%;
				padding: 20px;
      }
      a {
        float: right;
      }
      @media screen and (max-width: 480px) {
        article {
          padding-top: 2rem;
          padding-bottom: 4rem;
        }
      }
    `}</style>
	</footer>
);

export default Footer;
