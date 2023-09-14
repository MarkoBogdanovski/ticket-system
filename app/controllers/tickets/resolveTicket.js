const { User, Ticket } = require('../../models');

// Route for resolving a ticket
const resolveTicket = async (req, res) => {
  const { ticketId } = req.params;
  try {
    const ticket = await Ticket.findByPk(ticketId);

    if(!ticket || ticket.resolved) {
      res.status(201).json({ error: 'Ticket not found or resolved' });
    } else {
      const response = await assignTicketToAgent(ticket);
      res.status(201).json(response);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Assign unassigned ticket to the current agent
const assignTicketToAgent = async (ticket) => {
  try {
    const agent = await User.findByPk(ticket.assignedTo);
    const newTicket = await Ticket.findOne({
      where: { resolved: false, assignedTo: null }
    });

    await ticket.update({ resolved: true, assignedTo: null });
    if(newTicket) {
      await newTicket.update({ assignedTo: agent.id });
      return { ticket, message: 'This agent was assigned an unresolved ticket.' };
    } else {
      await agent.update({ available: true });
      return { agent, message: 'This agent is now available because there are no unresolved tickets.' };
    }
  } catch (error) {
    return error;
  }
};

module.exports = resolveTicket;
