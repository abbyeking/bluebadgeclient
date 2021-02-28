import React, { useState } from 'react';
import './Navbar.css';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Button,
} from 'reactstrap';

import SearchView from './SearchView';
import FavoritesView from './FavoritesView';

const Sitebar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        let newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
    }
    // const pages = [
    //     {component: <SearchView />, title:"Search"},
    //     {component: <FavoritesView />, title:"Favorites"}
    // ]
   

    return (
        <div>
            <Navbar color="faded" light expand="md" id="fullNav">
                <NavbarBrand href="/">Welcome to Yum!</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar >
                    <Nav className="ml-auto" navbar >
                        <NavItem>
                            <Button onClick={props.clearToken}>Logout</Button>
                        </NavItem>
           {/* <div>
                {pages.map((page,p) =>
                    <Button key={p} onClick={()=>props.setComponent(page.component)} 
                    className="">{page.title}</Button>)} 
            </div> */}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )

}

export default Sitebar;