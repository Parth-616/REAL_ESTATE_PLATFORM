// view all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Block user
export const blockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.isBlocked = !user.isBlocked;
    await user.save();
    res.json({
      success: true,
      message: user.isBlocked ? "User blocked" : "User unblocked",
      isBlocked: user.isBlocked,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "User deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// view all properties
export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate("seller", "name email");

    res.json({
      success: true,
      count: properties.length,
      properties,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// delete property
export const deleteProperty = async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Property deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


// GET PENDING SELLERS
export const getPendingSellers = async (req, res) => {
  try {
    const pendingSellers = await User.find({
      role: "seller",
      isApproved: false
    }).select("-password");

    res.json({
      success: true,
      count: pendingSellers.length,
      pendingSellers
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// APPROVE SELLER
export const approveSeller = async (req, res) => {
  try {
    const seller = await User.findById(req.params.id);
    if (!seller || seller.role !== "seller") {
      return res.status(404).json({
        success: false,
        message: "Seller not found",
      });
    }

    seller.isApproved = true;
    await seller.save();

    res.json({
      success: true,
      message: "Seller approved successfully",
      seller
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};