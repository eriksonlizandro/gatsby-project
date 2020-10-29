import React from 'react';
import { graphql } from 'gatsby';
import { Layout, ImageGallery } from 'components';
import { Grid, SelectWrapper, Price } from './styles';
import CartContext from '../../context/CartContext'; 

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
 const storeData  = props.data.shopifyProduct;
 const [selectedVariant, setSelectedVariant] = React.useState(null); 

 React.useEffect(()=> {
   getProductById(props.data.shopifyProduct.shopifyId).then(result => {
     setProduct(result);
     setSelectedVariant(result.variants[0]); 
   })

 },[getProductById, setProduct])

 const handleVariantChange = (e) => { 
  setSelectedVariant(product?.variants.find(v => v.id === e.target.value))
 }
  return (
    <Layout>
      <Grid>
        <div>
          <h1>{storeData.title}</h1>
          <p>{storeData.description}</p>
          {product?.availableForSale && (
          <>
          <SelectWrapper> {/* Drop down menu*/}
          <strong>Variant</strong>
          <select onChange={handleVariantChange}>
            {product?.variants.map(v => (
              <option key={v.id} value={v.id}>{v.title}</option>
            ))}
          </select>
          </SelectWrapper>

          {!!selectedVariant && <Price>${selectedVariant.price }</Price>}
          </>
            )}
        </div>
        <div>
            <ImageGallery images = {storeData.images}/>
        </div>
      </Grid>
    </Layout>
  );
}