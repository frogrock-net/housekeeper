// @flow
import * as React from 'react';
import styled from 'styled-components';
import { CreateHouse as CreateHouseOperation } from '../../state/house';
import BorderedContainer from '../Common/BorderedContainer';
import { ROUTE_HOUSE } from '../../util/routes';
import { Redirect } from 'react-router-dom';
import theme from '../../util/theme';
import Loading from '../Common/Loading';
import { ErrorIcon } from '../Common/Icon';
import Form, { FormDiv } from '../Common/Form/Form';
import { EditableHouseBanner } from './HouseBanner';

/**
 * A bare-bones, work-in-progress create house form.
 */
const CreateHouse2 = () => (
    <Container>
        <CreateHouseOperation>{renderCreateHouse}</CreateHouseOperation>
    </Container>
);

export default CreateHouse2;

/**
 * A styled container div for the CreateHouse component.
 */
const Container = styled(BorderedContainer).attrs({
    spacing: 0,
})`
    min-height: calc(100% - 350px);
    padding: 15px;
`;

/**
 * A container for the error/loading components that extends InnerContainer and centers the contents.
 */
const CenteredContainer = styled.div`
    background: ${theme.color.white};

    display: flex;
    justify-content: center;
    align-items: center;

    height: 100%;
    width: 100%;
`;

/**
 * Render function for CreateHouse.
 *
 * @param onSubmit the function to call to submit the form
 * @param isLoading is this loading?
 * @param error an error
 * @param data the data from the mutation
 */
const renderCreateHouse = (onSubmit, isLoading, error, data) => {
    // if we have data, we've successfully created a house.
    // redirect to the view house page.
    if (data) {
        return <Redirect to={`${ROUTE_HOUSE}/${data.id}`} />;
    }

    // show a loading component when we're loading...
    if (isLoading) {
        return (
            <CenteredContainer>
                <Loading />
            </CenteredContainer>
        );
    }

    // TODO: do something more useful when an error occurs
    if (error) {
        return (
            <CenteredContainer>
                <ErrorIcon size={65} color={theme.color.error} />
            </CenteredContainer>
        );
    }

    return (
        <StyledForm onSubmit={onSubmit}>
            {EditableHouseBanner({})}
            {editableHouseDescription({})}
        </StyledForm>
    );
};

/**
 * A styled Form for the form in the CreateHouse component.
 */
const StyledForm = styled(Form)`
    height: 100%;
    padding: 15px;

    form {
        margin-top: 0px;
    }
`;

const editableHouseDescription = house => {
    return <EditableDescriptionContainer>Enter a description.</EditableDescriptionContainer>;
};

/**
 * A styled container div for the Banner component.
 */
const EditableDescriptionContainer = styled(FormDiv)`
    padding: 10px;
    width: 100%;
`;
