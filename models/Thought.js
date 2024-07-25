const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dayJs = require('dayjs');

const thoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: true,
        minlength: 1, maxlength: 280,
      },
      username: {
        type: String,
        require: true,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
        get: ts => dayJs(ts).format("MM/DD/YYYY")
      },
      reactions: [
        reactionSchema
      ],
    },
    {
      toJSON: {
        getters: true,
      },
      id: false,
    }
  );
  thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});
  
  const Thought = model('thought', thoughtSchema);
  
  module.exports = Thought;