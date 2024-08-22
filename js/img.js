"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Image and paragraph pairs
  const imageParagraphPairs = document.querySelectorAll("main div");

  // Function to toggle visibility of image and paragraph
  const toggleImageParagraph = (image, paragraph) => {
    image.style.display = image.style.display === "none" ? "block" : "none";
    paragraph.style.display =
      paragraph.style.display === "none" ? "block" : "none";
  };

  // Hide all paragraphs initially
  imageParagraphPairs.forEach((pair) => {
    const paragraph = pair.querySelector("p");
    paragraph.style.display = "none";
  });

  // Add click event listener to each image
  imageParagraphPairs.forEach((pair) => {
    const image = pair.querySelector("img");
    const paragraph = pair.querySelector("p");

    image.addEventListener("click", () => {
      toggleImageParagraph(image, paragraph);
    });

    paragraph.addEventListener("click", () => {
      toggleImageParagraph(image, paragraph);
    });
  });
});
