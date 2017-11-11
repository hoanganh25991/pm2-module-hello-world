import mongoose from "mongoose"

const Schema = mongoose.Schema

const CustomViewSchema = new Schema({
  count: {
    type: Number
  },
  timestamp: {
    type: Number
  },
  api: {
    type: String
  }
})

mongoose.model("CustomView", CustomViewSchema, "customViews")
