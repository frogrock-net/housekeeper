// @flow
import React from 'react';
import theme from '../../../util/theme';

/**
 * Props supported by the FormArray component.
 * - className - a css class name to override this form's styles
 * - defaultValues - a map containing default values for this form
 * - children - one or more FormInput or SubmitButton components, which will be managed by this Form component.
 * - onSubmit - a callback function called when this Form is submitted.
 */
type Props = {
    onUpdate: (string, any[]) => {},
    fieldName: string,
    className?: string,
    placeholder?: string,
    value?: any[],
    error?: boolean,
};

export default class FormArray extends React.Component<Props> {
    static defaultProps = {
        onUpdate: (field: string, val: any[]) => {},
        value: [],
        isFormComponent: true,
    };

    constructor(props: Props) {
        super(props);
    }

    render() {
        return <div />;
    }
}
