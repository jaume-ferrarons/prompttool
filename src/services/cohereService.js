// src/services/cohereService.js

import { buildAnswer } from './aiServiceCommon';

const BASE_URL = 'https://api.cohere.ai/v1/chat';

export const cohereParameters = [
  {
    id: "model",
    type: "select",
    label: "Model",
    options: ["command", "command-light", "command-nightly", "command-light-nightly"],
    default: "command",
    fullWidth: false
  },
  {
    id: "temperature",
    type: "float",
    label: "Temperature",
    default: 0.3,
    min: 0,
    max: 5,
    step: 0.1,
    fullWidth: false
  },
  {
    id: "prompt_truncation",
    type: "select",
    label: "Truncation",
    options: ["OFF", "AUTO"],
    default: "AUTO",
    fullWidth: false
  },
  {
    id: "preamble_override",
    type: "text",
    label: "Preamble Override",
    default: "",
    fullWidth: true
  }
];

const getCohereResponse = async (prompt, parameters) => {
  const cohereApiKey = localStorage.getItem('cohereApiKey');

  if (!cohereApiKey) {
    throw new Error('Cohere API key not found in local storage.');
  }

  const headers = {
    'Authorization': `Bearer ${cohereApiKey}`,
    'Content-Type': 'application/json',
  };

  const body = {
    model: 'command',
    message: prompt,
    temperature: 0.3,
    chat_history: [],
    prompt_truncation: 'AUTO',
    stream: false,
    citation_quality: 'accurate',
    connectors: [],
    documents: [],
    ...parameters
  };

  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return buildAnswer(response.status, data);
};

export default getCohereResponse;
