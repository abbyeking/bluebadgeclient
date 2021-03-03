import styled from 'styled-components'

// import Favorites from '../Favorites'

const StyledSideBar = styled.div`
    height: 100vh;
    min-width: 25vw;
    max-width: 450px;
    border: 1px solid black;
    display: flex;
`;

const SideBar = ({setUserFilm}) => {

    return (
        <div>
        {/* <StyledSideBar>
            <Favorites setUserFilm={setUserFilm} />
        </StyledSideBar> */}
        </div>
    )

}

export default SideBar;
