import * as express from 'express';
import * as cors from 'cors';
import * as idamOpenIdAuth from '@pa-util/idam-openidauth';

const app: express.Express = express();
const idam = idamOpenIdAuth.Idam;

idam.Configure({
    discoveryUrl: 'https://fedsvc-stage.pwc.com/ofisids/api/discovery',
    cacheRetriever: (async (key) => {
        console.log("Retriever: ", key);
        return null;
    }),
    cacheCallback: (key, data) => {
        console.log("Callback: ", key, data);
        return;
    }
});

app.use(cors());

app.use( idam.OpenIdMiddleware() , (req, res, next) => {
    next();
});

app.get('/api/users', (req: express.Request, res: express.Response) => {
    res.setHeader('content-type', 'text/html');
    res.send("Idam - Trident node testing tool");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});