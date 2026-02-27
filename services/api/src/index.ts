import express from 'express'
import cors from 'cors'
import helmet from 'helmet'

const app = express()
const PORT = parseInt(process.env.PORT ?? '8080', 10)

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(helmet())
app.use(cors())
app.use(express.json())

// ── Routes ────────────────────────────────────────────────────────────────────

app.get('/health', (_req, res) => {
    res.status(200).json({
        status: 'ok',
        service: 'matchday-api',
        version: '0.1.0',
        timestamp: new Date().toISOString(),
    })
})

app.get('/', (_req, res) => {
    res.status(200).json({ message: 'MatchDay Lounge API' })
})

// 404 fallback
app.use((_req, res) => {
    res.status(404).json({ error: 'Not found' })
})

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`[matchday-api] Listening on port ${PORT}`)
})

export default app
