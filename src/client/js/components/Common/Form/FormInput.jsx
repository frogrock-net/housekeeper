// @flow
import * as React from 'react';
import styled from 'styled-components';

/**
 * Defines the props that are supported by the FormInput component.
 *
 * - onUpdate - a required callback function that will be called when the value contained in the input is updated
 * - size - the height of this component (and the size of the icon, if any)
 * - fieldName - the name of the field represented by this input component
 * - className - a css class name to override this input's styles
 * - placeholder - a text string to use as this input's placeholder text
 * - value - the value of this input
 * - icon - an Icon to display to the left of this input. should be an Icon component (see: Icon.jsx).
 * - focusedColor - a color string for when this input is focused
 * - defaultColor - a color string for when nothing is happening to this input
 * - errorColor - a color string for when an error occurs
 * - type - the type of input
 * - error - has an error occurred?
 */
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

/**
 * The state that's maintained in the FormInput component.
 *
 * We track whether the input is focused in order to change the icon color along with the form field color.
 */
type State = {
    focused: boolean,
};

/**
 * The FormInput component class.
 *
 * Represents a customizable input field. Intended to be used as a child component for a Form component.
 */
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

    /**
     * Update this component's state when it's focused.
     *
     * We track whether the input is focused in order to change the icon color along with the form field color.
     *
     * @param e the event. unused.
     */
    onFocus = (e: SyntheticInputEvent<HTMLInputElement>) => {
        this.setState({
            focused: true,
        });
    };

    /**
     * Update this component's state when it loses focus.
     *
     * We track whether the input is focused in order to change the icon color along with the form field color.
     *
     * @param e the event. unused.
     */
    onBlur = (e: SyntheticInputEvent<HTMLInputElement>) => {
        this.setState({
            focused: false,
        });
    };

    /**
     * Update our parent component when the value in this input is updated.
     *
     * @param e the event.
     */
    onChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
        this.props.onUpdate(this.props.fieldName, e.currentTarget.value);
    };

    /**
     * Render the FormInput component.
     */
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

/**
 * A styled div for the FormInput component.
 */
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

/**
 * A styled input box for the FormInput component.
 *
 * Disables the ugly yellow box that occurs when chrome autofills a form element.
 */
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
