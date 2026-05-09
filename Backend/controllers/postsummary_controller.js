const postsummary = require('../models/postsummaries_model')
const posts = require('../models/post_model')
const { GoogleGenerativeAI } = require('@google/generative-ai')

let model = null
let geminiError = null

if (process.env.GEMINI_API_KEY) {
  try {
    const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    model = genai.getGenerativeModel({ model: "gemini-2.5-flash" })
    console.log("✓ Gemini AI initialized successfully")
  } catch (e) {
    geminiError = e.message
    console.warn("⚠ Gemini AI initialization failed:", e.message)
  }
} else {
  console.warn("⚠ GEMINI_API_KEY not found in environment variables")
}

exports.summarizepost = async (req, res) => {
    try {
        // Check if Gemini is available
        if (!model) {
            return res.status(503).json({ 
                message: "Summary service unavailable",
                reason: geminiError || "Gemini AI not configured"
            })
        }

        const post = await posts.findById(req.params.id)
        if (!post) {
            return res.status(404).json({ message: 'Post not found' })
        }

        // check if summary already exists
        const existingsummary = await postsummary.findOne({ post_id: req.params.id })
        if (existingsummary) {
            return res.status(200).json({ data: existingsummary })
        }

        // call gemini api
        const result = await model.generateContent(
            `Summarize this Reddit post in 2-3 sentences:\n\nTitle: ${post.title}\n\nContent: ${post.content}`
        )
        const summarytext = result.response.text()

        // save summary to database
        const newsummary = await postsummary.create({
            post_id: req.params.id,
            summary_text: summarytext
        })

        res.status(201).json({ data: newsummary })
    }
    catch (e) {
        console.error("Summary generation error:", e.message)
        res.status(500).json({
            message: "Failed to generate summary",
            error: e.message
        })
    }
}

exports.getsummarybypost = async (req, res) => {
    try {
        const summary = await postsummary.findOne({ post_id: req.params.id })
        if (!summary) {
            return res.status(404).json({ message: 'No summary found for this post' })
        }
        res.status(200).json({ data: summary })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}