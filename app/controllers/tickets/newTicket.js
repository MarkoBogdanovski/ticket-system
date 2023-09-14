const { User, Ticket } = require('../../models');

// Create new ticket
const newTicket = async (req, res, next) => {
  try {
    const ticket = await createTicket(req.body);
    const response = await assignAgent(ticket);

    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to create ticket.' });
  }
};

const createTicket = async data => {
  try {
    return await Ticket.create(data);
  } catch (error) {
    console.error(error);
    return error;
  }
}

// Assign available agent
const assignAgent = async (ticket) => {
  try {
    const availableAgent = await User.findOne({
      where: { available: true },
    });

    if (availableAgent) {
      await availableAgent.update({ available: false });
      await ticket.update({ assignedTo: availableAgent.id });
      return ticket;
    } else {
      return { ticket, message: 'Ticket will be automatically assigned to our available agents.' };
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to create ticket.' });
  }
};

module.exports = newTicket;
