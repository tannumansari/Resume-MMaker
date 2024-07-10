tinymce.init({
    selector: 'textarea',
    plugins: 'lists link image code spellchecker',
    toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright | bullist numlist | link image | code | spellchecker',
    menubar: false,
    statusbar: false
  });
document.getElementById('resume-form').addEventListener('submit', function(event) {
    event.preventDefault();
    updatePreview();

    const format = document.getElementById('format-choice').value;
    if (format === 'pdf') {
        generatePDF();
    } else if (format === 'docx') {
        generateDocx();
    } else {
        generateTxt();
    }
});

function updatePreview() {
    const preview = document.getElementById('resume-preview');
    preview.innerHTML = generateResumeHTML();
}

function generateResumeHTML() {
    let html = `
        <h1>${document.getElementById('name').value}</h1>
        <p>${document.getElementById('email').value} | ${document.getElementById('phone').value} | ${document.getElementById('linkedin').value}</p>
        <h2>Professional Summary</h2>
        <p>${document.getElementById('summary').value}</p>
        <h2>Skills</h2>
        <p>${document.getElementById('skills').value}</p>
        ${generateSectionHTML('Education')}
        ${generateSectionHTML('Experience')}
        ${generateSectionHTML('Project')}
        ${generateSectionHTML('Certification')}
        ${generateSectionHTML('Language')}
        ${generateSectionHTML('Reference')}
    `;
    return html;
}

function generateSectionHTML(section) {
    const sectionId = section.toLowerCase() + '-section';
    const sectionDiv = document.getElementById(sectionId);
    let html = `<h2>${section}</h2>`;
    for (let i = 0; i < sectionDiv.children.length; i += 4) {
        html += `<p><strong>${sectionDiv.children[i].value}</strong> - ${sectionDiv.children[i+1].value} (${sectionDiv.children[i+2].value})<br>${sectionDiv.children[i+3].value}</p>`;
    }
    return html;
}

function addSection(sectionId, section) {
    const sectionDiv = document.getElementById(sectionId);
    sectionDiv.innerHTML += `
        <input type="text" placeholder="${section} Title">
        <input type="text" placeholder="${section === 'Education' ? 'Institution' : 'Company'}">
        <input type="text" placeholder="${section === 'Education' ? 'Year of Graduation' : 'Duration'}">
        <textarea placeholder="${section === 'Project' ? 'Description' : 'Responsibilities and achievements'}"></textarea>
    `;
}

function generatePDF() {
    const element = document.createElement('a');
    const resumeHTML = generateResumeHTML();
    const blob = new Blob([resumeHTML], {type: 'application/pdf'});
    element.href = URL.createObjectURL(blob);
    element.download = 'resume.pdf';
    document.body.appendChild(element);
    element.click();
}
        function generateDocx() {
            const element = document.createElement('a');
            const resumeHTML = generateResumeHTML();
            const blob = new Blob([resumeHTML], {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
            element.href = URL.createObjectURL(blob);
            element.download = 'resume.docx';
            document.body.appendChild(element);
            element.click();
        }
        
        function generateTxt() {
            const element = document.createElement('a');
            const resumeHTML = generateResumeHTML();
            const blob = new Blob([resumeHTML], {type: 'text/plain'});
            element.href = URL.createObjectURL(blob);
            element.download = 'resume.txt';
            document.body.appendChild(element);
            element.click();
        }