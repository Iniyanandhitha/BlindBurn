import React, { useEffect, useState } from 'react';
import GenerateUserKey from './nillion/components/GenerateUserKey';
import CreateClient from './nillion/components/CreateClient';
import * as nillion from '@nillion/client-web';
import { NillionClient, NadaValues } from '@nillion/client-web';
import ComputeForm from './nillion/components/ComputeForm';
import ConnectionInfo from './nillion/components/ConnectionInfo';
import LRHousingFormComponent from './nillion/components/LinearRegressionForm';
import {
  Box,
  Typography,
  Container,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Card,
  CardContent,
  Grid,
  useTheme,
} from '@mui/material';

export default function BlindInferencePage() {
  const theme = useTheme();
  // Party0 previously stored this program in the Nillion Testnet
  const programName = 'linear_regression_12';
  const programId =
    'NXxpgUdTRqCJAfC46rfoVvszvKkq9FkpYqHYrV81X66QimjbzdV9KWWCzQitYae4GHGKfqSMdrTuivgX7rKjHD5/linear_regression_12';

  // Party0 previously created the program and stored the model state
  const partyName_model_state = 'Party0';
  const partyId_model_state =
    '12D3KooWGXaSfWKAMtT1gYNMtdTurvMR4rqKaS5HNFU3Mubq9nRJ';
  const storeId_model_state = '9ebfc88f-9dfe-4ccd-a804-9ab15d13c486';

  const partyName = 'Party1'; // inference party
  const defaultUserKeySeed = 'inference_1'; // Party0 gave this user compute permissions
  const outputName = 'my_output';

  const [userkey, setUserKey] = useState<string | null>(null);
  const [client, setClient] = useState<NillionClient | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [partyId, setPartyId] = useState<string | null>(null);
  const [additionalComputeValues, setAdditionalComputeValues] =
    useState<NadaValues | null>(null);
  const [computeResult, setComputeResult] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (userkey && client) {
      setUserId(client.user_id);
      setPartyId(client.party_id);
    }
  }, [userkey, client]);

  // Auto-advance step when client is connected
  useEffect(() => {
    if (userkey && client && activeStep === 0) {
      setActiveStep(1);
    }
  }, [userkey, client, activeStep]);

  // Auto-advance step when compute values are ready
  useEffect(() => {
    if (additionalComputeValues && activeStep === 1) {
      setActiveStep(2);
    }
  }, [additionalComputeValues, activeStep]);


  const handleInputFeatureDataSet = (inputFeatureDataSet: any) => {
    const additionalComputeValues = new nillion.NadaValues();

    Object.keys(inputFeatureDataSet).forEach((key) => {
      const value = inputFeatureDataSet[key];
      console.log(key, value === 0 ? 1 : value * Math.pow(2, 32));
      additionalComputeValues.insert(
        key,
        nillion.NadaValue.new_secret_integer(
          (value === 0 ? 1 : value * Math.pow(2, 32)).toString()
        )
      );
    });

    setAdditionalComputeValues(additionalComputeValues);
  };

  const handleComputeResult = (result: any) => {
    console.log(result);
    // Rescale the obtained result by the quantization scale
    const rescaledResult = parseFloat(result.value) / Math.pow(2, 32);
    console.log(rescaledResult);
    setComputeResult(rescaledResult.toString());
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const steps = [
    {
      label: 'Connect to Nillion Network',
      description: 'Generate your user key and connect to the decentralized network.',
      content: (
        <Box sx={{ mt: 2 }}>
          <GenerateUserKey
            setUserKey={setUserKey}
            defaultUserKeySeed={defaultUserKeySeed}
          />
          {userkey && (
            <Box mt={2}>
              <CreateClient userKey={userkey} setClient={setClient} />
            </Box>
          )}
          <Box mt={2}>
            <ConnectionInfo client={client} userkey={userkey} />
          </Box>
        </Box>
      ),
    },
    {
      label: 'Set Input Features',
      description: 'Enter the housing details to predict the price.',
      content: (
        <Box sx={{ mt: 2 }}>
          {client ? (
            <LRHousingFormComponent setData={handleInputFeatureDataSet} />
          ) : (
            <Typography color="error">Please connect to Nillion first.</Typography>
          )}
        </Box>
      ),
    },
    {
      label: 'Secure Blind Computation',
      description: 'Run the prediction model securely without revealing your input data.',
      content: (
        <Box sx={{ mt: 2 }}>
          {client &&
            programId &&
            storeId_model_state &&
            partyId &&
            additionalComputeValues ? (
            <ComputeForm
              shouldRescale
              nillionClient={client}
              programId={programId}
              additionalComputeValues={additionalComputeValues}
              storeIds={[storeId_model_state]}
              inputParties={[
                // Party0
                {
                  partyName: partyName_model_state,
                  partyId: partyId_model_state,
                },
                // Party1
                {
                  partyName,
                  partyId,
                },
              ]}
              outputParties={[{ partyName, partyId }]}
              outputName={outputName}
              onComputeProgram={handleComputeResult}
            />
          ) : (
            <Typography color="textSecondary">
              Waiting for input data...
            </Typography>
          )}
        </Box>
      ),
    },
  ];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box mb={6} textAlign="center">
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`, webkitBackgroundClip: 'text', webkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>
          Housing Price Predictor
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ maxWidth: 800, mx: 'auto' }}>
          Secure, blind inference using Nillion's localized privacy technology.
          Predict house prices without ever revealing your private input data to the model owner.
        </Typography>
      </Box>

      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              <Typography variant="h6">{step.label}</Typography>
            </StepLabel>
            <StepContent>
              <Typography color="textSecondary" paragraph>{step.description}</Typography>
              {step.content}
              <Box sx={{ mb: 2, mt: 3 }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={index === steps.length - 1}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Next Step'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1, color: theme.palette.text.secondary }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {computeResult && (
        <Grid container justifyContent="center" sx={{ mt: 4 }}>
          <Grid item xs={12} md={8}>
            <Card sx={{ background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(76, 175, 80, 0.05))', border: `1px solid ${theme.palette.primary.main}`, boxShadow: `0 0 20px -5px ${theme.palette.primary.main}40` }}>
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h5" color="textSecondary" gutterBottom>
                  Predicted House Price
                </Typography>
                <Typography variant="h2" component="div" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
                  ${parseFloat(computeResult).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  Calculated blindly using linear regression
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
