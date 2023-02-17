import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    createdAdd: {
        type: Date,
        default: Date.now,    
    },
});

const Course = mongoose.model('Course', CourseSchema);

export default Course;