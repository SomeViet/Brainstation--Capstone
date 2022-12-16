
# Project Title

This project is based on Uber Eats and is designed with the User in mind. I made the project so it is a slightly improved UI, where Users get to see food choices, instead of the restaurants first.

## Tech Stack

**Client:** React, Redux, Javascript, 

**Server:** Node, Express, Knex, MySQL, 




## Features

- Geo-Location for Google Maps - Current Location


## Usage/Examples

```javascript
import Component from 'my-project'

function App() {
  return <Component />
}
```


## Installation

Install hungry with npm

- Front-end
```bash
  npm install react-router-dom@5.3
  npm install @googlemaps/js-api-loader
  npm install axios
  npm install sass
  
  cd hungry
```
    
    
- Back-end
```bash
  npm install dotenv
  npm install cors
  npm install express
  npm install knex
  npm install mysql
  
  cd hungry-backend
```
    
## Lessons Learned

What did you learn while building this project? What challenges did you face and how did you overcome them?

Lessons
- While an API Documentation may look overwhelming at first glance, just start using it one step at a time and get a basic API request before looking into the functionality
- Even the simpliest of features may require extensive code, while complicated features can be solved with the simpliest solutions
- I am a crappy designer. Creating an innovative design is not my strong suit.

Challenges
- First time using an external API outside the BrainStation Material
    - Faced it by repeatedly brute-force debugging via various console.logs throughout my code and identifying the error
        - In the future, get the basic function running, and implement code slowly to minimize debugging

- Without detailed guidelines or a mockups, I was just freestyling my design, resulting in an "unpolished" application    
    - After having a general template, map out the gutters/margins/design more with metrics

Next Steps
- Refactor code and components for reusablilty
- Make use of Mixins more in order to minimize duplicate code, and ease changes in design
- Implement Login and OAuth
    - From this, implement restaurant favouriting
    