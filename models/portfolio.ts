import { Schema, model, models } from 'mongoose';

const portfolioSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: [false],
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  photo: {
    type: String,
    required: [false],
  },
  intro: {
    type: String,
    required: [false],
  },
  resume: {
    type: String,
    required: [false],
  },
  github: {
    type: String,
    required: [false],
  },
  linkedin: {
    type: String,
    required: [false],
  },
  about: {
    type: String,
    required: [false],
  },
  projects:
    [
      {
        id: {
          type: String,
          required: [false],
        },
        _id: {
          type: Schema.Types.ObjectId,
          required: [false],
        },
        position: {
          type: Number,
          required: [false],
        },
        title: {
          type: String,
          required: [false],
        },
        description: {
          type: String,
          required: [false],
        },
        imageUrl: {
          type: String,
          required: [false],
        },
        url: {
          type: [String],
          required: [false],
        },
        tags: {
          type: [String],
          required: [false],
        },
      },
    ] || null,
  skills: {
    type: [String],
    required: [false],
  },
  experience: [
    {
      logo: {
        type: String,
        required: [false],
      },
      title: {
        type: String,
        required: [false],
      },
      location: {
        type: String,
        required: [false],
      },
      description: {
        type: String,
        required: [false],
      },
      startYear: {
        type: String,
        required: [false],
      },
      endYear: {
        type: String,
        required: [false],
      },
    },
  ],
  email: {
    type: String,
    required: [false],
  },
  leftLightBg: {
    type: String,
    required: [false],
  },
  leftDarkBg: {
    type: String,
    required: [false],
  },
  rightLightBg: {
    type: String,
    required: [false],
  },
  rightDarkBg: {
    type: String,
    required: [false],
  },
  customUrl: {
    type: String,
    required: [false],
  },
});

const Portfolio = models.Portfolio || model('Portfolio', portfolioSchema);

export default Portfolio;
