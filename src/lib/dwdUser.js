import { jsPDF } from "jspdf";

export const downloadUserPDF = (user) => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text("User Profile Information", 20, 20);

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
