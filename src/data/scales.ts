export interface Scale {
  title: string;
  description: string;
  rating: string;
  explanation: string;
  imageUrl: string;
}

export const scales: Scale[] = [
  {
    title: "Prominence of Color",
    description: "Evaluates how color is used throughout the artwork, including intensity and variety.",
    rating: "4/5",
    explanation: "The image prominently features vibrant colors—green for the tree canopy, red for the apples, and brown for the trunk. The colors are bold and consistently applied, with clear separation between elements. The simplicity and intensity of the colors create a strong visual impact, although the palette is limited to a few hues.",
    imageUrl: "/images/scales/color.svg"
  },
  {
    title: "Color Fit",
    description: "Assesses how appropriate and meaningful the color choices are to the subject matter.",
    rating: "5/5",
    explanation: "The colors used are highly appropriate and harmonious with the scene depicted. Brown for the trunk, green for foliage, and red for apples align with natural expectations. The ladder in black and the small yellow section of the person climbing the tree do not clash, ensuring a balanced composition.",
    imageUrl: "/images/scales/color-fit.svg"
  },
  {
    title: "Implied Energy",
    description: "Assesses the level of energy and vitality expressed in the artwork.",
    rating: "3/5",
    explanation: "While the person climbing the ladder suggests some dynamic action, the rest of the scene feels relatively static. The straight ladder and structured tree trunk contribute to a sense of stability, with minimal energetic or rapid movement implied in the lines.",
    imageUrl: "/images/scales/energy.svg"
  },
  {
    title: "Space",
    description: "Measures how space is utilized in the composition and the relationships between elements.",
    rating: "3/5",
    explanation: "About half of the page is utilized, focusing mostly on the central area. While the elements (tree, person, and ladder) are well placed, the composition leaves significant unused white space, particularly to the right.",
    imageUrl: "/images/scales/space.svg"
  },
  {
    title: "Integration",
    description: "Evaluates how well the various elements work together as a cohesive whole.",
    rating: "4/5",
    explanation: "The elements are integrated well—the tree, ladder, and person relate to one another logically. However, the background is entirely absent, which slightly reduces the overall cohesion of the scene.",
    imageUrl: "/images/scales/integration.svg"
  },
  {
    title: "Logic",
    description: "Evaluates the logical consistency and organization of the artwork.",
    rating: "5/5",
    explanation: "The arrangement of elements is logical and consistent with the theme of picking apples. The tree is appropriately large and fruit-bearing, and the ladder and person's position are plausible for someone trying to reach the apples.",
    imageUrl: "/images/scales/logic.svg"
  },
  {
    title: "Realism",
    description: "Assesses how realistically objects and scenes are portrayed.",
    rating: "4/5",
    explanation: "The scene is realistic in its proportions and placement of objects. The tree and apples are identifiable, and the ladder is appropriately scaled. The simplistic, cartoon-like style slightly reduces its overall realism.",
    imageUrl: "/images/scales/realism.svg"
  },
  {
    title: "Problem-Solving",
    description: "Evaluates the creative solutions used to represent challenging subjects.",
    rating: "5/5",
    explanation: "The problem of reaching apples from a tall tree is effectively solved with the inclusion of a ladder and a person actively climbing. The artist demonstrates clear intent and execution to depict this scenario.",
    imageUrl: "/images/scales/problem-solving.svg"
  },
  {
    title: "Developmental Level",
    description: "Considers the artistic developmental stage reflected in the work.",
    rating: "3/5",
    explanation: "The drawing shows moderate technical skill, with clear, purposeful lines and distinguishable objects. However, the simplicity of the shapes and lack of finer detail suggest an intermediate developmental level.",
    imageUrl: "/images/scales/development.svg"
  },
  {
    title: "Details of Objects & Environment",
    description: "Examines the level of detail and complexity in depicted objects and environmental elements.",
    rating: "3/5",
    explanation: "The objects included (tree, apples, ladder, person) are identifiable but lack intricate detail. The absence of environmental elements like sky, grass, or surrounding context limits the level of detail.",
    imageUrl: "/images/scales/details.svg"
  },
  {
    title: "Line Quality",
    description: "Analyzes the characteristics of lines including pressure, continuity, and control.",
    rating: "4/5",
    explanation: "The lines are clean, intentional, and confident. There are no visible signs of hesitancy or irregularity. However, they are relatively uniform in thickness and lack variation that could add dynamism.",
    imageUrl: "/images/scales/line.svg"
  },
  {
    title: "Person",
    description: "Evaluates the representation and completeness of human figures in the artwork.",
    rating: "2/5",
    explanation: "The person is represented by a very minimal and abstract form (yellow and partial structure), making them identifiable but lacking in proportion, detail, or completeness.",
    imageUrl: "/images/scales/person.svg"
  },
  {
    title: "Rotation",
    description: "Examines the orientation and rotation of objects within the composition.",
    rating: "0/5",
    explanation: "There are no rotated or distorted elements in the image. All components are drawn in conventional orientations.",
    imageUrl: "/images/scales/rotation.svg"
  },
  {
    title: "Perseveration",
    description: "Identifies repetitive elements and patterns in the artwork.",
    rating: "1/5",
    explanation: "While there is some repetition in the apples and tree branches, it is appropriate and not excessive. This repetition adds to the natural appearance of the tree rather than detracting from the composition.",
    imageUrl: "/images/scales/perseveration.svg"
  }
];

