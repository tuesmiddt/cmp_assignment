const ENDPOINT = process.env.API_HOST + '/api';

export type Submission = {
  name: string;
  temperature: number;
  hasSymptoms: boolean;
  hasContact: boolean;
  createdAt?: Date;
};

async function submitForm(entry: Submission): Promise<boolean> {
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

async function getSubmissions(): Promise<Array<Submission>> {
  const path = ENDPOINT + '/declaration_form';
  try {
    const response = await fetch(path);
    const data = await response.json();
    return data.map((entry: any) => {
      entry.createdAt = new Date(entry.createdAt);
      return entry;
    });
  } catch (_) {
    return [];
  }
}

export { submitForm, getSubmissions };
