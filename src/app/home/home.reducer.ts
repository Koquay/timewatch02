export const HomeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};

const initialState = {
  carousel: [
    { img: "carousel-img-1.jpg", active: "active" },
    { img: "carousel-img-2.jpg", active: "" },
    { img: "carousel-img-3.jpg", active: "" },
  ],

  brands: {
    designs: ["design-1.png", "design-2.png", "design-3.png", "design-4.png"],
    brands: ["brand-1.jpg", "brand-2.jpg", "brand-3.jpg"],
  },

  employees: [
    {
      img: "employee1.jpg",
      name: "Susan Kelly",
      title: "Web Designer",
      bio:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit laborum.",
    },
    {
      img: "employee2.jpg",
      name: "James Kelly",
      title: "Web Developer",
      bio:
        "Lorem ipsum dolor sit amet,  magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit laborum.",
    },
    {
      img: "employee3.jpg",
      name: "Nancy Kelly",
      title: "Project Manager",
      bio:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut .",
    },
  ],

  blogs: [
    {
      img: "blog-1.jpg",
      topic: "Artisan wines from Napa Valley",
      date: "06/20/20",
      excerpt:
        "Rem ipsum doLorem ipsum ut labore et dolore magna.Lorem ipsum doLorem ipsum dolor sit amet, consectetur Lorem ipsum doLorem ipsum dolor sit amet doLorem ipsum dolor sit amet adipisicing...",
    },
    {
      img: "blog-2.jpg",
      topic: "350000+ expert wine ratings",
      date: "06/22/20",
      excerpt:
        "Rem ipsum doLorem ipsum ut labore et dolore magna.Lorem ipsum doLorem ipsum dolor sit amet, consectetur Lorem ipsum doLorem ipsum dolor sit amet doLorem ipsum dolor sit amet adipisicing...",
    },
  ],
};
