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
  resumeUrl: {
    type: String,
    required: [true, 'Resume is required'],
  },
  githubUrl: {
    type: String,
    required: [true, 'Github is required'],
  },
  linkedinUrl: {
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
        required: [true, 'ProjectTitle is required'],
      },
      description: {
        type: String,
        required: [true, 'ProjectDescription is required'],
      },
      imageUrl: {
        type: String,
        required: [true, 'ProjectImage is required'],
      },
      url: {
        type: [String],
        required: [false],
      },
      tags: {
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
      logo: {
        type: String,
        required: [true, 'Logo is required'],
      },
      title: {
        type: String,
        required: [true, 'Title is required'],
      },
      location: {
        type: String,
        required: [true, 'Location is required'],
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
  leftLightBg: {
    type: String,
    required: [true, 'Left light background is required'],
  },
  leftDarkBg: {
    type: String,
    required: [true, 'Left dark background is required'],
  },
  rightLightBg: {
    type: String,
    required: [true, 'Right light background is required'],
  },
  rightDarkBg: {
    type: String,
    required: [true, 'Right dark background is required'],
  },
  customUrl: {
    type: String,
    required: [false],
  },
});

const Portfolio = models.Portfolio || model('Portfolio', portfolioSchema);

export default Portfolio;
