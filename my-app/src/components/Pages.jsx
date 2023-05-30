import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Pagination} from "react-bootstrap";

const Pages =observer( () => {
    const{services}=useContext(Context)
    const pageCount=Math.ceil(services.totalCount/services.limit)
    const pages=[]

    for (let i=0;i<pageCount;i++){
        pages.push(i+1)
    }



    return (

            <>
        <Pagination  className="fixed-bottom justify-content-center p-5">
            {pages.map(page=>
                <Pagination.Item
                    key={page}
                    active={services.page ===page}
                    onClick={()=>services.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
            
        </Pagination>
        </>
    );
});

export default Pages;