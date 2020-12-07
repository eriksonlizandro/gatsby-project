import React from 'react';
import { graphql } from 'gatsby';
import { Layout, ImageGallery, ProductQuantityAdder } from 'components';
import { Grid, SelectWrapper, Price } from './styles';
import CartContext from '../../context/CartContext';
import { navigate, useLocation } from '@reach/router';
import queryString from 'query-string';

export const query = graphql`
  query ProductQuery($shopifyId: String) {
    shopifyProduct(shopifyId: { eq: $shopifyId }) {
      shopifyId
      title
      description
      images {
        id
        localFile {
          childImageSharp {
            fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`;

export default function ProductTemplate(props) {
  const [product, setProduct] = React.useState(null);
  const { getProductById } = React.useContext(CartContext);
  const [selectedVariant, setSelectedVariant] = React.useState(null);
  const { search, origin, pathname } = useLocation();
  console.log(search, origin, pathname);
  const variantId = queryString.parse(search).variant;

  React.useEffect(() => {
    getProductById(props.data.shopifyProduct.shopifyId).then(result => {
      setProduct(result);
      setSelectedVariant(
        result.variants.find(({ id }) => id === variantId) || result.variants[0]
      );
    });
  }, [
    getProductById,
    setProduct,
    props.data.shopifyProduct.shopifyId,
    variantId,
  ]);

  //Customize the URL depending on the varients that are selected
  //Using 'useLocation' and also 'replace' to create an url
  //for each of the varients without affecting the previous page

  const handleVariantChange = e => {
    const newVariant = product?.variants.find(v => v.id === e.target.value);
    setSelectedVariant(newVariant);
    navigate(
      `${origin}${pathname}?variant=${encodeURIComponent(newVariant.id)}`,
      {
        replace: true,
      }
    );
  };

  return (
    <Layout>
      <Grid>
        <div>
          <h1>{props.data.shopifyProduct.title}</h1>
          <p>{props.data.shopifyProduct.description}</p>
          {product?.availableForSale && !!selectedVariant && (
            <>
              {product?.variants.length > 1 && (
              <SelectWrapper>
                {' '}
                {/* Drop down menu*/}
                <strong>Variant</strong>
                <select
                  value={selectedVariant.id}
                  onChange={handleVariantChange}
                >
                  {product?.variants.map(v => (
                    <option key={v.id} value={v.id}>
                      {v.title}
                    </option>
                  ))}
                </select>
              </SelectWrapper>
              )}

              {!!selectedVariant &&(
                <>
                <Price>${selectedVariant.price}</Price>
                <ProductQuantityAdder 
                available={selectedVariant.available}
                variantId={selectedVariant.id}/>
                </>
                )}
                
            </>
          )}
        </div>
        <div>
          <ImageGallery
            //This piece of code allows us to display as the main image the one
            //that we selected from the smallthumbnails and the drop down menu 
            selectedVariantImageId={selectedVariant?.image.id}
            images={props.data.shopifyProduct.images}
                    
          />
        </div>
      </Grid>
    </Layout>
  );
}
