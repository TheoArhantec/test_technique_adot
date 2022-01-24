import createServer from '../src/server';
import superTest from 'supertest';
const app = createServer()

// Pour être sûr des résultats des tests, j'ai appliqué des filtres dans le fichier CSV
// pour m'assurer que tel jeu de données retourne n fois un événement de type imp ou click


describe("Test sur la route /getEventByCoordinate", () => {

    it('should return 1 impression ans 1 click ', async  () => {
        await superTest(app)
            .post('/event')
            .set('Accept', 'application/json')
            .send([{
                "lat": 48.88845096504584,
                "lon": 2.2470618097659285,
                "name": "test avec 1 impression et 1 click"
            }])
            .expect(200).then((res) => {
                const {impressions, clicks} = res.body[0];
                expect(impressions).toBe(1)
                expect(clicks).toBe(1)
            })
    });

    it('should return 0 impression and 0 click', async () => {
        await superTest(app)
            .post('/event')
            .set('Accept', 'application/json')
            .send([{
                "lat": 48.8759992,
                "lon": 2.3481253,
                "name": "test avec 0 résultat"
            }])
            .expect(200).then((res) => {
                const {impressions, clicks} = res.body[0];
                expect(impressions).toBe(0)
                expect(clicks).toBe(0)
            })
    })

    it('should return 1122 impressions and 151 clicks', async () => {
        await superTest(app)
            .post('/event')
            .set('Accept', 'application/json')
            .send([{
                "lat": 48.86,
                "lon": 2.35,
                "name": "test avec beaucoup de résultat"
            }])
            .expect(200).then((res) => {
                const {impressions, clicks} = res.body[0];
                expect(impressions).toBe(1122)
                expect(clicks).toBe(151)
            })
    })

    it('should return 422', async () => {
        await superTest(app)
            .post('/event')
            .set('Accept', 'application/json')
            .send({test: "test"})
    .expect(422)
    })

    it('should return 422 again', async () => {
        await superTest(app)
            .post('/event')
            .set('Accept', 'application/json')
            .send([{ let: 45, lan: 78}])
            .expect(422)
    })

    it('should return all the records', async () => {
        await superTest(app)
            .post('/event')
            .set('Accept', 'application/json')
            .send([{
                "lat": 48,
                "lon": 2,
                "name": "test qui retourne tout les résultats"
            }])
            .expect(200).then((res) => {
                const {impressions, clicks} = res.body[0];
                expect(clicks + impressions).toBe(223994)
            })
    })
})
