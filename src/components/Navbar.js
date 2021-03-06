import React, { useState } from 'react';
import './Navbar.css';
import StyledButton from './Styles/Button';

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
        <div>
            <Navbar color="faded" light expand="md" id="fullNav">
                <NavbarBrand href="/">Welcome to Yum!</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar >
                    <Nav className="ml-auto" navbar >
                        <NavItem>
                            {(props.sessionToken !== ('')) ?
                            <StyledButton onClick={props.clearToken}>Logout</StyledButton> :
                            <span /> }
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