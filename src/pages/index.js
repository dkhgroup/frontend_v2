import SeoMetaTag from "@/components/pageConfig/meta";
import BestSaleSection from "@/components/pages/home/bestsale";
import ProductCategoriesSection from "@/components/pages/home/categories";
import FeatureProductSection from "@/components/pages/home/featured";
import FeatureProductMobile from "@/components/pages/home/featuredMobile";
import HomepageMobileProductCategories from "@/components/pages/home/mobile/category";
// import HomepageMobileProductCategories from "@/components/pages/home/mobile/category";
import HomeSlide from "@/components/slide/home";
import { convertPopulateParams } from "@/params/convert";
import { homepageParams, productParams } from "@/params/products";
import { globalConfig } from "@/theme/globalConfig";
import { Container, useMediaQuery } from "@mui/material";

export default function IndexPage({homepageDatas,homepageProducts}){

  const matches = useMediaQuery('(max-width:920px)');

  return (
    <>
      <SeoMetaTag
          title={homepageDatas?.data?.attributes?.seo?.title || "DKH Group"}
          description={
          homepageDatas?.data?.attributes?.seo?.description ||
          "DKH Group được thành lập với một mục đích rất rõ ràng: chúng tôi muốn mang đến cho thị trường những sản phẩm chất lượng cao về đồ da, thời trang và dược phẩm"
          }
      />
      <HomeSlide datas={homepageDatas?.data?.attributes?.slides} />
      <Container maxWidth={globalConfig.maxWidth}>
        {!matches && <FeatureProductSection datas={homepageDatas?.data?.attributes?.featured}/>}
        {!matches && <BestSaleSection datas={homepageDatas?.data?.attributes?.best_sale}/>}
        {!matches && <ProductCategoriesSection categories={homepageDatas?.data?.attributes?.product_categories} allProducts={homepageProducts}/>}
        {matches && <FeatureProductMobile 
                    featured={homepageDatas?.data?.attributes?.featured}
                    bestSale={homepageDatas?.data?.attributes?.best_sale}
                />}
      </Container>

      {matches && <HomepageMobileProductCategories categories={homepageDatas?.data?.attributes?.product_categories}/>}
    </>
  );
}

export async function getStaticProps() {
  const url1 = `${globalConfig.api_url}/homepage?${convertPopulateParams(homepageParams)}`
  const url2 = `${globalConfig.api_url}/products?${convertPopulateParams(productParams)}&pagination[page]=1&pagination[pageSize]=8&sort[0]=sort_number:asc&sort[1]=id:desc`
  
  const getHomepageDatas = await fetch(url1)
  const getHomepageProducts = await fetch(url2)

  const homepageDatas = await getHomepageDatas.json()
  const homepageProducts = await getHomepageProducts.json()
 
  return {
    props: {
      homepageDatas,
      homepageProducts
    },
    revalidate: globalConfig.revalidateTime,
  }
}