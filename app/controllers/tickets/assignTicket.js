const { User, Ticket } = require('../../models');

const assignTicket = async (req, res, next) => {
  try {
    const availableAgent = await User.findAll({
      where: { available: true },
    });

    let response;
    if (availableAgent) {
      response = await assignAgentsToTickets(availableAgent);
    } else {
      response = { error: 'No available agents.' };
    }
    return res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to assign ticket.' });
  }
};

const assignAgentsToTickets = async availableAgent => {
  try {
    const ticket = await Ticket.findAll({
      where: { resolved: false, assignedTo: null },
      order: [['createdAt', 'ASC']],
      limit: availableAgent.length,
    });

    if(availableAgent < 1) {
      return { message: 'All available agents were assigned a ticket.' };
    } else if (ticket.length > 0) {
      for (let i = 0; i < availableAgent.length; i++) {
        await availableAgent[i].update({ available: false });
        await ticket[i].update({ assignedTo: availableAgent[i].id });
      }
      return ticket
    } else {
      return { message: 'No unresolved and unassigned tickets.' };
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}


module.exports = assignTicket;
