import LoadingSection from '@/components/screen/loadingSection';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useEffect, useState } from 'react';

export default function Toc(){

    const [toc,setToc] = useState()

    useEffect(()=>{
        const headings = Array.from(document.querySelectorAll(".post-content h2, .post-content h3, .post-content h4"))
        .map((elem) => ({
            id: elem.id,
            text: elem.innerText,
            level: Number(elem.nodeName.charAt(1))
        }))
        setToc(headings)
    },[])

    if(!toc) return <LoadingSection />

    return(
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            aria-label="toc"
            className="toc"
        >
            {toc && toc?.map(item =>
                <ListItem disablePadding key={item.id} className={`heading${item.level}`}>
                    <a href={`#${item.id}`}>
                        <ListItemText primary={item.text} />
                    </a>
                </ListItem>
            )}

        </List>
    )
}