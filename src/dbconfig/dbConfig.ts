import mongoose from 'mongoose';

export async function connect() {
  try {
    const mongoUri = process.env.MONGO_DB_URI;
    if (!mongoUri) throw new Error('MONGO_DB_URI not found in environment variables');

    console.log('Attempting to connect to MongoDB...'); // Log for debugging

    await mongoose.connect(mongoUri);

    const connection = mongoose.connection;

    // Log successful connection immediately after connection
    connection.on('connected', () => {
      console.log('✅ MongoDB connected successfully');
    });

    // Log connection error
    connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
      // Do not exit the process, let the server keep running
    });

    // Log if there's an initial connection
    connection.once('open', () => {
      console.log('MongoDB connection opened successfully.');
    });

  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    throw error;
  }
}