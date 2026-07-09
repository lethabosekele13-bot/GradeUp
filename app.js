const startBtn = document.getElementById("startBtn");
const onboarding = document.getElementById("onboarding");
const container = document.querySelector(".container");
const nextBtn = document.getElementById("nextBtn");
const nameInput = document.getElementById("name");
const welcomeMessage = document.getElementById("welcomeMessage");
const subjectPage = document.getElementById("subjectPage");
const subjectWelcome = document.getElementById("subjectWelcome");
const subjectCheckboxes = document.querySelectorAll('.clean-list input[type="checkbox"]');
const subjectError = document.getElementById("subjectError");
const subjectNextBtn = document.getElementById("subjectNextBtn");
const performancePage = document.getElementById("performancePage");
const performanceWelcome = document.getElementById("performanceWelcome");
const marksContainer = document.getElementById("marksContainer");
const performanceNextBtn = document.getElementById("performanceNextBtn");
const schedulePage = document.getElementById("schedulePage");
const scheduleNextBtn = document.getElementById("scheduleNextBtn");
const homeTime = document.getElementById("homeTime");
const studyHours = document.getElementById("studyHours");
const studyDays = document.getElementById("studyDays");
let userProfile = JSON.parse(localStorage.getItem("userProfile")) || {};
let completedSessions = Number(localStorage.getItem("completedSessions")) || 0;
let currentSubjectIndex = Number(localStorage.getItem("currentSubjectIndex")) || 0;
const insights = [
"Success isn't built in one day. It's built one focused study session at a time.",
"Study your hardest subject first while your mind is fresh.",
"Your future self is depending on the choices you make today.",
"Take short breaks. A rested mind learns faster than a tired one.",
"Reading your notes is good. Testing yourself is even better.",
"Every chapter you finish today is one less chapter to worry about tomorrow.",
"Don't compare your progress to others. Compare today's effort to yesterday's.",
"Practice questions reveal what you know better than rereading your notes.",
"One focused hour is worth more than three distracted hours.",
"Confidence comes from preparation, not luck.",
"Teach someone what you've learned. Explaining is one of the best ways to learn.",
"Every great achievement begins with one small, consistent step.",
"Plan your study session before opening your books.",
"Mistakes are proof that you're learning. Correct them and keep moving.",
"Success belongs to students who keep showing up every day.",
"Put your phone away while studying. Protect your focus.",
"Don't wait until you feel motivated. Start first, and motivation often follows.",
"Review old topics regularly so you don't forget what you've already learned.",
"Small daily progress creates extraordinary results over time.",
"Learning is about understanding, not just memorizing.",
"Your goals become reality when your actions match your ambitions.",
"Every study session is an investment in your future.",
"Stay calm during difficult topics. Understanding takes time.",
"Before finishing today's session, spend five minutes reviewing what you learned.",
"Today's Action: Choose one topic you've been avoiding and give it your full attention today.",
"Discipline will carry you further than motivation alone.",
"Break large topics into smaller sections to avoid feeling overwhelmed.",
"Your results tomorrow are built by the effort you give today.",
"A clean study space helps create a focused mind.",
"Don't aim to study longer. Aim to study smarter.",
"Teach yourself to enjoy progress, not just perfect results.",
"One completed task builds momentum for the next one.",
"Every difficult question you solve makes you a stronger student.",
"Use your best hours of the day for your hardest work.",
"Consistency beats last-minute cramming every time.",
"Believe in your ability to improve, even when learning feels difficult.",
"Don't just read the answer. Understand why it's correct.",
"Every exam is an opportunity to show what you've prepared for.",
"Take a deep breath before every study session and focus on one task at a time.",
"Your brain remembers information better when you actively recall it instead of rereading it.",
"Review your mistakes. They often teach more than your correct answers.",
"Success is the result of hundreds of small decisions made consistently.",
"Study with purpose. Know exactly what you want to achieve before you begin.",
"Confidence grows every time you keep a promise to yourself.",
"Today's Action: Spend the first 10 minutes reviewing yesterday's work before starting something new.",
"Progress is measured by consistency, not perfection.",
"Choose improvement over excuses every single day.",
"Focus on what you can control: your effort, your attitude, and your preparation.",
"Your study habits today are shaping the opportunities you'll have tomorrow.",
"Today's Action: Finish one important task completely before moving on to the next."
];
const planPage = document.getElementById("planPage");
const planWelcome = document.getElementById("planWelcome");
const planContent = document.getElementById("planContent");
const continueBtn = document.getElementById("continueBtn");
const dashboardPage = document.getElementById("dashboardPage");
const dashboardWelcome = document.getElementById("dashboardWelcome");
const dashboardContent = document.getElementById("dashboardContent");
const studySessionBtn = document.getElementById("studySessionBtn");
const dailyQuote = document.getElementById("dailyQuote");
const overviewPage = document.getElementById("overviewPage");
const overviewContent = document.getElementById("overviewContent");
const averageTarget = document.getElementById("averageTarget");
const scheduleOverview = document.getElementById("scheduleOverview");
const startStudyBtn = document.getElementById("startStudyBtn");
const studyPage = document.getElementById("studyPage");
const studyContent = document.getElementById("studyContent");
const completeSessionBtn = document.getElementById("completeSessionBtn");
const sessionCount = document.getElementById("sessionCount");
const aboutBtn = document.getElementById("aboutBtn");
const aboutPage = document.getElementById("aboutPage");
const closeAboutBtn = document.getElementById("closeAboutBtn");
const aiTutorBtn = document.getElementById("aiTutorBtn");
const aiTutorPage = document.getElementById("aiTutorPage");
const closeAiBtn = document.getElementById("closeAiBtn");
const sendAiBtn = document.getElementById("sendAiBtn");
const aiInput = document.getElementById("aiInput");
const chatBox = document.getElementById("chatBox");
startBtn.addEventListener("click", function() {
    container.style.display = "none";
    onboarding.style.display = "block";
});
nextBtn.addEventListener("click", function() {
    const userName = nameInput.value;
    userProfile.name = userName;
    onboarding.style.display = "none";   
    subjectPage.style.display = "block";
    subjectWelcome.textContent = "Welcome, " + userName + "!"
});
subjectCheckboxes.forEach(function(checkbox) {
    checkbox.addEventListener("change",function() {
        const checkedSubjects = document.querySelectorAll('.clean-list input[type="checkbox"]:checked');
        if (checkedSubjects.length > 4) {
            checkbox.checked = false
           subjectError.textContent = "⚠ You can only choose 4 subjects."
        }
    });    
});
subjectNextBtn.addEventListener("click", function() {
    const checkedSubjects = document.querySelectorAll('.clean-list input[type="checkbox":checked');
    let selectedSubjects = [];
    checkedSubjects.forEach(function(subject) {
    selectedSubjects.push(subject.nextElementSibling.textContent);
});
    userProfile.subjects = selectedSubjects;
    if (checkedSubjects.length === 4) {
        subjectPage.style.display = "none";
        performancePage.style.display = "block";
        performanceWelcome.textContent = subjectWelcome.textContent;
        marksContainer.innerHTML = "";
        checkedSubjects.forEach(function(subject) {
           marksContainer.innerHTML += `<div class="mark-row"> <label>
            ${subject.nextElementSibling.textContent}</label>
            <input type="number" class="goal-input" placeholder="Target %" min="0" max="100">
            </div>
            `;
        });
    }
});
performanceNextBtn.addEventListener("click", function() {
    const goalInputs = document.querySelectorAll(".goal-input");
    const checkedSubjects = document.querySelectorAll('.clean-list input[type="checkbox"]:checked');
    let goals = {};
    checkedSubjects.forEach(function(subject, index) {
        const subjectName = subject.nextElementSibling.textContent;
        const value = goalInputs[index].value;
        goals[subjectName] = value;
    });
    userProfile.goals = goals;
    localStorage.setItem("userProfile", JSON.stringify(userProfile));
    console.log(userProfile);
    performancePage.style.display = "none";
    schedulePage.style.display = "block";
});
scheduleNextBtn.addEventListener("click", function() {
    const schedule = {
        homeTime: homeTime.value,
        studyHours: studyHours.value,
        studyDays: studyDays.value
    };
    userProfile.schedule = schedule;
    localStorage.setItem("userProfile", JSON.stringify(userProfile));
    console.log(userProfile);
    schedulePage.style.display = "none";
    planPage.style.display = "block";
planWelcome.textContent = "Welcome, " + userProfile.name + "! 👋";
planContent.innerHTML = "";
for (let subject in userProfile.goals) {
    planContent.innerHTML += `
        <p><strong>${subject}</strong> 🎯 Target: ${userProfile.goals[subject]}%</p>
    `;
}
});
continueBtn.addEventListener("click", function() {
    planPage.style.display = "none";
    dashboardPage.style.display = "block";
    dashboardWelcome.textContent = "Welcome back, " + userProfile.name + "! 👋";
    const randomIndex = Math.floor(Math.random() * insights.length);
    dailyQuote.textContent = insights[randomIndex];
});
studySessionBtn.addEventListener("click", function() {
    dashboardPage.style.display = "none";
    overviewPage.style.display = "block";
    let total = 0;
    let count = 0;
    for (let subject in userProfile.goals) {
        total += Number(userProfile.goals[subject]);
        count++;
    }
    let average = total / count;
    averageTarget.textContent =
    "Average Target 🎯 " + average.toFixed(1) + "%";
    overviewContent.innerHTML = "";
    for (let subject in userProfile.goals) {
        overviewContent.innerHTML += `
        <p>
        ${subject}: ${userProfile.goals[subject]}%
        </p>
        `;
    }
    scheduleOverview.innerHTML = `
    <h3>📅 Study Schedule</h3>
    <p>🏠 Home Time: ${userProfile.schedule.homeTime}</p>
    <p>⏰ Study Hours: ${userProfile.schedule.studyHours}</p>
    <p>📚 Study Days: ${userProfile.schedule.studyDays}</p>
`;    
});
startStudyBtn.addEventListener("click", function(){
    overviewPage.style.display = "none";
    studyPage.style.display = "block";
    const todaySubject = userProfile.subjects[currentSubjectIndex];
    studyContent.innerHTML = `
    <h3>${todaySubject} 📚</h3>
    <p>🎯 Target: ${userProfile.goals[todaySubject]}%</p>
    <p>⏰ Study Duration: ${userProfile.schedule.studyHours}</p>
    <h4>Today's Tasks</h4>
   <div class="task-item">
    <label><input type="checkbox"> Review your class notes</label>
</div>
<div class="task-item">
    <label><input type="checkbox"> Complete practice questions</label>
</div>
<div class="task-item">
    <label><input type="checkbox"> Write down difficult topics</label>
</div>
<div class="task-item">
    <label><input type="checkbox"> Test yourself without notes</label>
</div>
`;
});
completeSessionBtn.addEventListener("click", function() {
    alert("🎉 Excellent work, " + userProfile.name + "! You completed today's study session.");
    completedSessions++;
    currentSubjectIndex++;
if (currentSubjectIndex >= userProfile.subjects.length) {
    currentSubjectIndex = 0;
}
localStorage.setItem("currentSubjectIndex", currentSubjectIndex);
    localStorage.setItem("completedSessions", completedSessions);
sessionCount.textContent =
    "📚 Sessions Completed: " + completedSessions;
    studyPage.style.display = "none";
    dashboardPage.style.display = "block";
    const randomIndex = Math.floor(Math.random() * insights.length);
    dailyQuote.textContent = insights[randomIndex];
});
aboutBtn.addEventListener("click", function () {
    dashboardPage.style.display = "none";
    aboutPage.style.display = "block";
});
closeAboutBtn.addEventListener("click", function () {
    aboutPage.style.display = "none";
    dashboardPage.style.display = "block";
});
aiTutorBtn.addEventListener("click", function(){
    dashboardPage.style.display = "none";
    studyPage.style.display = "none";
    aiTutorPage.style.display = "block";
});
closeAiBtn.addEventListener("click", function(){
    aiTutorPage.style.display = "none";
    studyPage.style.display = "block";
});

