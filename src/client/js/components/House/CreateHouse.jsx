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

/**
 * A bare-bones, work-in-progress create house form.
 */
const CreateHouse = () => (
    <Container>
        <InnerContainer>
            <CreateHouseOperation>{renderCreateHouse}</CreateHouseOperation>
        </InnerContainer>
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
                <ErrorIcon size={65} color={'#ad6f6f'} />
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
            <Title />
            <StyledSubmitButton>Save your house</StyledSubmitButton>
        </StyledForm>
    );
};

/**
 * A styled container div for the CreateHouse component.
 */
const Container = styled.div`
    background: #65727b;
    display: flex;
    padding: 15px;

    min-height: calc(100% - 350px);
`;

/**
 * An inner container div for the CreateHouse component.
 */
const InnerContainer = styled.div`
    background: white;
    width: 100%;
`;

/**
 * A container for the error/loading components that extends InnerContainer and centers the contents.
 */
const CenteredContainer = styled(InnerContainer)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

/**
 * A styled title div for the CreateHouse component.
 */
const Title = styled.div`
    background: #eee;
    padding: 10px;
    margin: 10px 0px;
    height: 25px;

    width: 100%;
    text-align: center;
    font-size: 20px;
    font-family: 'Arvo', sans-serif;
    font-weight: bold;
    color: #333;

    :first-child {
        margin: 0px 0px 10px;
    }
`;

/**
 * A styled FormInput component for name and description fields.
 */
const StyledFormInput = styled(FormInput)`
    max-width: 650px;
    margin: 15px auto;
`;

/**
 * A styled FormInput component for address fields.
 */
const ShorterFormInput = styled(FormInput)`
    max-width: 550px;
    margin: 15px auto;
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
