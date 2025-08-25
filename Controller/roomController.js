const Rooms = require('../Model/roomModel');

// Create Room
exports.createRoom = async (req, res, next) => {
    try {
        const { noOfVacancy, rent, description, status, college, studentId } = req.body; // Added studentId
        const room = new Rooms({ noOfVacancy, rent, description, status, college, studentId });
        await room.save();
        return res.status(200).json({ message: "Room created successfully",room});

        
    } catch (err) {
        return res.status(500).json({ message: "Error creating room", error: err.message });
    }
};

// Get All Rooms
exports.getAllRooms = async (req, res, next) => {
    try {
        const rooms = await Rooms.find().populate('college', 'name city');
        return res.status(200).json(rooms);
    } catch (err) {
        return res.status(500).json({ message: "Error fetching rooms", error: err.message });
    }
};

// Get Rooms By Student ID
exports.getRoomById = async (req, res, next) => {
    try {
        const { id } = req.params; // id refers to studentId
        const rooms = await Rooms.find({ studentId: id }).populate('college', 'name city');

        if (!rooms.length) {
            return res.status(404).json({ message: "No rooms found for this student" });
        }
        return res.status(200).json(rooms);
    } catch (err) {
        return res.status(500).json({ message: "Error fetching rooms", error: err.message });
    }
};

// Update Room Status
exports.updateRoomStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!['Available', 'Occupied'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        const updatedRoom = await Rooms.findByIdAndUpdate(id, { status }, { new: true }).populate('college', 'name city');
        if (!updatedRoom) {
            return res.status(404).json({ message: "Room not found" });
        }
        return res.status(200).json(updatedRoom);
    } catch (err) {
        return res.status(500).json({ message: "Error updating room status", error: err.message });
    }
};

// Delete Room
exports.deleteRoom = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedRoom = await Rooms.findByIdAndDelete(id);

        if (!deletedRoom) {
            return res.status(404).json({ message: "Room not found" });
        }
        return res.status(200).json({ message: "Room deleted successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Error deleting room", error: err.message });
    }
};
