const Campground = require("../models/campground");
//controller is looking for camground model that doesnt exist in this file until we add it

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds }); //added {campgrounds} 413
};

module.exports.renderNewForm = (req, res) => {
    res.render("campgrounds/new");
};

module.exports.createCampground = async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    req.flash("success", "Successfully made a new camp!");
    res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.showCampground = async (req, res) => {
    const campground = await Campground.findById(req.params.id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })
        .populate("author");
    // console.log(campground);
    if (!campground) {
        req.flash("error", "Can't find that camp!");
        return res.redirect("/campgrounds");
    }
    // console.log(campground); test to see reviews in terminal
    res.render("campgrounds/show", { campground });
};

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
        req.flash("error", "Can't find that camp!");
        return res.redirect("/campgrounds");
    }
    // if (!campground.author.equals(req.user._id)) { 523
    //     req.flash("error", "you aint allowed to does that!"); 523
    //     return res.redirect(`/campgrounds/${id}`); 523
    // }
    res.render("campgrounds/edit", { campground });
};
