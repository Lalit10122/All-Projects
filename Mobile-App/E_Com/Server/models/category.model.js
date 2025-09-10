import mongoose, { Schema} from 'mongoose';

const categorySchema = new Schema({
  name: { type: String, required: true },
  image_uri: {
    type: String,
    required:true,
  },
  product:[{
    type:mongoose.Schema.Types.ObjectId ,// forign key
    ref:"Product"
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Category = mongoose.model("Category",categorySchema)

export default Category;
