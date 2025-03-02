"use client";

const Footer = () => (
  <footer style={{ display: "flex", justifyContent: 'center', margin: "8rem 20px 20px 20px" }}>
    <small>
      <time>{new Date().getFullYear()}</time> © Yu Takahashi
      {/* <a href="/privacy-policy">Privacy Policy</a> */}
      <style jsx>{`
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
    </small>
  </footer>
);

export default Footer;