sendAiBtn.addEventListener("click", async function () {

    const question = aiInput.value.trim();

    if (question === "") return;

    chatBox.innerHTML += `
        <p><strong>You:</strong> ${question}</p>
    `;

    aiInput.value = "";

    chatBox.innerHTML += `
        <div id="thinking" class="thinking-message">
            🧠 <strong>GradeUp AI</strong> is thinking<span class="dots"></span>
        </div>
    `;

    const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: question
        })
    });

    const data = await response.json();

    document.getElementById("thinking").remove();

    chatBox.innerHTML += `
        <p><strong>GradeUp AI:</strong> ${data.reply}</p>
    `;

});


window.addEventListener("load", function () {
    const savedProfile = JSON.parse(localStorage.getItem("userProfile"));

    if (savedProfile && savedProfile.name) {
        userProfile = savedProfile;

        container.style.display = "none";
        onboarding.style.display = "none";
        subjectPage.style.display = "none";
        performancePage.style.display = "none";
        schedulePage.style.display = "none";
        planPage.style.display = "none";
        overviewPage.style.display = "none";
        studyPage.style.display = "none";
        aboutPage.style.display = "none";
        aiTutorPage.style.display = "none";

        dashboardPage.style.display = "block";
        dashboardWelcome.textContent = "Welcome back, " + userProfile.name + "! 👋";

        const randomIndex = Math.floor(Math.random() * insights.length);
        dailyQuote.textContent = insights[randomIndex];

        sessionCount.textContent =
            "📚 Sessions Completed: " + completedSessions;
    }
});
