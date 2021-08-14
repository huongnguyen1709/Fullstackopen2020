import React from 'react';

import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import {
  TextField,
  SelectField,
  HealthCheckRatingOption,
} from '../AddPatientModal/FormField';
import { HealthCheckEntry, HealthCheckRating } from '../types';

export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id' | 'type'>;

interface Props {
  onSubmit: (values: NewHealthCheckEntry) => void;
  onCancel: () => void;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: 'Healthy' },
  { value: HealthCheckRating.LowRisk, label: 'LowRisk' },
  { value: HealthCheckRating.HighRisk, label: 'HighRisk' },
  { value: HealthCheckRating.CriticalRisk, label: 'CriticalRisk' },
];

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  return (
    <div>
      <h3>type: HealthCheck</h3>
      <Formik
        initialValues={{
          specialist: '',
          description: '',
          date: '',
          healthCheckRating: HealthCheckRating.Healthy,
        }}
        onSubmit={onSubmit}
        validate={(values) => {
          const requiredError = 'Field is required';
          const errors: { [field: string]: string } = {};
          if (!values.specialist) {
            errors.specialist = requiredError;
          }
          if (!values.description) {
            errors.description = requiredError;
          }
          if (!values.date) {
            errors.date = requiredError;
          }
          if (!values.healthCheckRating) {
            errors.healthCheckRating = requiredError;
          }
          return errors;
        }}
      >
        {({ isValid, dirty }) => {
          return (
            <Form className='form ui'>
              <Field
                label='Date'
                placeholder='YYYY-MM-DD'
                name='date'
                component={TextField}
              />
              <Field
                label='Specialist'
                placeholder='Specialist'
                name='specialist'
                component={TextField}
              />
              <Field
                label='Description'
                placeholder='Description'
                name='description'
                component={TextField}
              />
              <SelectField
                label='Health Check Rating'
                name='healthCheckRating'
                options={healthCheckRatingOptions}
              />
              <Grid>
                <Grid.Column floated='left' width={5}>
                  <Button type='button' onClick={onCancel} color='red'>
                    Cancel
                  </Button>
                </Grid.Column>
                <Grid.Column floated='right' width={5}>
                  <Button
                    type='submit'
                    floated='right'
                    color='green'
                    disabled={!dirty || !isValid}
                  >
                    Add
                  </Button>
                </Grid.Column>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddEntryForm;
