export const fetchAnts = async (colour, location, rating) => {

    let outcome = ""

    const field =
    {
        colour: `?colour=${colour}`,
        location: `?location=${location}`,
        rating: `?rating=${rating}`,
        colloc: `?colour=${colour}&location=${location}`,
        colrat: `?colour=${colour}&rating=${rating}`,
        locrat: `?location=${location}&rating=${rating}`,
    }

    if (location && rating) { outcome = field.locrat }
    else if (colour && rating) { outcome = field.colrat }
    else if (colour && location) { outcome = field.colloc }
    else if (colour) { outcome = field.colour }
    else if (location) { outcome = field.location }
    else if (rating) { outcome = field.rating }


    if (outcome !== "") {
        const res = await fetch(`https://antdentifier-backend.herokuapp.com/api/ants${outcome}`).catch(console.log)
        const body = await res.json().catch(console.log)
        return body
    }
    else {
        const res = await fetch(`https://antdentifier-backend.herokuapp.com/api/ants${outcome}`).catch(console.log)
        const body = await res.json().catch(console.log)
        return body
    }
}
