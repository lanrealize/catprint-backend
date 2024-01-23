const express = require("express");
const picturesController = require("../controllers/pictures.controller");

const picturesRouter = express.Router({ mergeParams: true });

picturesRouter.get("/", picturesController.getPictures);
picturesRouter.post("/", picturesController.postPicture);
picturesRouter.get("/:picID", picturesController.getPicture);
picturesRouter.delete("/:picID", picturesController.deletePicture);

module.exports = picturesRouter;
