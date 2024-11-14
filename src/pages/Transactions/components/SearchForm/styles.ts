import styled from "styled-components";

export const SearchFormContainer = styled.form`
    display: flex;
    gap: 1rem;

    input {
        flex: 1;
        border-radius: 6px;
        border: 0;
        background-color: ${({theme}) => theme["gray-900"]};
        color: ${({theme}) => theme["gray-300"]};
        padding: 1rem;

        transition: 500ms ease;

        &::placeholder {
            color: ${({theme}) => theme["gray-500"]};
        }
    }

    button {
        display: flex;
        align-items: center;
        gap: 0.75rem;

        border: 0;
        padding: 1rem;

        background-color: transparent;
        color: ${({theme}) => theme["green-300"]};
        
        font-weight: bold;
        border: 1px solid ${({theme}) => theme["green-300"]};
        border-radius: 6px;

        transition: 500ms ease;

        &:hover {
            background-color: ${({theme}) => theme["green-500"]};
            border-color: ${({theme}) => theme["green-500"]};
            color: ${({theme}) => theme.white};
            cursor: pointer;
        }
    }
`