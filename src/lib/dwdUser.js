import { jsPDF } from "jspdf";
import { imageToBase64 } from "./imageToBase64";

export const downloadUserPDF = async(user) => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text("User Profile Information", 20, 20);
  // Add image if available
  if (user.photoURL) {
    const imageData = await imageToBase64(user.photoURL);

    doc.addImage(
      imageData,
      "JPEG",
      150,
      10,
      40,
      40
    );
  }

  // User details
  doc.setFontSize(12);
  doc.text(`Email: ${user.email || "N/A"}`, 20, 50);
  doc.text(`Role: ${user.role || "N/A"}`, 20, 60);

  // Optional extra info (if exists)
  if (user.uid) {
    doc.text(`UID: ${user.uid}`, 20, 70);
  }

  // Footer
  doc.setFontSize(10);
  doc.text("Generated using Firebase + Next.js App", 20, 90);

  // Download
  doc.save("user-info.pdf");
};
