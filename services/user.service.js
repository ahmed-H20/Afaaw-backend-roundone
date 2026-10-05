import AppError from "../errors/app-error.js";
import User from "../models/user.model.js";

const publicUserFields = "name email phone address active role verified createdAt updatedAt";

const toPublicUser = (user) => ({
	id: String(user._id),
	name: user.name,
	email: user.email,
	phone: user.phone,
	address: user.address,
	active: user.active,
	role: user.role,
	verified: user.verified,
	createdAt: user.createdAt,
	updatedAt: user.updatedAt,
});

export const listUsers = async ({ page, limit, role, active }) => {
	const filter = {};
	if (role) filter.role = role;
	if (active !== undefined) filter.active = active;

	const [users, total] = await Promise.all([
		User.find(filter)
			.select(publicUserFields)
			.sort({ createdAt: -1, _id: -1 })
			.skip((page - 1) * limit)
			.limit(limit)
			.lean(),
		User.countDocuments(filter),
	]);

	return {
		users: users.map(toPublicUser),
		pagination: { page, limit, total, pages: Math.ceil(total / limit) },
	};
};

export const getUserById = async (id) => {
	const user = await User.findById(id).select(publicUserFields).lean();
	if (!user) throw new AppError("User not found", 404);
	return toPublicUser(user);
};

export const createUser = async (userData) => {
	const user = new User({ ...userData, role: "user", active: true, verified: false });
	await user.save();
	return toPublicUser(user);
};

export const updateUser = async (id, changes, adminId) => {
	const user = await User.findById(id).select(publicUserFields);
	if (!user) throw new AppError("User not found", 404);

	const isChangingOwnAccess = String(user._id) === adminId &&
		((changes.role !== undefined && changes.role !== user.role) || changes.active === false);
	if (isChangingOwnAccess) {
		throw new AppError("Admins cannot change their own role or deactivate their account", 403);
	}

	const losesActiveAdmin = user.role === "admin" && user.active &&
		(changes.role === "user" || changes.active === false);
	if (losesActiveAdmin && await User.countDocuments({ role: "admin", active: true }) <= 1) {
		throw new AppError("The last active admin cannot be demoted or deactivated", 409);
	}

	const changedFields = Object.fromEntries(
		Object.entries(changes).filter(([field, value]) => user[field] !== value),
	);
	if (Object.keys(changedFields).length === 0) return toPublicUser(user);

	const updatedUser = await User.findByIdAndUpdate(
		id,
		{ $set: changedFields, $inc: { tokenVersion: 1 } },
		{ returnDocument: "after", runValidators: true },
	).select(publicUserFields).lean();
	if (!updatedUser) throw new AppError("User not found", 404);
	return toPublicUser(updatedUser);
};

export const deleteUser = async (id, adminId) => {
	const user = await User.findById(id).select("role active");
	if (!user) throw new AppError("User not found", 404);
	if (String(user._id) === adminId) {
		throw new AppError("Admins cannot deactivate their own account", 403);
	}
	if (user.role === "admin" && user.active && await User.countDocuments({ role: "admin", active: true }) <= 1) {
		throw new AppError("The last active admin cannot be deactivated", 409);
	}
	if (user.active) {
		await User.updateOne({ _id: user._id, active: true }, { $set: { active: false }, $inc: { tokenVersion: 1 } });
	}
	return { id: String(user._id), active: false };
};