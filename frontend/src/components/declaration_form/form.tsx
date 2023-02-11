import { useState } from 'react';
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
  RadioGroup,
  Radio,
  Button,
  FormErrorMessage,
} from '@chakra-ui/react';
import { submitForm } from '@/lib/api';

export default function Form(props: {
  onSuccess: () => void;
  onFailure: () => void;
}) {
  const [name, setName] = useState('');
  const [temperature, setTemperature] = useState('');
  const [hasSymptoms, setHasSymptoms] = useState('');
  const [hasContact, setHasContact] = useState('');
  const [attemptSubmit, setAttemptSubmit] = useState(false);

  const onSubmit = async () => {
    const entry = {
      name,
      temperature: Number(temperature),
      hasSymptoms: Boolean(hasSymptoms),
      hasContact: Boolean(hasContact),
    };

    const success = await submitForm(entry);
    if (success) {
      props.onSuccess();
    } else {
      props.onFailure();
    }
  };

  return (
    <Container maxW="100%">
      <VStack spacing="16px" alignItems="left">
        <FormControl isRequired isInvalid={attemptSubmit && name.length === 0}>
          <FormLabel>1. Name</FormLabel>
          <Input
            type="text"
            placeholder="Enter name here"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormErrorMessage>Name is required.</FormErrorMessage>
        </FormControl>
        <FormControl
          isRequired
          isInvalid={
            attemptSubmit &&
            (isNaN(Number(temperature)) ||
              Number(temperature) < 35 ||
              Number(temperature) > 42)
          }
        >
          <FormLabel>2. Temperature (°C)</FormLabel>
          <Input
            type="number"
            placeholder="Enter temperature here e.g. 36.5"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
          />
          <FormErrorMessage>
            A valid number between 35 and 42 is required.
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isRequired
          isInvalid={attemptSubmit && hasSymptoms.length === 0}
        >
          <FormLabel>
            3. Do you have any of the following symptoms now or within the last
            14 days: Cough, smell/taste impairment, fever, breathing
            difficulties, body aches, headaches, fatigue, sore throat,
            diarrhoea, and / or runny nose (even if your symptoms are mild)?
          </FormLabel>
          <RadioGroup value={hasSymptoms} onChange={setHasSymptoms}>
            <HStack>
              <Radio value="true">Yes</Radio>
              <Radio value="false">No</Radio>
            </HStack>
          </RadioGroup>
          <FormErrorMessage>Selection is required.</FormErrorMessage>
        </FormControl>
        <FormControl
          isRequired
          isInvalid={attemptSubmit && hasContact.length === 0}
        >
          <FormLabel>
            4. Have you been in contact with anyone who is suspected to have
            or/has been diagnosed with Covid-19 within the last 14 days?
          </FormLabel>
          <RadioGroup value={hasContact} onChange={setHasContact}>
            <HStack>
              <Radio value="true">Yes</Radio>
              <Radio value="false">No</Radio>
            </HStack>
          </RadioGroup>
          <FormErrorMessage>Selection is required.</FormErrorMessage>
        </FormControl>
        <Button
          colorScheme="blue"
          w={['100%', '100%', '100px']}
          onClick={async () => {
            setAttemptSubmit(true);
            await onSubmit();
          }}
        >
          Submit
        </Button>
      </VStack>
    </Container>
  );
}
