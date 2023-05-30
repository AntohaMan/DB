import React, {useContext} from 'react';
import { observer } from "mobx-react-lite"
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";

const ServicesBar = observer(() => {
    const {services}=useContext(Context)
    return (
        <ListGroup className="mt-3">
            {services.serv.map(serv=>
                <ListGroup.Item
                    style={{cursor:"pointer"}}
                    active={serv.id===services.selectedService.id}
                    onClick={()=>services.setSelectedService(serv)}
                    key={serv.id}>

                    {serv.name}
                </ListGroup.Item>

            )}
        </ListGroup>

    );
});

export default ServicesBar;