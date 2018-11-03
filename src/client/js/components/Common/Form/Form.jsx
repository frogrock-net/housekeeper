// @flow
import * as React from 'react';
import styled from 'styled-components';

type Props = {
    className?: string,
    defaultValues?: { [string]: any },
    children?: React.Node,
    onSubmit: State => void,
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

    onSubmit = (e: Event) => {
        e.preventDefault();
        this.props.onSubmit(this.state);
    };

    render() {
        return (
            <FormContainer className={this.props.className}>
                <form onSubmit={this.onSubmit}>
                    {React.Children.map(this.props.children, child => {
                        return React.cloneElement(child, {
                            onUpdate: this.onUpdate.bind(this),
                            value: this.state[child.props.fieldName],
                        });
                    })}
                </form>
            </FormContainer>
        );
    }
}

const FormContainer = styled.div`
    background-color: #fff;
    padding: 15px 35px 25px 35px;

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        margin-top: 10px;
    }
`;
