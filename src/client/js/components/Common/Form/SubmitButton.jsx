// @flow
import * as React from 'react';
import styled from 'styled-components';

type Props = {
    children?: React.Element<string>,
    className?: string,
};

const SubmitButton = (props: Props) => (
    <Button type="submit" className={props.className}>
        {props.children}
    </Button>
);

export default SubmitButton;

const Button = styled.button`
    width: 100%;
    height: 40px;
    border-radius: 5px;
    margin: 20px 0 10px;

    text-transform: uppercase;
    font-size: 18px;
    line-height: 40px;

    color: #fff;
    background-color: #435e6e;
    border: 1px solid #334854;
    cursor: pointer;

    :disabled {
        background-color: #7c7c7c;
        border: 1px rgb(58, 58, 58) solid;
    }

    :disabled:hover {
        background-color: #7c7c7c;
        border: 1px rgb(58, 58, 58) solid;
    }

    :hover {
        background-color: #334854;
    }

    :focus {
        outline: none;
    }

    :active {
        background-color: #212e34;
    }
`;