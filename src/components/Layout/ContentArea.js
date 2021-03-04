import styled from 'styled-components'

// import DetailsView from '../DetailsView'
// import SearchView from '../SearchView'

const StyledContentArea = styled.div`
    height: 100vh;
    min-width: 70vw;
    border: 1px solid blue;
    display: flex;
`;

// const ContentArea = ({userFilm}) => {
const ContentArea = () => {

    return (
        <StyledContentArea>
            {/* {userFilm?
                <DetailsView userFilm={userFilm}/>
            :   <SearchView />
            } */}

        </StyledContentArea>
    )

}

export default ContentArea;