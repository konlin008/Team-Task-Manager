import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { MessageSquare } from "lucide-react"

export function GroupChatDialog() {
    const currentUser = "Aman"

    const [messages, setMessages] = useState([
        { id: 1, user: "Aman", text: "Hey team 👋" },
        { id: 2, user: "Rahul", text: "What's the update?" },
    ])

    const [input, setInput] = useState("")

    const sendMessage = () => {
        if (!input.trim()) return

        setMessages((prev) => [
            ...prev,
            {
                id: Date.now(),
                user: currentUser,
                text: input,
            },
        ])

        setInput("")
    }

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
                    <DialogTitle>Project Team Chat</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
                    {messages.map((msg) => {
                        const isMine = msg.user === currentUser

                        return (
                            <div
                                key={msg.id}
                                className={`flex flex-col ${isMine ? "items-end" : "items-start"
                                    }`}
                            >
                                {!isMine && (
                                    <p className="text-xs mb-1 text-muted-foreground">
                                        {msg.user}
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
                        )
                    })}
                </div>

                <div className="border-t px-3 py-5 flex items-center gap-2">
                    <Input
                        placeholder="Type a message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <Button className=" rounded-lg  text-base font-medium bg-linear-to-r from-violet-400 via-purple-500 to-indigo-500 text-white shadow-md hover:opacity-90 transition-all" onClick={sendMessage}>Send</Button>
                </div>
            </DialogContent>
        </Dialog >
    )
}