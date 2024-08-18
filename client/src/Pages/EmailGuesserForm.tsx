import {
  Box,
  Button,
  Container,
  Group,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import styles from './EmailGuesserForm.module.css';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';
const apiUrl = 'http://localhost:5000';

type FormInput = {
  fullName: string;
  domain: string;
};

const EmailGuesserForm = () => {
  const [derivedEmail, setDerivedEmail] = useState<string>('');

  const form = useForm({
    initialValues: {
      fullName: '',
      domain: '',
    },
    validate: {
      fullName: (value) =>
        value.length < 3 ? 'Name must have at least 3 letters' : null,
      domain: (value) =>
        /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/.test(value)
          ? null
          : 'Invalid domain',
    },
  });

  const handleSubmit = async (values: FormInput) => {
    try {
      const response = await fetch(`${apiUrl}/email-guesser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setDerivedEmail(data.email);
    } catch (error: any) {
      console.log(error);
      notifications.show({
        color: 'red',
        title: 'Error',
        message: error?.message || 'An error occurred',
      });
    }
  };

  const handleClear = () => {
    form.reset();
    setDerivedEmail('');
  };

  return (
    <Container className={styles.container} fluid size="xl">
      <form onSubmit={form.onSubmit(handleSubmit)} className={styles.formBox}>
        <Title order={2} mb="lg">
          Email Guesser
        </Title>
        <TextInput
          label="Full Name"
          placeholder="Enter your full name"
          key={form.key('fullName')}
          {...form.getInputProps('fullName')}
          mb="sm"
        />
        <TextInput
          label="Company Domain"
          placeholder="Enter your company domain"
          key={form.key('domain')}
          {...form.getInputProps('domain')}
          mb="lg"
        />
        <Group grow>
          <Button type="submit" color="blue">
            Submit
          </Button>
          <Button variant="outline" onClick={handleClear}>
            Clear
          </Button>
        </Group>
      </form>

      {derivedEmail && (
        <Box mt="xl" className={styles.formBox}>
          <Title order={3}>The guessed email is:</Title>
          <Text size="lg">{derivedEmail}</Text>
        </Box>
      )}
    </Container>
  );
};

export default EmailGuesserForm;
