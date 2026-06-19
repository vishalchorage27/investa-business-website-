const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { jwtAuthMiddleware } = require("../jwt");
const {
    getAllIdeas,
    submitIdea,
    showInterest,
    updateIdea,
    deleteIdea
} = require("../controllers/businessIdeaController");

router.get("/",jwtAuthMiddleware, asyncHandler(getAllIdeas));
router.post("/idea", jwtAuthMiddleware, asyncHandler(submitIdea));
router.post("/:id/interest", jwtAuthMiddleware, asyncHandler(showInterest));
router.put("/:id/idea", jwtAuthMiddleware, asyncHandler(updateIdea));
router.delete("/:id/idea", jwtAuthMiddleware, asyncHandler(deleteIdea));

module.exports = router;
