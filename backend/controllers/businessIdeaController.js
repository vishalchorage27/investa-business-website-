const businessIdeaSchema = require("../models/businessIdeaSchema");

// Get all ideas
const getAllIdeas = async (req, res) => {
    const data = await businessIdeaSchema.find().populate("interestedInvestors");
    res.status(200).json({
        message: "Data fetched",
        response: data,
        user: req.user
    });
};

//Submit Idea
const submitIdea = async (req, res) => {
    if (req.user.role !== "Entrepreneur") {
        return res.status(403).json({
            message: "Only entrepreneur can add idea"
        });
    }
    const data = req.body;
    data.entrepreneurId = req.user.id;
    const response = await new businessIdeaSchema(data).save();
    res.status(201).json({ message: "Idea posted", response: response });
};

//Show Interest
const showInterest = async (req, res) => {
    // 1. Role check
    if (req.user.role !== "Investor") {
        return res.status(403).json({
            message: "Only investors can express interest"
        });
    }

    // 2. Find the idea
    const idea = await businessIdeaSchema.findById(req.params.id);
    if (!idea) {
        return res.status(404).json({
            message: "Business idea not found"
        });
    }

    // 3. Check if user already interested
    if (idea.interestedInvestors.includes(req.user.id)) {
        return res.status(400).json({
            message: "You already showed interest"
        });
    }

    // 4. Add user to interestedInvestors array
    idea.interestedInvestors.push(req.user.id);
    await idea.save();

    // 5. Send response
    res.status(200).json({
        message: "Interest added successfully",
        data: idea
    });
};
//Update Idea
const updateIdea = async (req, res) => {
    if (req.user.role !== "Entrepreneur") {
        return res.status(403).json({
            message: "Only enterpreneur can edit"
        });
    }
    const ideaId = req.params.id;
    const data = req.body;
    const response = await businessIdeaSchema.findByIdAndUpdate(ideaId, data, {
        new: true,
        runValidators: true
    });
    console.log(response);
    res.status(201).json({ message: "Idea updated", response: response });
};

//Delete Idea
const deleteIdea = async (req, res) => {
    if (req.user.role !== "Entrepreneur") {
        return res.status(403).json({
            message: "Only entrepreneur can edit"
        });
    }
    const ideaId = req.params.id;
    const response = await businessIdeaSchema.findByIdAndDelete(ideaId);
    res.status(201).json({ message: "Idea deleted" });
};

module.exports = {
    getAllIdeas,
    submitIdea,
    showInterest,
    updateIdea,
    deleteIdea
};
