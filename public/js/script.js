function submitLogin() {
    // รับค่า username และ password จาก input
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    const messageDiv = document.getElementById('message'); // ให้ตรงกับ HTML ที่แก้ไขแล้ว

    // ตรวจสอบว่าได้เลือก role หรือยัง
    if (!role) {
        alert("กรุณาเลือก Role ก่อนเข้าสู่ระบบ");
        return;
    }

    // เตรียมข้อมูลการเข้าสู่ระบบเป็น JSON
    const loginData = {
        UserName: username,
        PassWord: password
    };
    const jsonData = JSON.stringify(loginData);

    // เรียกใช้งาน API สำหรับการตรวจสอบข้อมูล
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
        // ตรวจสอบสถานะการเข้าสู่ระบบและแสดงข้อความ
        if (data.status && username === "apisada") {
            // กรณีสำเร็จ แสดงชื่อ "นางสาวอภิษฎา ไชยเสนา, คณะวิทยาศาสตร์และเทคโนโลยี"
            messageDiv.innerHTML = `
                <p style="color: green;"><strong>Success</strong></p>
                <p>นางสาวอภิษฎา ไชยเสนา, คณะวิทยาศาสตร์และเทคโนโลยี</p>
            `;
            // บันทึกผู้ใช้ลงฐานข้อมูล
            saveUser(username, role);
        } else {
            // กรณีเกิดข้อผิดพลาด
            alert("Error: ไม่สามารถ Login ได้สำเร็จ"); // แจ้งเตือนแบบ pop-up
        }
    })
    .catch(error => {
        // จัดการข้อผิดพลาดในการเรียก API
        console.error('Error fetching data:', error);
        messageDiv.innerHTML = `
            <p style="color: red;">Error fetching data. Please try again.</p>
        `;
    });
}

function saveUser(username, role) {
    // ฟังก์ชันนี้ใช้สำหรับการบันทึกข้อมูลผู้ใช้ลงฐานข้อมูล
    // การทำงานนี้สามารถปรับให้เรียก API หรือเชื่อมต่อกับ backend ได้
    console.log(`User ${username} with role ${role} saved to database.`);
}
