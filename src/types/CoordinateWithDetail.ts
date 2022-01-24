// Réponse de la requete getEventByCoordinate
type CoordinateWithDetail = {
    lat: string,
    lon: string,
    name: string,
    impressions: number,
    clicks: number
}

export default CoordinateWithDetail
