import React, { useState, useEffect } from 'react';
import './Navbar.css';
import StyledButton from './Styles/Button';
import { debounce } from '../helpers/debounce';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

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
        // height: '60px',
        width: '100%',
        // backgroundColor: 'grey',
        textAlign: 'center',
        transition: 'top 0.6s',
        zIndex: '100'
    }





    // const ShowLogout = () => {

    //     return(sessionToken === localStorage.getItem('token')  
    //         ?(
    //           <>
    //           <br></br>
    //             <SearchView token={sessionToken} />
    //             <br></br>
    //             <FavoritesView token={sessionToken} />
    //           </>
    //         )         
    //         :<Auth updateToken={updateToken} />
    //       )
    //   }


    return (
        <div style={{ ...navbarStyles, top: visible ? '0' : '-60px' }}>
            {/* <Router>
                <Switch>
                    <Route exact path="/favorites">
                        <FavoritesView/>
                    </Route>
                </Switch>
            </Router> */}
            <Navbar color="faded" sticky="top" light expand="md" id="fullNav">
                <NavbarBrand href="/">Welcome to Yum!</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar >
                    <Nav className="ml-auto" navbar >
                        <NavItem>
                            {(props.sessionToken !== ('')) ?
                                <StyledButton onClick={props.clearToken}>Logout</StyledButton> :
                                <span />}
                        </NavItem>
                        {/* <Link to="/favorites">
                        <NavItem>
                            <StyledButton>Favorites</StyledButton>
                        </NavItem>
                        </Link> */}
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