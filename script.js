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
  
  // Update the clock every second
  function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    clock.textContent = `${hours}:${minutes}:${seconds}`;
  }
  
  // Function to display popup
  function displayPopup(message) {
    popupMessage.textContent = message;
    popup.style.display = 'block';
  }
  
  // Function to close popup
  function closePopup() {
    popup.style.display = 'none';
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
  
    employeeStatus[employeeName].checkedIn = currentTime;
    employeeStatus[employeeName].checkedOut = null;
  
    // Tăng biến đếm check in cho nhân viên
    checkInCount[employeeName] = checkInCount[employeeName] ? checkInCount[employeeName] + 1 : 1;
  
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
  
    employeeStatus[employeeName].checkedOut = currentTime;
  
    refreshEmployeeList();
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
  
  // Set interval for updating clock
  setInterval(updateClock, 1000);
  
  // Initial clock update
  updateClock();
  