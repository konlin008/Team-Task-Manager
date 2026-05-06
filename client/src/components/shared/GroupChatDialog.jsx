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
import { usePreviousMessages } from "@/hooks/messages.hooks";
import useAuthStore from "@/store/useAuthStore";

export function GroupChatDialog({ taskId }) {
    const user = useAuthStore((state) => state.user);
    const currentUser = user?._id;

    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const { data, isSuccess } = usePreviousMessages(taskId);

    useEffect(() => {
        if (isSuccess) {
            const msgs = Array.isArray(data)
                ? data
                : data?.messages || [];

            setMessages(msgs);
        }
    }, [isSuccess, data]);

    useEffect(() => {
        if (!open || !taskId) return;

        socket.emit("join_task", taskId);

        const handleReceive = (message) => {
            setMessages((prev) => [...prev, message]);
        };

        socket.on("receive_message", handleReceive);

        return () => {
            socket.emit("leave_task", taskId);

            socket.off("receive_message", handleReceive);
        };
    }, [open, taskId]);

    const sendMessage = () => {
        if (!input.trim()) return;

        socket.emit("send_message", {
            taskId,
            text: input,
        });

        setInput("");
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="flex items-center gap-2"
                >
                    <MessageSquare size={18} />
                    <span className="text-sm">Chat</span>
                </Button>
            </DialogTrigger>

            <DialogContent className="flex flex-col h-[70vh] max-w-lg p-0">
                <DialogHeader className="px-4 py-3 border-b">
                    <DialogTitle>Task Chat</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
                    {messages.map((item, index) => {

                        if (!item) return null;

                        const msg = item.message || item;

                        if (!msg) return null;

                        const isMine =
                            msg.sender?._id === currentUser ||
                            msg.sender === currentUser;

                        return (
                            <div
                                key={msg._id || index}
                                className={`flex flex-col ${isMine
                                    ? "items-end"
                                    : "items-start"
                                    }`}
                            >
                                {!isMine && (
                                    <p className="text-xs mb-1 text-muted-foreground">
                                        {msg.sender?.name || "User"}
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

                <div className="border-t px-3 py-4 flex items-center gap-2">
                    <Input
                        placeholder="Type a message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) =>
                            e.key === "Enter" && sendMessage()
                        }
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