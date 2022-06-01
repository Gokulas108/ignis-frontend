import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { useEffect, useState } from "react";

const LoadPDF = () => {
	const [pdfInfo, setPdfInfo] = useState([]);

	useEffect(() => {
		modifyPdf();
	}, []);

	const modifyPdf = async () => {
		try {
			const existingPdfBytes = await fetch("/Template3.pdf").then((res) =>
				res.arrayBuffer()
			);

			const pdfDoc = await PDFDocument.load(existingPdfBytes);
			const form = pdfDoc.getForm();
			const textField = form.getTextField("apple");
			textField.setText("hello");
			// const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

			// const form = pdfDoc.getForm();
			const fields = form.getFields();
			fields.forEach((field) => {
				const type = field.constructor.name;
				const name = field.getName();
				console.log(`${type}: ${name}`);
			});

			const pages = pdfDoc.getPages();
			const firstPage = pages[0];

			// Get the width and height of the first page
			const { width, height } = firstPage.getSize();
			const pdfBytes = await pdfDoc.save();
			const bytes = new Uint8Array(pdfBytes);
			const blob = new Blob([bytes], { type: "application/pdf" });
			const docUrl = URL.createObjectURL(blob);
			// const tempLink = document.createElement("a");
			// tempLink.href = docUrl;
			// tempLink.setAttribute("download", "test.pdf");
			// tempLink.click();
			setPdfInfo(docUrl);
		} catch (error) {
			console.log("error", error);
		}
	};

	return (
		<>
			{
				<iframe
					title="test-frame"
					src={pdfInfo}
					type="application/pdf"
					style={{ height: "100vh", width: "100%" }}
				/>
			}
		</>
	);
};

export default LoadPDF;
