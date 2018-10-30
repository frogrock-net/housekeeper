// @flow
import * as React from 'react';
import styled from 'styled-components';

type Props = {
    className?: string,
    defaultValues?: { [string]: any },
    children?: React.Node,
};

/**
 * The form component can have dynamic state.
 */
type State = {
    [string]: any,
};

export default class Form extends React.Component<Props, State> {
    /**
     * Construct a form and initialize the state.
     */
    constructor(props: Props) {
        super(props);

        if (props.defaultValues) {
            this.state = props.defaultValues;
        } else {
            this.state = {};
        }
    }

    onUpdate = (field: string, value: any) => {
        this.setState({ [field]: value });
    };

    onSubmit = () => {};

    render() {
        return (
            <FormContainer className={this.props.className}>
                {React.Children.map(this.props.children, child => {
                    return React.cloneElement(child, {
                        onUpdate: this.onUpdate.bind(this),
                        value: this.state[child.props.fieldName],
                    });
                })}
            </FormContainer>
        );
    }
}

const FormContainer = styled.div``;
