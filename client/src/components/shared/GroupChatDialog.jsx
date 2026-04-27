import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { MessageSquare } from "lucide-react";
import socket from "@/lib/socket";

export function GroupChatDialog({ taskId }) {
    const currentUser = "Aman";

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch(
                    `http://localhost:8080/api/task/${taskId}/messages`
                );
                const data = await res.json();
                setMessages(data);
            } catch (err) {
                console.error(err);
            }
        };

        if (taskId) fetchMessages();
    }, [taskId]);
    useEffect(() => {
        if (!taskId) return;

        socket.emit("join_task", taskId);

        const handler = (msg) => {
            setMessages((prev) => [...prev, msg]);
        };

        socket.on("receive_message", handler);

        return () => {
            socket.off("receive_message", handler);
        };
    }, [taskId]);
    const sendMessage = () => {
        if (!input.trim()) return;

        const messageData = {
            user: currentUser,
            text: input,
            taskId,
        };

        socket.emit("send_message", messageData);
        setInput("");
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                    <MessageSquare size={18} />
                    <span className="text-sm">Chat</span>
                </Button>
            </DialogTrigger>

            <DialogContent className="flex flex-col h-[70vh] max-w-lg p-0">
                <DialogHeader className="px-4 py-3 border-b">
                    <DialogTitle>Task Chat</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
                    {messages.map((msg) => {
                        const isMine = msg.sender === currentUser;

                        return (
                            <div
                                key={msg._id}
                                className={`flex flex-col ${isMine ? "items-end" : "items-start"
                                    }`}
                            >
                                {!isMine && (
                                    <p className="text-xs mb-1 text-muted-foreground">
                                        {msg.sender}
                                    </p>
                                )}

                                <div
                                    className={`px-3 py-2 rounded-lg max-w-[70%] text-sm ${isMine
                                            ? "bg-blue-500 text-white"
                                            : "bg-muted text-foreground"
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Input */}
                <div className="border-t px-3 py-4 flex items-center gap-2">
                    <Input
                        placeholder="Type a message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <Button
                        className="rounded-lg text-base font-medium bg-linear-to-r from-violet-400 via-purple-500 to-indigo-500 text-white shadow-md hover:opacity-90"
                        onClick={sendMessage}
                    >
                        Send
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}