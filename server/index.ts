import 'dotenv/config'
import express, { Express, Request, Response }  from 'express'
import createTable from './config/create_table';
import cors from 'cors';
const app: Express = express();
 
 
//mysql table creation on the fly
createTable();

//cors setting
app.use(cors())
app.use((req, res, next) => {
 res.header("Access-Control-Allow-Origin", "*")
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")//
 next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


import murmursRoute from './router/murmurs';
import userRoute from './router/user';

const router: express.Router = express.Router()

app.use('/api/murmurs', murmursRoute);
app.use('/api/me', userRoute);

app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    message: "Wrong URL! Doesnt exist"
  })
});



app.listen(3001, () => { console.log('Murmurs app listening on port 3001!') })
