// openai.js

import axios from 'axios';

const MODEL_CONFIG = {
  id: 'tiiuae/falcon-7b-instruct',
  name: 'Falcon-7B-Instruct',
  description: 'A large language model trained by Tii UAE using the Falcon architecture.',
  tokenizer: 'AutoTokenizer',
  pipeline: 'text-generation',
};

const PARAMETERS = {
  max_new_tokens: 150,
  temperature: 0.7,
  top_k: 50,
  top_p: 0.95,
  repetition_penalty: 1.2,
  length_penalty: 1,
  num_return_sequences: 1,
  stop_sequence: '\n\nHuman:',
};

const API_KEY = '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';

export async function sendMsgToHuggingFace(searchQuery) {
  try {
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${MODEL_CONFIG.id}`,
      {
        inputs: searchQuery,
        parameters: PARAMETERS,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    const generatedText = response.data[0].generated_text;
    const cleanedText = generatedText.replace(searchQuery, '').trim();
    return cleanedText;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}