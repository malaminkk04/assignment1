 
function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginData = {};
    loginData.UserName = username;
    loginData.PassWord = password;
    var jsonData = JSON.stringify(loginData);
    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify2', {
         method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key': 'TUf2baece2fcc2afe6b616b55f91612886ce6e68dd18e6fa95e2b801467e65df80659bade67d90f082eee43a92a161033a'
        },
        body: jsonData,
    })
    .then(response => response.json())
    .then(data => {
        const resultDiv = document.getElementById('massage');
        resultDiv.innerHTML = `
        <p><strong>${data.status ? 'Success' : 'Failed'}</strong> </p>
        <p>ID : ${data.username|| 'N/A'}</p>
        <p>Name : ${data.displayname_en || 'N/A'}</p>
        `;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        const resultDiv = document.getElementById('output');
        resultDiv.innerHTML = '<p>Error fetching data. Please try again.</p>';
    });
}
 