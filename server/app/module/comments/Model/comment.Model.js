const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  comment: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1, 
    max: 5,
    required: false 
  },
  isDelete: {
    type: Boolean,
    default: false
  },
  isAdminDelete: {
    type: Boolean,
    default: false
  },
  
},{
    versionKey:false,
    timestamps:true,
});

module.exports = mongoose.model('Comment', commentSchema);
