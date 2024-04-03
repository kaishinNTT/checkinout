// Khởi tạo đối tượng để lưu trạng thái "check in" và "check out" của từng nhân viên
const employeeStatus = {
    employeeA: { checkedIn: null, checkedOut: null },
    employeeB: { checkedIn: null, checkedOut: null },
    employeeC: { checkedIn: null, checkedOut: null }
};

// Biến đếm số lần check in của từng nhân viên
const checkInCount = {};

// Khởi tạo các phần tử DOM cần thiết
const clock = document.getElementById('clock');
const employeeNameSelect = document.getElementById('employeeName');
const checkInButton = document.querySelector('.check-in');
const checkOutButton = document.querySelector('.check-out');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const closePopupButton = document.getElementById('close-popup');

// Biến đếm thời gian hiển thị pop-up
let popupDisplayTime;

// Function to update the clock every second
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    clock.textContent = `${hours}:${minutes}:${seconds}`;
}

// Function to display popup
function displayPopup(message) {
    if (popup.style.display === 'block') {
        clearTimeout(popupDisplayTime); // Xóa bộ đếm thời gian hiện tại
    }
    popupMessage.textContent = message;
    popup.style.display = 'block';

    // Thiết lập bộ đếm thời gian mới
    popupDisplayTime = setTimeout(() => {
        closePopup();
    }, 5000); // Tắt pop-up sau 5 giây
}

// Function to close popup
function closePopup() {
    popup.style.display = 'none';
    // Xóa bộ đếm thời gian nếu pop-up được đóng trước khi hết thời gian
    clearTimeout(popupDisplayTime);
}

// Function to refresh employee list
function refreshEmployeeList() {
    employeeNameSelect.value = '';
}

// Function to handle check in
function checkIn() {
    const employeeName = employeeNameSelect.value;

    if (!employeeName) {
        displayPopup('Vui lòng chọn tên nhân viên!');
        return;
    }

    if (employeeStatus[employeeName].checkedIn !== null) {
        displayPopup(`Nhân viên ${employeeName} đã check in lúc ${formatTime(employeeStatus[employeeName].checkedIn)}!`);
        return;
    }

    const currentTime = new Date();

    console.log(`Check in: ${employeeName} lúc ${formatTime(currentTime)}`);

    // Hiển thị pop-up và tắt sau 4 giây nếu là lần check in đầu tiên
    displayPopup(`Nhân viên ${employeeName} đã check in lúc ${formatTime(currentTime)} thành công!`);
    setTimeout(() => {
        if (!checkInCount[employeeName] || checkInCount[employeeName] === 1) {
            closePopup();
        }
    }, 4000);

    // Cập nhật trạng thái nhân viên
    updateEmployeeStatus(employeeName, currentTime);

    refreshEmployeeList();
}

// Function to handle check out
function checkOut() {
    const employeeName = employeeNameSelect.value;

    if (!employeeName) {
        displayPopup('Vui lòng chọn tên nhân viên!');
        return;
    }

    if (employeeStatus[employeeName].checkedOut !== null) {
        displayPopup(`Nhân viên ${employeeName} đã check out lúc ${formatTime(employeeStatus[employeeName].checkedOut)}!`);
        return;
    }

    const currentTime = new Date();

    console.log(`Check out: ${employeeName} lúc ${formatTime(currentTime)}`);

    displayPopup(`Nhân viên ${employeeName} đã check out lúc ${formatTime(currentTime)} thành công!`);

    // Cập nhật trạng thái nhân viên
    updateEmployeeStatus(employeeName, null, currentTime);

    refreshEmployeeList();
}

// Function to update employee status
function updateEmployeeStatus(employeeName, checkedInTime = null, checkedOutTime = null) {
    employeeStatus[employeeName].checkedIn = checkedInTime;
    employeeStatus[employeeName].checkedOut = checkedOutTime;

    // Tăng biến đếm check in cho nhân viên
    checkInCount[employeeName] = checkInCount[employeeName] ? checkInCount[employeeName] + 1 : 1;
}

// Format thời gian thành chuỗi 'HH:MM:SS'
function formatTime(time) {
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

// Add event listeners to buttons
checkInButton.addEventListener('click', checkIn);
checkOutButton.addEventListener('click', checkOut);
closePopupButton.addEventListener('click', closePopup);

// Add event listener to employeeNameSelect to close popup when employee changes
employeeNameSelect.addEventListener('change', function() {
    if (popup.style.display === 'block') {
        closePopup();
    }
});

// Set interval for updating clock
setInterval(updateClock, 1000);

// Initial clock update
updateClock();
