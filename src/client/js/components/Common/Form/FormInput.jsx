// @flow
import * as React from 'react';

type Props = {
    onUpdate: (string, string) => {},
    fieldName: string,
    className?: string,
    placeholder?: string,
    value?: string,
};

export default class FormInput extends React.Component<Props> {
    static defaultProps = {
        onUpdate: (val: any) => {},
        value: '',
    };

    onChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
        this.props.onUpdate(this.props.fieldName, e.currentTarget.value);
    };

    render() {
        return (
            <input
                className={this.props.className}
                type={'text'}
                name={this.props.fieldName}
                placeholder={this.props.placeholder}
                value={this.props.value}
                onChange={this.onChange}
            />
        );
    }
}
