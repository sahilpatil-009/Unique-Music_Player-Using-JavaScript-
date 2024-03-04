document.addEventListener('DOMContentLoaded', function () {
    // Addsong link
    const addSongLink = document.querySelector('.menu a[href="#Addsong"]');
    const addSongForm = document.getElementById('addSongForm');

    addSongLink.addEventListener('click', function (event) {
        event.preventDefault();
        toggleAddSongForm();
    });

    function toggleAddSongForm() {
        addSongForm.style.display = addSongForm.style.display === 'block' ? 'none' : 'block';
    }

    // Song form submission
    const songForm = document.getElementById('songForm');

    songForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Handle form submission logic (e.g., send data to the server)
        // You can use FormData to gather form data and send it via fetch or XMLHttpRequest
        const formData = new FormData(songForm);

        fetch('http://localhost:50633/api/songs', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            // Handle success (e.g., show a success message, update UI)
            console.log(data);
        })
        .catch(error => {
            // Handle error (e.g., show an error message, log the error)
            console.error('Error adding song:', error);
        });
    });
});