import React, { useState } from 'react';
import './Navbar.css';
import styled from 'styled-components'
import StyledButton from './Styles/Button'

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

   

    return (
        <div>
            <Navbar color="faded" light expand="md" id="fullNav">
                <NavbarBrand href="/">Welcome to Yum!</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar >
                    <Nav className="ml-auto" navbar >
                        <NavItem>
                            <StyledButton onClick={props.clearToken}>Logout</StyledButton>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )

}

export default Sitebar;
