import { Router, json } from "express"
import multer from "multer"
import { celebrate, Joi } from "celebrate"
import knex from "../database/connection"
import multerConfig from "../config/multer"
import isAuthenticated from "../middlewares/isAuthenticated"

const locationsRouter = Router()

const upload = multer(multerConfig)

locationsRouter.use(isAuthenticated)

locationsRouter.post("/", celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().max(2),
        items: Joi.array().required(),
    })
}, {
    abortEarly: false
}) , async (request, response):Promise<any> => {
    const {
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        items
    } = request.body;

    const location = {
        image: "fake-image.jpg",
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
    }

    const transaction = await knex.transaction();

    const newIds = await transaction("locations").insert(location)

    const location_id = newIds[0]

    if (!location_id) {
        return response.status(500).json({ message: "Failed to get location ID" });
    }

        const locationItems = await Promise.all(items.map(async (item_id: number) => {
            const selectedItems = await transaction("items").where("id", item_id).first();

            if(!selectedItems) {
                return response.status(400).json({ message: "Item not found" });
            }

            return {
                item_id,
                location_id
            }
        })
        )
    
        await transaction('locations_items').insert(locationItems)
    

    await transaction.commit();

    return response.json({
        id: location_id,
        ...location
    })
})

locationsRouter.get("/:id", async (request, response) => {
    const { id } = request.params;

    const location = await knex("locations").where("id", id).first()

    if(!location) {
        return response.status(400).json({ message: "Location not found."})
    }

    const items = await knex("items")
        .join("locations_items", "items.id", "=", "locations_items.item_id")
        .where("locations_items.location_id", id)
        .select("items.title")

        return response.json({ location, items })
})

locationsRouter.get("/", async (request, response) => {
    const { city, uf, items } = request.query;

    if(!city && !uf && !items) {

        const locations = await knex("locations").select("*")

        return response.json(locations)
    }

    const parsedItems: Number[] = String(items).split(",").map(item => Number(item.trim()))

    const locations = await knex("locations")
        .join("locations_items", "locations.id", "=", "locations_items.location_id")
        .whereIn("locations_items.item_id", parsedItems)
        .where("city", String(city))
        .where("uf", String(uf))
        .distinct()
        .select("locations.*")

        return response.json(locations)
})

locationsRouter.put("/:id", upload.single("image"), async (request, response) => {
    const { id } = request.params

    const image = request.file?.filename

    const location = await knex("locations").where("id", id).first()

    if(!location) {
        return response.status(400).json({message: "Location not found."})
    }

    await knex("locations").update({ ...location, image }).where("id", id)

    return response.json({ ...location, image})
})

export default locationsRouter