async function uploadImage(event) {
    event.preventDefault(); // Prevent default form submission behavior
  
    const fileInput = document.getElementById('image-input');
    const ocrResultElement = document.getElementById('ocr-result');
  
    const formData = new FormData();
    formData.append('idCardImage', fileInput.files[0]);
  
    try {
      const response = await fetch('http://localhost:3000/api/ocr', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`OCR failed: ${response.statusText}`);
      }
  
      const ocrData = await response.json();
      displayOCRResult(ocrData);
    } catch (error) {
      console.error(error.message);
      ocrResultElement.textContent = 'OCR failed. Please try again.';
    }
  }
  
  function displayOCRResult(ocrData) {
    const ocrResultElement = document.getElementById('ocr-result');
    ocrResultElement.innerHTML = `
      <p>Identification Number: ${ocrData.identificationNumber}</p>
      <p>Name: ${ocrData.name}</p>
      <p>Last Name: ${ocrData.lastName}</p>
      <p>Date of Birth: ${ocrData.dateOfBirth}</p>
      <p>Date of Issue: ${ocrData.dateOfIssue}</p>
      <p>Date of Expiry: ${ocrData.dateOfExpiry}</p>
    `;
  }
  
  document.getElementById('upload-form').addEventListener('submit', uploadImage);
  