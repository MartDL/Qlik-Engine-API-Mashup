import React from 'react'
import styled from 'styled-components'

const HeaderContainer = styled.div`
    background-color: lime;
`

const Header = () => {
    return (
        <HeaderContainer>
            <h1>Dashboard</h1>
        </HeaderContainer>
    )
}

export default Header
