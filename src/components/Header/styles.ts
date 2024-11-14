import styled, { css } from "styled-components";

export const HeaderContainer = styled.header `
    ${({theme}) => css`
        background-color: ${theme["gray-900"]};
        padding: 2.5rem 0 7.5rem;
    `}
`

export const HeaderContent = styled.div`
    width: 100%;
    max-width: 1120px;
    margin: 0 auto;
    padding: 0 1.5rem;

    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const NewTransactionButton = styled.button`
    ${({theme}) => css`
        height: 50px;
        padding: 0 1.25rem;
        border: 0;

        background-color: ${theme["green-500"]};
        color: ${theme.white};

        font-weight: bold;
        border-radius: 6px;
        cursor: pointer;

        transition: 500ms ease;
        
        &:hover {
            background-color: ${theme["green-700"]};
        }
    `}
`