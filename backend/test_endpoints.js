
const BASE_URL = 'http://localhost:4000/api';

const testEndpoints = async () => {
    try {
        console.log("🚀 Starting Backend Verify...");

        // 1. Register User
        console.log("\n1. Testing Register User...");
        const registerRes = await fetch(`${BASE_URL}/user/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: "Test User",
                email: `test${Date.now()}@example.com`,
                password: "password123"
            })
        });
        const registerData = await registerRes.json();
        console.log("Register Response:", registerData);
        if (!registerData.success) throw new Error("Register Failed");
        const token = registerData.token;

        // 2. Add Doctor (Simulated Admin)
        // Note: In a real app we need an image file. 
        // For testing add-doctor without a file might fail because of upload.single('image') middleware?
        // Let's first test Doctor List which should be empty or have seeded data if any.

        console.log("\n2. Testing List Doctors...");
        const listDocRes = await fetch(`${BASE_URL}/doctor/list`);
        const listDocData = await listDocRes.json();
        console.log("Doctors List:", listDocData.doctors.length, "doctors found");

        if (listDocData.doctors.length === 0) {
            console.log("No doctors to test appointment. Please add a doctor manually via Postman or ensure seed data.");
            // We can't easily test booking without a doctor.
            // But we can test user profile.
        }

        // 3. Get User Profile
        console.log("\n3. Testing Get Profile...");
        const profileRes = await fetch(`${BASE_URL}/user/get-profile`, {
            headers: { 'token': token }
        });
        const profileData = await profileRes.json();
        console.log("Profile Data:", profileData.success ? profileData.userData.name : profileData.message);

        // 4. Book Appointment (Only if doctor exists)
        if (listDocData.doctors.length > 0) {
            const docId = listDocData.doctors[0]._id;
            console.log(`\n4. Booking Appointment with Doctor ID: ${docId}`);
            const bookRes = await fetch(`${BASE_URL}/user/book-appointment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                },
                body: JSON.stringify({
                    userId: profileData.userData._id, // middleware adds userId to body, but controller reads from body. Wait, authUser adds it to req.body.userId.
                    // The controller expects userId in req.body. authMiddleware adds it.
                    // But we also need docId, slotDate, slotTime.
                    docId: docId,
                    slotDate: "10_10_2025",
                    slotTime: "10:00 AM"
                })
            });
            const bookData = await bookRes.json();
            console.log("Booking Response:", bookData);

            // 5. List Appointments
            console.log("\n5. Listing Appointments...");
            const appointRes = await fetch(`${BASE_URL}/user/appointments`, {
                headers: { 'token': token }
            });
            const appointData = await appointRes.json();
            console.log("Appointments found:", appointData.appointments.length);
        }

        console.log("\n✅ API Tests Completed");

    } catch (error) {
        console.error("\n❌ Test Failed:", error.message);
    }
}

testEndpoints();
