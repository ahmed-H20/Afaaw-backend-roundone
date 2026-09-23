const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoute = require('./routes/productRoute');
const cartRoute = require('./routes/cartRoutes');
const categoryRoute = require('./routes/categoryRoutes');
const orderRoute = require('./routes/orderRoutes');
const reviewRoute = require('./routes/reviewRoutes');
const userRoute = require('./routes/userRoutes');
const ApiError = require('./utils/ApiError');
const globalError = require('./middleware/errorHandler.middleware');

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.send('Hello, World!');
});

const startServer = async () => {
	try {
		await connectDB();

		app.use('/api/v1/products', productRoute);
		app.use('/api/v1/cart', cartRoute);
		app.use('/api/v1/categories', categoryRoute);
		app.use('/api/v1/order', orderRoute);
		app.use('/api/v1/review', reviewRoute);
		app.use('/api/v1/user', userRoute);

		app.use((req, res, next) => {
			next(new ApiError('Route is not found', 404));
		});

		app.use(globalError);

		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	} catch (error) {
		console.error('Failed to start server:', error);
		process.exit(1);
	}
};

startServer();
