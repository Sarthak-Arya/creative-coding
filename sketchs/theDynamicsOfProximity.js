/*
  Title: The Dynamics of Proximity
  Author : Sarthak-Arya
  Liscence : MIT
  
  Description:
  In this artwork, titled "The Dynamics of Proximity," I aim to explore the concept of connections and relationships 
  through the lens of code and visual representation. The artwork utilizes the code provided to depict 
  a captivating phenomenon: as we draw closer to each other, the bonds between individuals grow stronger, while 
  they gradually fade away as distance increases.

  Drawing inspiration from the inherent human desire for connection and interaction, 
  this artwork visualizes the dynamics of relationships in a mesmerizing and abstract manner. 
  Each element in the composition represents an individual, and their positions are governed by the code's 
  algorithmic calculations.

  The artwork employs a perspective that highlights the significance of physical proximity in forging 
  strong bonds. When two elements are located within a specific distance threshold, a visible bond is formed between 
  them, represented by a thick line. As the distance between elements increases, the thickness of the bonds 
  gradually diminishes, symbolizing the fading nature of distant connections.

  Through this artistic representation, "The Dynamics of Proximity" invites viewers to reflect on the intricate 
  interplay between physical proximity and emotional connections. It prompts us to consider the profound 
  impact that closeness and distance have on our relationships, underscoring the idea that strong bonds require continuous 
  effort and engagement.

  By combining the beauty of art and the power of code, this artwork serves as a metaphorical reminder 
  of the importance of maintaining meaningful connections in our lives. It invites viewers to contemplate 
  the dynamics of relationships and the role that physical and emotional proximity play in shaping our interactions 
  with others.

  "The Dynamics of Proximity" encourages us to celebrate the strength of bonds when we are close and 
  inspires us to nurture and cherish connections, even as distance separates us. 
  It is a visual representation of the intricate tapestry of human relationships, reminding us of 
  the beauty and complexity that emerges when we embrace the ebb and flow of closeness and distance in our lives.

  Overall, this artwork provides a thought-provoking exploration of the interplay between proximity and the strength of bonds, inviting viewers to engage with the artwork and reflect on their own experiences of connection, distance, and the ever-changing dynamics of relationships.
  This sketch creates a particle system where agents move randomly on a canvas. 
  If two agents come within a distance of 200 pixels, a line is drawn between them. 
  The thickness of the line varies based on the distance between the agents. 
  As the agents move farther apart, the line becomes thinner and eventually disappears. 
  The sketch uses the canvas-sketch library and additional utility libraries for 
  random number generation and math calculations.



  About The Code:
  The code initializes the canvas dimensions and animation settings using the canvas-sketch
  library. It defines a Vector class to represent a 2D position and an Agent class that 
  contains properties and methods for updating, bouncing, getting distance, wrapping, and 
  drawing the agent.

  In the sketch function, a set of agents is generated with random positions and velocities.
  The canvas is cleared, and for each pair of agents, the distance between them 
  is calculated. The line thickness is determined based on the distance, and if 
  the distance is less than 200 pixels, a line is drawn between the agents using the calculated thickness. 
  Each agent is then updated, wrapped around the canvas, and drawn.

  This creates an animated effect where the agents move randomly and lines appear and disappear as they come close to each other. The sketch can be customized by adjusting the number of agents, their initial positions and velocities, line thickness, and canvas dimensions.

  Example Usage:
  - Adjust the number of agents, their initial positions, and velocities.
  - Modify the line thickness and color.
  - Experiment with different canvas dimensions and animation settings.
*/



const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [1080, 1080],
  animate: true,
  fps: 80,
};

// Helper function to convert degrees to radians
const angleRad = (angleInDeg) => {
  return (angleInDeg * (Math.PI / 180));
};

// Main sketch function
const sketch = ({ context, width, height }) => {
  let agents = [];

  // Create multiple agents with random positions
  for (let i = 0; i <= 40; i++) {
    let agent = new Agent(random.range(0, width), random.range(0, height));
    agents.push(agent);
  }

  // Rendering function
  return ({ context, width, height }) => {
    context.clearRect(0, 0, width, height);

    // Check distance between each pair of agents and draw lines if they are close
    for (let a = 0; a <= 40; a++) {
      for (let b = a + 1; b <= 40; b++) {
        let dist = agents[a].getDistance(agents[b]);
        context.lineWidth = math.mapRange(dist, 0, 200, 12, 1);
        if (dist < 200) {
          context.beginPath();
          context.moveTo(agents[a].pos.x, agents[a].pos.y);
          context.lineTo(agents[b].pos.x, agents[b].pos.y);
          context.stroke();
        }
      }
    }

    // Update and draw each agent
    agents.forEach((agent) => {
      agent.wrap(width, height);
      agent.update();
      agent.draw(context);
    });
  };
};

// Vector class representing a 2D point
class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

// Agent class representing a moving particle
class Agent {
  constructor(x, y) {
    
    // Initialize position and velocity vectors
    this.pos = new Vector(x, y); 
    this.vec = new Vector(random.range(-2, 2), random.range(-2, 2));
    this.radius = random.range(4, 12);     // Set the radius of the agent

  }

  // Update agent's position based on its velocity
  update() {
    this.pos.x += this.vec.x;
    this.pos.y += this.vec.y;
  }

  // Reverse agent's velocity if it hits canvas boundaries
  bounce(width, height) {
    if (this.pos.x > width || this.pos.x < 0) {
      this.vec.x *= -1;
    } else if (this.pos.y > height || this.pos.y < 0) {
      this.vec.y *= -1;
    }
  }

  // Calculate distance between this agent and another agent
  getDistance(other) {
    let x1 = this.pos.x;
    let y2 = other.pos.y;

    let d1 = Math.abs(y2 - this.pos.y);
    let d2 = Math.abs(x1 - other.pos.x);

    return Math.sqrt(d1 * d1 + d2 * d2);
  }

  // Wrap agent around the canvas boundaries
  wrap(width, height) {
    if (this.pos.x > width) {
      this.pos.x = 0;
    } else if (this.pos.x < 0) {
      this.pos.x = width;
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
    } else if (this.pos.y < 0) {
      this.pos.y = height;
    }
  }

  // Draw the agent as a circle
  draw(context) {
    context.lineWidth = 4;
    context.save();
    context.translate(this.pos.x, this.pos.y);

    context.beginPath();
    context.arc(0, 0, this.radius, angleRad(0), angleRad(360));
    
    context.stroke();
    context.restore();
  }
}

// Run the sketch using the canvas-sketch library and provided settings
canvasSketch(sketch, settings);
