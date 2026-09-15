import { Helmet } from "react-helmet-async";

const SEO = ({
  title = "Fashion Store",
  description = "Shop fashion, electronics, mobiles, furniture and kitchen products online.",
  keywords = "fashion, ecommerce, online shopping, clothing, electronics",
}) => {
  return (
    <Helmet>
      <title>{title}</title>

      <meta
        name="description"
        content={description}
      />

      <meta
        name="keywords"
        content={keywords}
      />

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />
    </Helmet>
  );
};

export default SEO;