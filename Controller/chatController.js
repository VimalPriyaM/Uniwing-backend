const { text } = require('express')
const Chat = require('../Model/chatModel')


exports.send = async (req, res, next) => {
    try {
        const { sender, receiver, message } = req.body
        if (!sender || !receiver || !message) {
            return res.status(400).json({ message: "sender , receiver and message fields are required" })
        }

        // Find or create a chat document for the participants
        let chat = await Chat.findOne({ participants: { $all: [sender, receiver] } })
        if (!chat) {
            chat = new Chat({
                participants: [sender, receiver],
                messages: [{ sender, text: message }]
            })
        } else {
            chat.messages.push({ sender, text: message })
        }
        await chat.save()

        res.status(200).json(chat)
    }
    catch (err) {
        return res.status(500).json({ message: 'Error in chat ', error: err.message })
    }
}


exports.allMessages = async (req, res, next) => {
    try {
        const { student1, student2 } = req.params
        const chats = await Chat.findOne({ participants: { $all: [student1, student2] } })
            .populate('messages.sender', 'name')
        if(!chats){
            return res.status(404).json({ message: 'No chat found between these participants' });
        }
        return res.status(200).json(chats)
    } catch (err) {
        return res.status(500).json({ message: 'Error fetching chats', error: err.message })
    }
}