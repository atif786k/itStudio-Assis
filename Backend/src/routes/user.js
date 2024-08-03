const Router = require("express");
const router = Router();
const User = require("../schema/userSchema");

router.post("/create-user", async (req, res) => {
    const { username, phoneNumber, email, hobbies } = req.body;

    const isUser = await User.findOne({ email: email });
    if(isUser){ return res.json({msg: "User already exist"}) };

    try {
        const newUser = new User({ username, phoneNumber, email, hobbies });
        const savedUser = await newUser.save();
        res.status(201).json({msg: "User Created Successfully", savedUser});
    } catch (error) {
        res.status(500).json({msg: "Failed to create user", errorMsg: error});
    }
})

router.put("/edit-user/:id", async (req, res) => {
    const { params: {id} } = req;
    const { username, phoneNumber, email, hobbies } = req.body;

    const user = await User.findById(id);
    if(!user){return res.json({msg: "User not found"})};

    try {
        if(username){user.username = username};
        if(phoneNumber){user.phoneNumber = phoneNumber};
        if(email){user.email = email};
        if(hobbies){user.hobbies = hobbies};

        const updatedUser = await user.save();
        res.status(201).json({msg: "User updated successfully", updatedUser});
    } catch (error) {
        res.status(500).json({msg: "Some error occured", errorMsg: error});
    }
});

router.delete("/delete-user/:id", async (req, res) => {
    const { params: {id} } = req;

    const user = await User.findById(id);
    if(!user){return res.json({msg: "User not found"})};

    try {
        const deleteUser = await User.deleteOne({_id: id});
        res.status(200).json({msg: "User deleted successfully"});
    } catch (error) {
        res.status(500).json({msg: "Some error occured", error: error.message});
    }
})

router.get("/fetch-users", async (req, res) => {
    try {
        const users = await User.find();
        if(!users){return res.json({msg: "No user currently"})};
        res.status(201).json({msg: "User fetched", users});
    } catch (error) {
        res.status(500).json({msg: "Some error occured", error: error.message});
    }
})

router.get("/fetch-users/:id", async (req, res) => {
    const { params: {id} } = req;
    try {
        const singleUser = await User.findById(id);
        if(!singleUser){return res.json({msg: "User not found"})};
        res.status(201).json({msg: "User found successfully", singleUser});
    } catch (error) {
        res.status(500).json({msg: "Some error occured", errorMsg: error});
    }
})

module.exports = router;