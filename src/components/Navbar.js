import React, {useState} from 'react';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Button,
} from 'reactstrap';

import GetRecipes from './SearchView';
import FavoritesView from './FavoritesView';

const Sitebar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        let newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
    }
    const pages = [
        {component: <GetRecipes />, title:"Search"},
        {component: <FavoritesView />, title:"Favorites"}
    ]
    const [component, setComponent] = React.useState(pages[0].component);

return(
    <Navbar color= "faded" light expand="md">
        <NavbarBrand href="/">Yum!</NavbarBrand>
        <NavbarToggler onClick = {toggle} />
        <Collapse isOpen={isOpen} navbar >
        <Nav className = "ml-auto" navbar >
            <Navbar>
            <Button onClick={props.clearToken}>Logout</Button>
            </Navbar>
            <br></br>
            <div>
                {pages.map((page,p) =>
                    <Button key={p} onClick={()=>setComponent(page.component)} 
                    className="">{page.title}</Button>)} 
            </div>
        </Nav>
        </Collapse>
    </Navbar>
)
}

export default Sitebar;