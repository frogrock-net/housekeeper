// @flow
import * as React from 'react';
import styled from 'styled-components';
import Form from '../Common/Form/Form';
import FormInput from '../Common/Form/FormInput';
import { ErrorIcon, HouseIcon, NotesIcon } from '../Common/Icon';
import SubmitButton from '../Common/Form/SubmitButton';
import { CreateHouse as CreateHouseOperation } from '../../state/house';
import { Redirect } from 'react-router-dom';
import { ROUTE_HOUSE } from '../../util/routes';
import Loading from '../Common/Loading';
import BorderedContainer from '../Common/BorderedContainer';
import theme from '../../util/theme';

/**
 * A bare-bones, work-in-progress create house form.
 */
const CreateHouse = () => (
    <Container>
        <CreateHouseOperation>{renderCreateHouse}</CreateHouseOperation>
    </Container>
);

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
            <Title>Describe your house</Title>
            <StyledFormInput placeholder={'Name'} error={false} fieldName={'name'} icon={HouseIcon} />
            <StyledFormInput placeholder={'Description'} error={false} fieldName={'description'} icon={NotesIcon} />
            <Title>Locate your house</Title>
            <ShorterFormInput placeholder={'Street'} error={false} fieldName={'street'} />
            <ShorterFormInput placeholder={'City'} error={false} fieldName={'city'} />
            <ShorterFormInput placeholder={'State'} error={false} fieldName={'state'} />
            <ShorterFormInput placeholder={'Zip'} error={false} fieldName={'zip'} />
            <Title>Add rooms</Title>
            <StyledSubmitButton>Save your house</StyledSubmitButton>
        </StyledForm>
    );
};

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
 * A styled title div for the CreateHouse component.
 */
const Title = styled.div`
    background: ${theme.color.lightGrey};
    padding: ${theme.spacing.small}px;
    margin: ${theme.spacing.small}px 0px;
    height: 25px;

    width: 100%;
    text-align: center;
    font-size: 20px;
    font-family: ${theme.font.header};
    font-weight: bold;
    color: ${theme.color.darkerGrey};

    :first-child {
        margin: 0px 0px ${theme.spacing.small}px;
    }
`;

/**
 * A styled FormInput component for name and description fields.
 */
const StyledFormInput = styled(FormInput)`
    max-width: 650px;
    margin: ${theme.spacing.medium}px auto;
`;

/**
 * A styled FormInput component for address fields.
 */
const ShorterFormInput = styled(FormInput)`
    max-width: 550px;
    margin: ${theme.spacing.medium}px auto;
`;

/**
 * A styled Form for the form in the CreateHouse component.
 */
const StyledForm = styled(Form)`
    height: calc(100% - 40px);

    form: {
        height: 100%;
    }
`;

/**
 * A styled SubmitButton for the form in the CreateHouse component.
 */
const StyledSubmitButton = styled(SubmitButton)`
    height: 75px;
`;

export default CreateHouse;
