// 1. STATE CHECK: Is the user logged in?
const userData = JSON.parse(localStorage.getItem('user'));

if (!userData) {
    // If no user in localStorage, redirect to login
    window.location.href = '/login.html';
} else {
    document.getElementById('welcome-msg').innerText = `Logged in as: ${userData.FullName}`;
}

// 2. CREATE WORKOUT (The Form Submission)
const workoutForm = document.getElementById('workout-form');

workoutForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('workoutName').value;
    const description = document.getElementById('workoutDesc').value;

    const workoutData = {
        name: name,
        description: description,
        userId: userData.UserID // Grabbed from our 'state'
    };

    try {
        const response = await fetch('/workoutroutine', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(workoutData)
        });

        if (response.ok) {
            alert("Workout saved!");
            workoutForm.reset();
            loadWorkouts(); // Refresh the list
        }
    } catch (err) {
        console.error("Error:", err);
    }
});

// 3. READ WORKOUTS (Displaying them)
async function loadWorkouts() {
    const list = document.getElementById('workout-list');
    try {
        const response = await fetch('/workoutroutine');
        const workouts = await response.json();

        list.innerHTML = workouts.map(w => `
            <div class="workout-card">
                <h3>${w.WorkoutName}</h3>
                <p>${w.WorkoutDescription}</p>
                <button onclick="deleteRoutine(${w.WorkoutID})">Delete</button>
            </div>
        `).join('');
    } catch (err) {
        console.error("Error loading workouts:", err);
    }
}

// 4. DELETE WORKOUT
async function deleteRoutine(id) {
    if(!confirm("Are you sure?")) return;
    
    await fetch(`/workoutroutine/${id}`, { method: 'DELETE' });
    loadWorkouts();
}

// 5. LOGOUT
function logout() {
    localStorage.removeItem('user');
    window.location.href = '/login.html';
}

// Initialize the list on page load
loadWorkouts();

window.location.href = "login.html";
