import HomePageMobileCategory from "./item";

export default function HomepageMobileProductCategories({...props}){
    return(
        <>
            {props.categories?.data?.length > 0 && props.categories?.data?.map(item =>
                <HomePageMobileCategory data={item} key={item.id} />
            )}
        </>
    )
}