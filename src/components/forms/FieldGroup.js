import React from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';

export const FieldGroup = ({ id, label, help, feedbackError, ...props }) => {
    return (
      <FormGroup 
        controlId={id}
        validationState={"error"}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
        <div className={`${feedbackError ? 'd-inline' : ''} invalid-feedback`}>{feedbackError ? feedbackError : ''}</div>
      </FormGroup>
    );
};