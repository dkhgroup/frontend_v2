import SeoMetaTag from "@/components/pageConfig/meta";
import BestSaleSection from "@/components/pages/home/bestsale";
import ProductCategoriesSection from "@/components/pages/home/categories";
import FeatureProductSection from "@/components/pages/home/featured";
import FeatureProductMobile from "@/components/pages/home/featuredMobile";
import HomepageMobileProductCategories from "@/components/pages/home/mobile/category";
// import HomepageMobileProductCategories from "@/components/pages/home/mobile/category";
import HomeSlide from "@/components/slide/home";
import MainLayout from "@/layouts/main";
import { convertPopulateParams } from "@/params/convert";
import { homepageParams, productParams } from "@/params/products";
import { globalConfig } from "@/theme/globalConfig";
import { Container, useMediaQuery } from "@mui/material";

export default function IndexPage({homepageDatas,homepageProducts,navbar,footer}){

  const matches = useMediaQuery('(max-width:920px)');

  return (
    <MainLayout navbar={navbar} footer={footer}>
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
    </MainLayout>
  );
}

export async function getStaticProps() {
  
  const urlNavbar = `${globalConfig.api_url}/menus/${globalConfig.menuId}?nested&populate=*`
  const urlFooter = `${globalConfig.api_url}/contact?populate[0]=Hotline&populate[1]=Email&populate[2]=social&populate[3]=social.icon&populate[4]=img_copyright&populate[5]=img_copyright.image`
  const getNavBar = await fetch(urlNavbar)
  const getFooter = await fetch(urlFooter)
  const navbar = await getNavBar.json()
  const footer = await getFooter.json()
  
  
  const url1 = `${globalConfig.api_url}/homepage?${convertPopulateParams(homepageParams)}`
  const url2 = `${globalConfig.api_url}/products?${convertPopulateParams(productParams)}&pagination[page]=1&pagination[pageSize]=8&sort[0]=sort_number:asc&sort[1]=id:desc`


  const getHomepageDatas = await fetch(url1)
  const getHomepageProducts = await fetch(url2)

  const homepageDatas = await getHomepageDatas.json()
  const homepageProducts = await getHomepageProducts.json()
 
  return {
    props: {
      homepageDatas,
      homepageProducts,
      navbar,
      footer
    },
    revalidate: globalConfig.revalidateTime,
  }
}