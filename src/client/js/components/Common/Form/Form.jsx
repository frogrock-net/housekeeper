// @flow
import * as React from 'react';
import styled from 'styled-components';
import theme from '../../../util/theme';

/**
 * Props supported by the Form component.
 * - className - a css class name to override this form's styles
 * - defaultValues - a map containing default values for this form
 * - children - one or more FormInput or SubmitButton components, which will be managed by this Form component.
 * - onSubmit - a callback function called when this Form is submitted.
 */
type Props = {
    className?: string,
    defaultValues?: { [string]: any },
    children?: React.Node,
    onSubmit: State => void,
};

/**
 * The form component can have dynamic state (based on the values contained in the form).
 */
type State = {
    [string]: any,
};

/**
 * Determine whether a child component is a Form component (and should get onUpdate injected into it).
 *
 * @param component the component
 * @returns true if the child component is a Form component.
 */
const isFormChild = component => {
    // when component is a styled component, the 'target' is the original component
    if (component.target) {
        return isFormChild(component.target);
    }

    // a form child component should have the 'isFormComponent' default prop.
    if (!component.defaultProps) {
        return false;
    }

    return component.defaultProps.isFormComponent;
};

/**
 * The Form component.
 *
 * Manages child FormInput and SubmitButton components.
 */
export default class Form extends React.Component<Props, State> {
    /**
     * Construct a form and initialize the state.
     */
    constructor(props: Props) {
        super(props);
        this.state = props.defaultValues || {};
    }

    /**
     * Callback function for when a child component in this form is updated.
     *
     * Will be injected into each child component.
     *
     * @param field the field name
     * @param value the updated value
     */
    onUpdate = (field: string, value: any) => {
        this.setState({ [field]: value });
    };

    /**
     * Function that's executed when this form is submitted.
     *
     * NYI: form validation will occur here.
     *
     * @param e the event that caused the form submission.
     */
    onSubmit = (e: Event) => {
        e.preventDefault();
        this.props.onSubmit(this.state);
    };

    /**
     * Render the Form component.
     */
    render() {
        return (
            <FormContainer className={this.props.className}>
                <form onSubmit={this.onSubmit}>
                    {React.Children.map(this.props.children, child => {
                        if (isFormChild(child.type)) {
                            return React.cloneElement(child, {
                                onUpdate: this.onUpdate,
                                value: this.state[child.props.fieldName],
                            });
                        } else {
                            return child;
                        }
                    })}
                </form>
            </FormContainer>
        );
    }
}

/**
 * A styled container div for this Form component.
 */
const FormContainer = styled.div`
    background-color: ${theme.color.white};
    padding: 15px 35px 25px 35px;

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        margin-top: 10px;
    }
`;
