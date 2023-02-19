import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createMessage, getMessage, approveMessage } from './services/api';
import { Message } from './types';

class Notification extends React.Component<{ onAcknowledge: any }> {
    render() {
        let {onAcknowledge} = this.props;
        return (
            <div>
                A new message has been received. Do you want to acknowledge it?
                <button onClick={onAcknowledge}>Acknowledge</button>
            </div>
        );
    }
}

const App: React.FC = () => {
    const [message, setMessage] = useState<Message | null>(null);
    const [newMessage, setNewMessage] = useState('');
    const [approveId, setApproveId] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [approvedMessage, setApprovedMessage] = useState('');

    const handleCreateMessage = async () => {
        try {
            setNewMessage('');
            setErrorMessage('');
            await createMessage(newMessage);
        } catch (error) {
            console.error('Error creating message: %s, [%s]', error, newMessage);
            setErrorMessage("Error creating message");
        }
    };

    const handleGetMessage = async () => {
        try {
            setApprovedMessage('');
            setErrorMessage('');
            const message = await getMessage();
            setMessage(message);
            setShowNotification(true);
        } catch (error) {
            console.error('Error getting messages:', error);
            setErrorMessage("No messages available");
        }
    };

    const handleApproveMessage = async (public_id?: string) => {
        const idToApprove = public_id || approveId;
        setErrorMessage('');
        setApprovedMessage('');
        try {
            const isApproved = await approveMessage(idToApprove);
            if (isApproved === "true") {
                setApprovedMessage('Message approved');
            } else {
                setApprovedMessage("Can't approve message");
            }
        } catch (error) {
            console.error('Error approving message:', error);
            setErrorMessage("Error approving message:");
        }
    };

    return (
        <div className="container">
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    value={newMessage}
                    onChange={(event) => setNewMessage(event.target.value)}
                    placeholder="Type your message here"
                />
                <button
                    type="button"
                    className="btn btn-primary"
                    disabled={!newMessage}
                    onClick={handleCreateMessage}
                >
                    Send
                </button>
            </div>
            <div className="form-group">
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleGetMessage}
                >
                    Get Message
                </button>
            </div>
            {message ? <div className="message">{message.content}</div> :
                <div className="no-message">No messages yet.</div>}
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    value={approveId}
                    onChange={(event) => setApproveId(event.target.value)}
                    placeholder="Enter message ID"
                />
                <button
                    type="button"
                    className="btn btn-success"
                    disabled={!approveId}
                    onClick={() => handleApproveMessage(approveId)}
                >
                    Approve
                </button>
            </div>
            {message && message.public_id && showNotification && (
                <Notification
                    onAcknowledge={() => {
                        setShowNotification(false);
                        handleApproveMessage(message.public_id);
                    }}
                />
            )}
            {errorMessage && <div className="error-message">Error: {errorMessage}</div>}
            {approvedMessage && <div className="approved-message">{approvedMessage}</div>}
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);