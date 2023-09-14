const { User } = require('../models'); // Import your User model

const seedUsers = async () => {
  try {
    // Define an array of user data that you want to insert
    const usersData = [
      { name: 'John Doe' },
      { name: 'Novak Djokovic' },
      { name: 'Nikola Jokic' },
      { name: 'Bogdan Bogdanovic' },
      // Add more user data as needed
    ];

    // Insert the user data into the User table
    await User.bulkCreate(usersData);

    console.log('User table seeded successfully');
  } catch (error) {
    console.error('Error seeding User table:', error);
  }
};

seedUsers();
