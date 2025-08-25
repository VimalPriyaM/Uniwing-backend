const Event = require('../Model/eventModel')

//eventcreation
exports.createEvent = async (req, res, next) => {
    try {
        const { id } = req.params; // student ID
        const { title, description, startDate, endDate, timeFrom, timeTo, range, college } = req.body;

        const imagePath = req.file ? "/uploads/" + req.file.filename : null;

        const event = new Event({
            title,
            description,
            startDate,
            endDate,
            timeFrom,
            timeTo,
            range,
            image: imagePath,
            college,
            student: id  
        });

        await event.save();

        return res.status(200).json({ message: "Event created successfully", data: event });
    } catch (err) {
        return res.status(500).json({ message: "Error creating event", error: err.message });
    }
};


//getallevent
exports.getAllEvents = async (req, res, next) => {
    try {
        const events = await Event.find().populate('college' , 'name city')
        return res.status(200).json({ message: "Events fetched successfully", data: events });
    } catch (err) {
        return res.status(500).json({ message: "Error fetching events", error: err.message });
    }
};

exports.getEventById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const events = await Event.find({ student: id }).populate({
      path: 'college',
      select: 'name city',
      populate: {
        path: 'city',
        select: 'name'
      }
    });

    if (!events || events.length === 0) {
      return res.status(404).json({ message: "No events found for this student" });
    }

    return res.status(200).json({ message: "Events fetched successfully", data: events });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching event", error: err.message });
  }
};


//updateevent
exports.updateEvent = async (req, res, next) => {
    try {
        const {id} = req.params
        const event = await Event.findByIdAndUpdate(id, req.body, { new: true }).populate('college', ' name city');
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        return res.status(200).json({ message: "Event updated successfully", data: event });
    } catch (err) {
        return res.status(500).json({ message: "Error updating event", error: err.message });
    }
};


//deleteevent
exports.deleteEvent = async (req, res, next) => {
    try {
        const{id} = req.params
        const event = await Event.findByIdAndDelete(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        return res.status(200).json({ message: "Event deleted successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Error deleting event", error: err.message });
    }
};
