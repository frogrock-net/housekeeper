// @flow
import * as React from 'react';
import styled from 'styled-components';

type Props = {
    onUpdate: (string, string) => {},
    size: number,
    fieldName: string,
    className?: string,
    placeholder?: string,
    value?: string,
    icon?: any,
    focusedColor?: string,
    defaultColor?: string,
    errorColor?: string,
    type?: string,
    error?: boolean,
};

type State = {
    focused: boolean,
};

export default class FormInput extends React.Component<Props, State> {
    static defaultProps = {
        onUpdate: (val: any) => {},
        value: '',
        size: 30,
        focusedColor: '#435e6e',
        defaultColor: '#999',
        errorColor: '#a74343',
        type: 'text',
    };

    state = {
        focused: false,
    };

    onFocus = (e: SyntheticInputEvent<HTMLInputElement>) => {
        this.setState({
            focused: true,
        });
    };

    onBlur = (e: SyntheticInputEvent<HTMLInputElement>) => {
        this.setState({
            focused: false,
        });
    };

    onChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
        this.props.onUpdate(this.props.fieldName, e.currentTarget.value);
    };

    render() {
        return (
            <InputContainer
                size={this.props.size}
                color={this.props.error ? this.props.errorColor : this.state.focused ? this.props.focusedColor : this.props.defaultColor}
                className={this.props.className}
            >
                {this.props.icon
                    ? React.createElement(this.props.icon, {
                          size: this.props.size * 0.8,
                      })
                    : null}
                <StyledInput
                    name={this.props.fieldName}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
                    type={this.props.type}
                />
            </InputContainer>
        );
    }
}

const InputContainer = styled.div`
    display: flex;
    margin: ${props => props.size / 2}px 5px ${props => props.size / 2 - 1}px 5px;
    width: 100%;
    height: ${props => props.size}px;
    align-items: center;

    input {
        margin: 0px 10px;
        border-bottom: 1px ${props => props.color} solid;
        color: ${props => props.color} !important;

        height: ${props => props.size}px;
        font-size: ${props => props.size * (2 / 3)}px;
        type: ${props => props.type};
    }

    div svg {
        fill: ${props => props.color};
    }
`;

const StyledInput = styled.input.attrs({
    type: 'text',
})`
    border-top: none;
    border-left: none;
    border-right: none;

    width: 100%;

    background-color: transparent;
    -webkit-tap-highlight-color: transparent;

    :-webkit-autofill {
        -webkit-box-shadow: 0 0 0 40px #fff inset !important;
    }

    :focus {
        outline: none;
    }
`;
