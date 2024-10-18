 
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
            'Application-Key': 'TUb7e122643229af5c3d89744f0d3ba895be2e8bd72565011da7c4b4e0cbd2b939e558b370ef80479541b5c576f660c192'
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
 