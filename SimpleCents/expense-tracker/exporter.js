function exportToFile() {
    const inputs = [
        document.getElementById('workHours').value,
        document.getElementById('payRate').value,
        document.getElementById('groceries').value,
        document.getElementById('rent').value,
        document.getElementById('util').value,
        document.getElementById('clothing').value,
        document.getElementById('entertainment').value,
        document.getElementById('food').value
    ];
    // Get the user input value
    const userInput = inputs.join('\n');

    // Create a Blob with the user input
    const blob = new Blob([userInput], { type: 'text/plain' });

    // Create a link element
    const link = document.createElement('a');

    // Set the download attribute with a filename
    link.download = 'userInput.txt';

    // Create a URL for the Blob and set it as the href attribute
    link.href = window.URL.createObjectURL(blob);

    // Append the link to the body
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
}
