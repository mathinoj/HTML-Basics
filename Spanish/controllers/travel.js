const Travel = require("../models/viewAllTravel");
module.exports.index = async (req, res) => {
    const travels = await Travel.find({});
    res.render("travel/index", { travels });
    // or res.render('travels/index', {travels})
};

module.exports.renderNewForm = (req, res) => {
    res.render("/travel/new");
};

module.exports.createTravel = async (req, res, next) => {
    const travel = new Travel(req.body.travel);
    travel.author = req.user._id;
    await Travel.save();
    req.flash("success", "Made new travel!");
    res.redirect(`/travel/${travel._id}`);
};

module.exports.showTravel = async (req, res) => {
    const travel = await Travel.findById(req.params.id)
        .populate({
            path: "reviews",
            populate: { path: "author" },
        })
        .populate("author");
    console.log(travel);
    if (!travel) {
        req.flash("error", "Cant find that travel!");
        return res.redirect("/travel");
    }
    res.render("travel/edit", { travel });
};

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const travel = await Travel.findById(id);
    if (!travel) {
        req.flash("error", "Cant find that travel!");
        return res.redirect("/travel");
    }
    res.render("travel/edit", { travel });
};

module.exports.updateTravel = async (req, res) => {
    const { id } = req.params;
    const travel = await Travel.findByIdAndUpdate(id, { ...req.body.travel });
    req.flash("success", "Updated travel!");
    res.redirect(`/travel/${travel._id}`);
};

module.exports.deleteTravel = async (req, res) => {
    const { id } = req.params;
    await Travel.findByIdAndDelete(id);
    req.flash("success", "Deleted travel!");
    res.redirect("/travel");
};
