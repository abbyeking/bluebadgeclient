import React, { useState, useEffect } from 'react';
import './Navbar.css';
import StyledButton from './Styles/Button';
import { debounce } from '../helpers/debounce';
import { Link } from 'react-router-dom';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
} from 'reactstrap';

import SearchView from './SearchView';
import FavoritesView from './FavoritesView';

const Sitebar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        let newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
    }
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    const handleScroll = debounce(() => {
        const currentScrollPos = window.pageYOffset;

        setVisible((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 50) || currentScrollPos < 10);

        setPrevScrollPos(currentScrollPos);
    }, 100);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);

    }, [prevScrollPos, visible, handleScroll]);

    const navbarStyles = {
        position: 'fixed',
        width: '100%',
        textAlign: 'center',
        transition: 'top 0.6s',
        zIndex: '100'
    }

    return (
        <div style={{ ...navbarStyles, top: visible ? '0' : '-60px' }}>

            <Navbar color="faded" sticky="top" light expand="md" id="fullNav">
                <NavbarBrand id="yum" href="/">Welcome to Yum!</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar >
                    <Nav className="ml-auto" navbar >
                        <NavItem>
                            <StyledButton>
                                <Link style={{ color: "#FFFFFF" }} to="/favorites">Favorites</Link>
                            </StyledButton>
                        </NavItem>
                        <NavItem>
                            <StyledButton>
                                <Link style={{ color: "#FFFFFF" }} to="/search">Search</Link>
                            </StyledButton>
                        </NavItem>
                        <NavItem>
                            {(props.sessionToken !== ('')) ?
                                <StyledButton onClick={props.clearToken}>
                                    <Link style={{ color: "#FFFFFF" }} to="/" >
                                        Logout
                                </Link>
                                </StyledButton>
                                :
                                <span />}
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default Sitebar;