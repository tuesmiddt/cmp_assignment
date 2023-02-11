const ENDPOINT = 'http://localhost:8000/api';

async function submitForm(entry: {
  name: string;
  temperature: number;
  hasSymptoms: boolean;
  hasContact: boolean;
}): Promise<boolean> {
  const path = ENDPOINT + '/declaration_form/submit';
  try {
    const response = await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    });

    return response.status < 300;
  } catch (_) {
    return false;
  }
}

export { submitForm };
