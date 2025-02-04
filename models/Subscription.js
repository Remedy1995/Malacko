const mongoose = require('mongoose');


const SubscriptionSchema = new mongoose.Schema({
    subscriptionPlanName: {
        type: String,
        enum :["FREE","BASIC","STARTUP","ENTERPRISE"],
        required: true,
        default : "FREE"
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    subscriptionCredits : {
      type : Number,
      required : true,
      enum : [5,50,100,250],
      default : 5
    },
    priceOfSubscriptionPlan: {
        type: Number,
        required: true,
        enum : [0,50,100,150],
        default : 0
    },
    created_At: {
        type: Date,
        default: Date.now()
    }
})

const Subscription = mongoose.model("Subscription", SubscriptionSchema);

module.exports = Subscription;