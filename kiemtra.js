document.addEventListener("DOMContentLoaded", function() {
    const tourList = document.getElementById('tourList');
    const tourTable = document.getElementById('tourTable');
    
    function addTourToList(tour) {
        const row = tourTable.insertRow();
        row.innerHTML = `
            <td>${tour.tourId}</td>
            <td>${tour.destination}</td>
            <td>${tour.price}</td>
            <td><img src="${tour.image}" alt="${tour.destination}" style="max-width: 100px;"></td>
            <td><button onclick="window.updateTour(this)">Cập nhật</button> <button onclick="window.deleteTour(this)">Xoá</button></td>
        `;
    }
    
    document.getElementById('tourForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const tourId = document.getElementById('tourId').value;
        const destination = document.getElementById('destination').value;
        const price = document.getElementById('price').value;
        const image = document.getElementById('image').files[0];
        
        const reader = new FileReader();
        reader.onload = function() {
            const imageDataURL = reader.result;
            const tour = {
                tourId: tourId,
                destination: destination,
                price: price,
                image: imageDataURL
            };
            
            addTourToList(tour);
            document.getElementById('tourForm').reset();
        };
        reader.readAsDataURL(image);
    });
    
    window.updateTour = function(button) {
        const row = button.closest('tr');
        const cells = row.cells;
        
        const tourId = cells[0].textContent;
        const destination = cells[1].textContent;
        const price = cells[2].textContent;
        const image = cells[3].querySelector('img').src;
        
        document.getElementById('tourId').value = tourId;
        document.getElementById('destination').value = destination;
        document.getElementById('price').value = price;
        
        row.remove();
    }
    
    window.deleteTour = function(button) {
        const row = button.closest('tr');
        row.remove();
    }
});
