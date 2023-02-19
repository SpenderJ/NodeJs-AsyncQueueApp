import {Message} from '../types';

const BASE_URL = 'http://localhost:3001';

export const getMessage = async (): Promise<Message> => {
    const response = await fetch(`${BASE_URL}/message`);
    if (!response.ok) {
        throw new Error(`Failed to get message from API: ${response.status}`);
    }
    return response.json();
};

export const createMessage = async (message: string): Promise<string> => {
    const response = await fetch(`${BASE_URL}/message`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: message }),
    });

    if (!response.ok) {
        throw new Error(`Failed to create message via API: ${response.status}`);
    }

    return await response.text();
};

export const approveMessage = async (public_id: string): Promise<string> => {
    const response = await fetch(`${BASE_URL}/approve_message`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ public_id: public_id }),
    });

    console.log(response);

    if (!response.ok) {
        throw new Error(`Failed to approve message ${public_id} : ${response.status}`);
    }
    return await response.text();
};
