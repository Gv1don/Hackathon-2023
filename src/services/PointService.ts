import type {CreateItemStore} from "@/stores/createItemStore";

export default {
   async postPoint(point: CreateItemStore) {
       let response = await fetch(`${new URL(document.URL).origin}/api/v1/private/point`, {
           credentials: 'include',
           method: "POST",
           headers: {
                "Content-type": "application/json"
           },
           body: JSON.stringify({
               coordinates: [point.coordX, point.coordY],
               description: point.description,
               address: point.address,
               open_time: point.open,
               close_time: point.close,
               tags: point.tags.map(x => x.type)
           })
       })
   }
}
