import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { TextInput } from '@strapi/design-system/TextInput';
import { Stack } from '@strapi/design-system/Stack';
import { Box } from '@strapi/design-system/Box';
import { Button } from '@strapi/design-system/Button';
import { Textarea } from '@strapi/design-system';
import { TwoColsLayout } from '@strapi/design-system';


export default function Index({
  name,
  error,
  description,
  onChange,
  value,
  intlLabel,
  attribute,
}) {
  const { formatMessage } = useIntl();
  const [content, setContent] = useState('');
  const [prompt, setPrompt] = useState('');
  const [err, setErr] = useState(''); 

  const aiClick = async () => {
    try {
      const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}` //functionality to be added
        },
        body: JSON.stringify({
          'model': 'text-davinci-001',
          'prompt': `${prompt}`,
          'temperature': 0.4,
          'max_tokens': 64,
          'top_p': 1,
          'frequency_penalty': 0,
          'presence_penalty': 0
        })
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();
      onChange({ target: { name, value: result.choices[0].text, type: attribute.type } })
    } catch (err) {
      setErr(err.message);
    }
  }

  const clearGeneratedText = async () => {
    onChange({ target: { name, value: '', type: attribute.type } })

  }

  return (
    <Stack spacing={1}>
      <TextInput
        placeholder="Please write a prompt for content to generate"
        label="Prompt"
        name="Prompt"
        onChange={(e) => setPrompt(e.target.value)}
        value={prompt}
      />
      <Stack padding={4} spacing={2}>
        <Textarea
          placeholder="Generated text"
          label="Content"
          name="content"
          onChange={(e) =>
            onChange({
              target: { name, value: e.target.value, type: attribute.type },
            })
          }
        >
          {value}
        </Textarea>
        <Stack horizontal spacing={4}>
          <Button onClick={aiClick}>Generate</Button>
          <Button onClick={() => clearGeneratedText()}>Clear</Button>
        </Stack>
      </Stack>
    </Stack>
  )
}
