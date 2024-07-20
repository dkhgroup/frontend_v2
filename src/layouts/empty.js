import HeaderMain from "./main/header";

export default function EmptyLayout({children}){
    return(
        <>
            <HeaderMain />
            {children}
        </>
    )
}