import { Router } from "express"
import knex from "../database/connection"

const locationsRouter = Router()

locationsRouter.post("/", async (request, response) => {
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
        await transaction.rollback(); // Rollback da transação se location_id estiver ausente
        return response.status(500).json({ message: "Failed to get location ID" });
    }

        const locationItems = Promise.all(items.map(async (item_id: number) => {
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

export default locationsRouter