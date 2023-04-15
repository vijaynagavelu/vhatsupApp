import { createContext, useState } from "react";

const ChatContext = createContext();

export function ChatProvider({ children }) {

    // const [contact, setContact] = useState({
    //     name: "A", lastSeen: "today at 16.30", messageTime: "14.58", message: "✔️Oii", pinned: "📌", imgLink: "https://pps.whatsapp.net/v/t61.24694-24/328047901_616026917026496_7016975100096517799_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_AdSsXVZhLMQDMX4D0MAxeZgQ-lwyUxE-k2oMJqiJW4sZlQ&oe=64156A15",
    // });

    const [contact, setContact] = useState();

    const showContact = (contact) => {
        setContact(contact);
    }

    return (
        <ChatContext.Provider value={{ contact, showContact }}>
            {children}
        </ChatContext.Provider>
    );
}

export default ChatContext;
