import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';
import Event from '../types/Event';
import Coordinate from "../types/Coordinate";
import CoordinateWithDetail from "../types/CoordinateWithDetail";

export const readAndFilterEventFile = (targetCoordinate: Coordinate): Promise<CoordinateWithDetail> => new Promise((resolve, _) => {
    const { lat,lon } = targetCoordinate;

    const oImpressionAndClick: {imp: number, click: number} = {
        imp:0,
        click: 0,
    }

    // Lecture et filtrage de la liste des évènements
    fs.createReadStream(path.resolve(__dirname, 'assets', 'events.csv'))
        .pipe(csv.parse({ headers: true }))
        .on("data", (data: Event) => {
            // On regarde si la coordonnée du fichier appartient à celle transmise en paramètre
            if(data.lat.startsWith(lat) && data.lon.startsWith(lon)) {
                oImpressionAndClick[data.event_type]++
            }
        })
        // On assemble l'objet à retourner une fois la lecture du document terminé
        .on('end', () => resolve({
            ...targetCoordinate,
            impressions: oImpressionAndClick.imp,
            clicks: oImpressionAndClick.click
        }));
})
