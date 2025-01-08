'use client'

import React, { useState, useRef, useEffect, FormEvent } from "react";
import {
    Box,
    Container,
    TextField,
    Button,
    Paper,
    Typography,
    CircularProgress
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import { styled } from "@mui/system";
import { IoSend } from "react-icons/io5";

interface Message {
    text: string;
    isUser: boolean;
    timestamp: string;
}

const ChatContainer = styled(Paper)(({ theme }) => ({
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    backgroundColor: "#f5f5f5",
}));

const MessagesContainer = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    overflow: "auto",
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
}));

interface MessageBubbleProps {
    isUser: boolean;
}

const MessageBubble = styled(Box)<MessageBubbleProps>(({ theme, isUser }) => ({
    maxWidth: "70%",
    padding: theme.spacing(1.5),
    marginBottom: theme.spacing(1),
    borderRadius: theme.spacing(2),
    backgroundColor: isUser ? theme.palette.primary.main : "#fff",
    color: isUser ? "#fff" : theme.palette.text.primary,
    alignSelf: isUser ? "flex-end" : "flex-start",
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
    animation: "fadeIn 0.3s ease-in",
    "@keyframes fadeIn": {
        from: { opacity: 0, transform: "translateY(10px)" },
        to: { opacity: 1, transform: "translateY(0)" },
    },
}));

const TimeStamp = styled(Typography)(({ theme }) => ({
    fontSize: "0.7rem",
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(0.5),
}));

const ChatInterface: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const botResponses: string[] = [
        "Hello! How can I help you today?",
        "That's interesting! Tell me more.",
        "I understand your concern. Let me assist you.",
        "Thank you for sharing that information.",
        "Is there anything else you'd like to know?",
    ];

    const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        const newUserMessage: Message = {
            text: inputMessage,
            isUser: true,
            timestamp: new Date().toLocaleTimeString(),
        };

        setMessages((prev) => [...prev, newUserMessage]);
        setInputMessage("");
        setIsLoading(true);

        // Simulate bot response
        setTimeout(() => {
            const botMessage: Message = {
                text: botResponses[Math.floor(Math.random() * botResponses.length)],
                isUser: false,
                timestamp: new Date().toLocaleTimeString(),
            };
            setMessages((prev) => [...prev, botMessage]);
            setIsLoading(false);
        }, 1000);
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <ChatContainer elevation={3}>
                <MessagesContainer>
                    {messages.map((message, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: message.isUser ? "flex-end" : "flex-start",
                            }}
                        >
                            <MessageBubble isUser={message.isUser}>
                                <Typography variant="body1">{message.text}</Typography>
                            </MessageBubble>
                            <TimeStamp variant="caption">{message.timestamp}</TimeStamp>
                        </Box>
                    ))}
                    {isLoading && (
                        <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 1 }}>
                            <CircularProgress size={20} />
                        </Box>
                    )}
                    <div ref={messagesEndRef} />
                </MessagesContainer>

                <Box component="form" onSubmit={handleSendMessage} sx={{ width: "100%" }}>
                    <Grid container alignItems="center" sx={{ width: "100%" }}>
                        <Grid sx={{ width: "70%" }}>
                            <TextField
                                fullWidth
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                placeholder="Type your message..."
                                variant="outlined"
                                size="small"
                                disabled={isLoading}
                                aria-label="Message input"
                            />
                        </Grid>
                        <Grid sx={{ width: "30%" }}>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={isLoading || !inputMessage.trim()}
                                endIcon={<IoSend />}
                                sx={{ height: "40px" }}
                            >
                                Send
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </ChatContainer>
        </Container>
    );
};

export default ChatInterface;
