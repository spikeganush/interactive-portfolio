import { Schema, model, models } from 'mongoose';

const portfolioSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  photo: {
    type: String,
    required: [true, 'Photo is required'],
  },
  intro: {
    type: String,
    required: [true, 'Intro is required'],
  },
  resume: {
    type: String,
    required: [true, 'Resume is required'],
  },
  github: {
    type: String,
    required: [true, 'Github is required'],
  },
  linkedin: {
    type: String,
    required: [true, 'Linkedin is required'],
  },
  about: {
    type: String,
    required: [true, 'About is required'],
  },
  projects: [
    {
      title: {
        type: String,
        required: [true, 'Title is required'],
      },
      description: {
        type: String,
        required: [true, 'Description is required'],
      },
      image: {
        type: String,
        required: [true, 'Image is required'],
      },
      url: {
        type: String,
        required: [false],
      },
      technologies: {
        type: [String],
        required: [true, 'Technologies is required'],
      },
    },
  ],
  skills: {
    type: [String],
    required: [true, 'Skills is required'],
  },
  experience: [
    {
      title: {
        type: String,
        required: [true, 'Title is required'],
      },
      city: {
        type: String,
        required: [true, 'City is required'],
      },
      description: {
        type: String,
        required: [true, 'Description is required'],
      },
      startYear: {
        type: String,
        required: [true, 'Start year is required'],
      },
      endYear: {
        type: String,
        required: [false],
      },
    },
  ],
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  LeftLightBg: {
    type: String,
    required: [true, 'Left light background is required'],
  },
  LeftDarkBg: {
    type: String,
    required: [true, 'Left dark background is required'],
  },
  RightLightBg: {
    type: String,
    required: [true, 'Right light background is required'],
  },
  RightDarkBg: {
    type: String,
    required: [true, 'Right dark background is required'],
  },
});

const Portfolio = models.Portfolio || model('Portfolio', portfolioSchema);

export default Portfolio;
