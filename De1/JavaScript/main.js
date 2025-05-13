document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".form-dat-tour");
    const tourList = document.createElement("div"); // Khu vực hiển thị danh sách phiếu đăng ký
    tourList.classList.add("tour-list");
    document.body.appendChild(tourList);

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Ngăn chặn reload trang khi submit

        // Thu thập dữ liệu từ form
        const tourData = {
            hoten: form.hoten.value,
            dienthoai: form.dienthoai.value,
            email: form.email.value,
            nguoilon: form.nguoilon.value,
            treem: form.treem.value,
            thanhtoan: form.thanhtoan.value,
            ghichu: form.ghichu.value,
        };

        // Lấy danh sách phiếu đăng ký hiện tại từ localStorage
        let storedTours = JSON.parse(localStorage.getItem("tourList")) || [];
        storedTours.push(tourData); // Thêm dữ liệu mới vào danh sách

        // Lưu lại vào localStorage
        localStorage.setItem("tourList", JSON.stringify(storedTours));

        // Hiển thị danh sách phiếu đăng ký
        displayTourList();
        form.reset(); // Reset form sau khi lưu
    });

    // Hàm hiển thị danh sách phiếu đăng ký
    function displayTourList() {
        tourList.innerHTML = "<h2>Danh sách phiếu đăng ký tour</h2>";

        let storedTours = JSON.parse(localStorage.getItem("tourList")) || [];

        storedTours.forEach((tour, index) => {
            const tourItem = document.createElement("div");
            tourItem.classList.add("tour-item");
            tourItem.innerHTML = `
                <p><strong>Họ tên:</strong> ${tour.hoten}</p>
                <p><strong>Điện thoại:</strong> ${tour.dienthoai}</p>
                <p><strong>Email:</strong> ${tour.email}</p>
                <p><strong>Số người lớn:</strong> ${tour.nguoilon}</p>
                <p><strong>Số trẻ em:</strong> ${tour.treem}</p>
                <p><strong>Phương thức thanh toán:</strong> ${tour.thanhtoan}</p>
                <p><strong>Yêu cầu đặc biệt:</strong> ${tour.ghichu}</p>
                <button onclick="deleteTour(${index})">Xóa</button>
            `;
            tourList.appendChild(tourItem);
        });
    }

    // Hàm xóa một phiếu đăng ký
    window.deleteTour = function(index) {
        let storedTours = JSON.parse(localStorage.getItem("tourList")) || [];
        storedTours.splice(index, 1); // Xóa phần tử tại vị trí index
        localStorage.setItem("tourList", JSON.stringify(storedTours)); // Cập nhật lại localStorage
        displayTourList(); // Hiển thị lại danh sách
    };

    // Hiển thị danh sách khi tải trang
    displayTourList();
});