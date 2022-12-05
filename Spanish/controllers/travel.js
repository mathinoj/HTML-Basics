const Travel = require("../models/viewAllTravel");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
const { cloudinary } = require("../cloudinary");

// module.exports.index = async (req, res) => {
//     const travels = await Travel.find({});
//     res.render("travel/index", { travels });
//     // or res.render('travels/index', {travels})
// };

module.exports.index = async (req, res) => {
    const viewAllTravel = await Travel.find({});
    res.render("travel/index", { viewAllTravel });
};

// module.exports.renderNewForm = (req, res) => {
//     res.render("/travel/new");
// };

module.exports.renderNewForm = (req, res) => {
    res.render("travel/new");
};

// module.exports.createTravel = async (req, res, next) => {
//     const travel = new Travel(req.body.travel);
//     travel.author = req.user._id;
//     await Travel.save();
//     req.flash("success", "Made new travel!");
//     res.redirect(`/travel/${travel._id}`);
// };

module.exports.createTravel = async (req, res, next) => {
    const geoData = await geocoder
        .forwardGeocode({
            query: req.body.travel.location,
            limit: 1,
        })
        .send();
    // res.send(geoData.body.features[0].geometry.coordinates);
    const newTravel = new Travel(req.body.travel);
    newTravel.geometry = geoData.body.features[0].geometry;
    newTravel.images = req.files.map((f) => ({
        url: f.path,
        filename: f.filename,
    }));
    newTravel.author = req.user._id;
    await newTravel.save();
    console.log(newTravel);
    req.flash("success", "Successfully listed a travel!");
    res.redirect(`/travel/${newTravel._id}`);
};

// module.exports.showTravel = async (req, res) => {
//     const travel = await Travel.findById(req.params.id)
//         .populate({
//             path: "reviews",
//             populate: { path: "author" },
//         })
//         .populate("author");
//     console.log(travel);
//     if (!travel) {
//         req.flash("error", "Cant find that travel!");
//         return res.redirect("/travel");
//     }
//     res.render("travel/edit", { travel });
// };

module.exports.showTravel = async (req, res) => {
    const viewTravelId = await Travel.findById(req.params.id)
        .populate({
            path: "reviews",
            populate: { path: "author" },
        })
        .populate("author");
    console.log(viewTravelId);
    if (!viewTravelId) {
        req.flash("error", "No lo encuentra este viaje!");
        return res.redirect("/travel");
    }
    res.render("travel/show", { viewTravelId });
};

// module.exports.userTravel = async (req, res) => {
//     res.render("travel/userTravel");
// };

// module.exports.userTraveler = async (req, res) => {
//     res.render("travel/userTravel");
// };

// app.get(
//     "/userTravel",
//     catchAsync(async (req, res) => {
//         res.render("travel/userTravel");
//     })
// );

// module.exports.renderEditForm = async (req, res) => {
//     const { id } = req.params;
//     const travel = await Travel.findById(id);
//     if (!travel) {
//         req.flash("error", "Cant find that travel!");
//         return res.redirect("/travel");
//     }
//     res.render("travel/edit", { travel });
// };

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const editTravel = await Travel.findById(id);
    if (!editTravel) {
        req.flash("error", "Cannot be founded!");
        return res.redirect("/travel");
    }
    res.render("travel/edit", { editTravel });
};

// module.exports.updateTravel = async (req, res) => {
//     const { id } = req.params;
//     const travel = await Travel.findByIdAndUpdate(id, { ...req.body.travel });
//     req.flash("success", "Updated travel!");
//     res.redirect(`/travel/${travel._id}`);
// };

module.exports.updateTravel = async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    const editedTravel = await Travel.findByIdAndUpdate(id, {
        ...req.body.travel,
    });
    const imgs = req.files.map((f) => ({ url: f.path, filename: f.filename }));
    editedTravel.images.push(...imgs);
    await editedTravel.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await editedTravel.updateOne({
            $pull: { images: { filename: { $in: req.body.deleteImages } } },
        });
        console.log(editedTravel);
    }
    req.flash("Updated a travel!");
    res.redirect(`/travel/${editedTravel._id}`);
};

// module.exports.deleteTravel = async (req, res) => {
//     const { id } = req.params;
//     await Travel.findByIdAndDelete(id);
//     req.flash("success", "Deleted travel!");
//     res.redirect("/travel");
// };

module.exports.deleteTravel = async (req, res) => {
    const { id } = req.params;
    await Travel.findByIdAndDelete(id);
    req.flash("Deleted a travel.");
    res.redirect("/travel");
};
