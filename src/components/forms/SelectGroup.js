import React from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

export const SelectGroup = ({ id, label, help, options, optionValueKey, optionLabelKey, feedbackError, ...props }) => {

    return (
        <FormGroup
            controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl
                {...props}
            >
                <option value=""></option>
                {
                    (options.length ? options : []).map((value) => {
                        return (
                            <option key={value.id} value={value[optionValueKey ? optionValueKey : "id"]}>{value[optionLabelKey ? optionLabelKey : "name"]}</option>
                        )
                    })
                }
            </FormControl>
            {help && <HelpBlock>{help}</HelpBlock>}
            <div className={`${feedbackError ? 'd-inline' : ''} invalid-feedback`}>{feedbackError ? feedbackError : ''}</div>
        </FormGroup>
    );
};