import { Request, Response } from "express";
import { readAndFilterEventFile } from "../database/loader.database";
import Coordinate from "../types/Coordinate";
import CoordinateWithDetail from "../types/CoordinateWithDetail";

export const getEventByCoordinate = (request: Request, response: Response) =>
{
    if(!Array.isArray(request.body) && request.body.length === undefined) {
        response.status(422).send({message: "Paramètre incorrect"});
    }

    const promises: Promise<CoordinateWithDetail>[] = [];

    request.body.forEach((event: Coordinate) => {
        if(!isParamCoordinate(event)) {
            response.status(422).send({message: "Paramètre incorrect"});
        }
        event.lat = event.lat.toString();
        event.lon = event.lon.toString();

        promises.push(readAndFilterEventFile(event))
    })

    Promise.allSettled(promises).then(results => {
        // Typescript ne comprends que je filtre les mauvaise promesses pour ne garder que les bonnes
        // @ts-ignore
        const fulfilledResults = results.filter(result=> result.status === "fulfilled").map(result => result.value)
        response.send(fulfilledResults).status(200);
    })
}

const isParamCoordinate = (param: Coordinate): param is Coordinate => (
    param &&
    typeof param === 'object'
    && param.hasOwnProperty('lat') && typeof param.lat === "number"
    && param.hasOwnProperty('lon') && typeof param.lon === "number"
    && param.hasOwnProperty('name') && typeof param.name === "string"
);
