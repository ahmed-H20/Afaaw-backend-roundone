const mongoose = require('mongoose');
const dns = require('node:dns');

dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = () => {
	try {
		mongoose.connect(process.env.MONGODB_URI).then(() => {
			console.log('MongoDB connected ✅');
		});
	} catch (error) {
		console.error('MongoDB connection failed ❌', error);
		process.exit(1);
	}
};

module.exports = connectDB;
