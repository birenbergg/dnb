import fs from 'fs'
import express from 'express'
import axios from 'axios'
import cors from 'cors'

const port = 5000

const app = express()

const corsOptions = {
    origin: ['http://localhost:3000', 'https://dnb.birenbergg.com']
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
    const param = encodeURI(req.query.q)

    try {
        const apiResults = await axios.get(`http://api.duckduckgo.com/?q=${param}&format=json`)
        const modifiedResults = []

        apiResults.data.RelatedTopics.forEach(r => {
            if (r.hasOwnProperty('Topics')) {
                r.Topics.forEach(t => {
                    modifiedResults.push({
                        url: t.FirstURL,
                        title: t.Text
                    })
                })
            } else {
                modifiedResults.push({
                    url: r.FirstURL,
                    title: r.Text
                })
            }

        })

        res.send(modifiedResults)
    } catch (error) {
        res.status(500).send({ message: 'Error getting search results data.' })
    }

})

app.get('/get-query-history', async (req, res) => {
    try {
        if (!fs.existsSync('previousQueries.json')) {
            fs.writeFileSync('previousQueries.json', JSON.stringify([]))
            res.send([])
        } else {
            const rawdata = fs.readFileSync('previousQueries.json')
            const previousQueries = JSON.parse(rawdata)
            res.send(previousQueries)
        }
    } catch (error) {
        res.status(500).send({ message: 'Error getting query history.' })
    }
})

app.post('/save-to-query-history', async (req, res) => {
    const query = req.body.query
    try {
        if (!fs.existsSync('previousQueries.json')) {
            fs.writeFileSync('previousQueries.json', JSON.stringify([...query]))
        } else {
            const rawdata = fs.readFileSync('previousQueries.json')
            let previousQueries = JSON.parse(rawdata)

            if (previousQueries.includes(query)) {
                previousQueries = previousQueries.filter(q => q !== query)
            } else if (previousQueries.length >= 10) {
                previousQueries.shift()
            }

            previousQueries.push(query)
            fs.writeFileSync('previousQueries.json', JSON.stringify(previousQueries))
        }
        res.end()
    } catch (error) {
        res.status(500).send({ message: 'Error saving to query history.' })
    }
})

app.listen(port, () => console.log(`Server running on port ${port}`))