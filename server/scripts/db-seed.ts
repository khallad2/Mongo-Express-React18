import Story, { IStory } from '../src/models/Story';

/**
 * Example of Seed to the database with initial data.
 * @returns {Promise<void>} A Promise that resolves once the seeding is complete or rejects on error.
 */
const seedDatabase = async (): Promise<void> => {
    try {
        // Example data to seed the database with
        const storiesData: IStory[] = [
            // Add Stories
        ];

        // Use Mongoose to insert the data into the database
        await Story.insertMany(storiesData);

        // Log a success message upon successful seeding
        console.log('Database seeded successfully 🌱');
    } catch (error) {
        // Log an error message if the seeding fails
        console.error('Failed to seed the database:', error);
    }
};

export default seedDatabase;
