const Displaytext = document.getElementById("displayText");
const input = document.getElementById("typingInput");
const Timer = document.getElementById("timerDisplay");
const Speed = document.getElementById("speedDisplay");
const btn = document.getElementById("btn");
const Accuracy = document.getElementById("Accuracy");

let bool = false;
let time = 150;
let IntervalId = null;
const paragraphs = [
    "Technology has become an inseparable part of our lives, influencing everything from how we communicate to how we work. With smartphones in every pocket and smart devices in every home, people now expect instant access to information and services. However, with great convenience comes great responsibility. Users must be mindful of privacy, security, and the impact of digital footprints. As we move deeper into the age of automation, understanding technology becomes not just a skill, but a necessity.",

    "The vast expanse of the ocean covers more than seventy percent of the Earth's surface, yet much of it remains unexplored. Beneath the waves lie ecosystems teeming with life, many of which are still unknown to science. Coral reefs, often called the rainforests of the sea, support a staggering variety of organisms. Despite their importance, human activities such as pollution, overfishing, and climate change threaten these delicate environments. Conservation efforts are crucial to preserve marine biodiversity.",

    "Throughout history, storytelling has played a vital role in passing down traditions, sharing knowledge, and inspiring generations. Whether written in books, performed on stage, or shown through films, stories help people connect to experiences beyond their own. They allow us to see the world from different perspectives and foster empathy. In an increasingly digital world, storytelling continues to evolve, embracing new platforms and formats, yet its core purpose remains unchanged: to connect and to communicate.",

    "The human brain is an incredibly complex organ, responsible for every thought, feeling, and action. Neurons communicate through electrical impulses and chemical signals, forming networks that govern everything from memory to movement. Scientists are constantly discovering more about the brain's plasticity — its ability to adapt and rewire itself. This has led to breakthroughs in treating injuries, understanding mental health, and even developing brain-computer interfaces. Despite these advances, much about the brain remains a mystery.",

    "In today’s fast-paced world, stress has become a common part of life. Whether it stems from work, relationships, or daily responsibilities, prolonged stress can affect both physical and mental health. Learning to manage stress through techniques like mindfulness, exercise, and proper sleep is essential for well-being. It's also important to foster strong social connections and seek support when needed. A balanced lifestyle that includes time for rest and recreation is key to maintaining a healthy mind and body.",

    "Space exploration has long captured the imagination of humankind. From the first steps on the Moon to the current exploration of Mars, our journey beyond Earth continues to inspire awe and curiosity. Advances in technology have made it possible to send probes to the farthest reaches of the solar system, revealing incredible details about planets, moons, and asteroids. As private companies join the space race, the dream of making space travel accessible to more people is becoming a reality.",

    "Education is the foundation of progress, enabling individuals to unlock their potential and contribute to society. In the modern world, access to education has expanded through online platforms, offering opportunities to learn new skills at any age. However, challenges remain, such as inequality, lack of resources, and outdated curricula. A future-focused education system must be inclusive, adaptable, and geared toward critical thinking and creativity to prepare students for the challenges of tomorrow.",

    "Nature offers countless benefits to human well-being, from the air we breathe to the food we eat. Spending time in natural settings has been shown to reduce stress, improve mood, and boost physical health. Unfortunately, environmental degradation is threatening these benefits. Deforestation, pollution, and climate change are disrupting ecosystems and endangering species. Sustainable practices, conservation efforts, and responsible consumption are vital to protect the planet for future generations.",

    "The digital age has revolutionized how people access and share information. Social media platforms, online news, and instant messaging have made communication faster and more widespread than ever before. However, this convenience comes with challenges such as misinformation, cyberbullying, and data privacy issues. It is important for users to develop digital literacy — the ability to evaluate content critically, protect their information, and use technology responsibly in a connected world.",

    "Health and fitness play a crucial role in leading a fulfilling life. Regular physical activity not only strengthens the body but also improves mental clarity and emotional balance. A nutritious diet, adequate sleep, and hydration are fundamental to maintaining energy and preventing disease. As lifestyles become more sedentary, it's more important than ever to integrate movement into daily routines. Small habits like walking, stretching, and mindful breathing can have a big impact over time."
];

// get a random paragraph from the array 
function showpara() {
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    Displaytext.innerHTML = paragraphs[randomIndex];
}


// display timer decreasing by 1 and handle all neccesary things in dom;

function Timerfunc() {

    IntervalId = setInterval(() => {
        if (time > 0) {
            time--; // time decrease by one every seconds
            let minute = Math.floor(time / 60); // returns minutes
            let second = time % 60;// returns seconds
            Timer.innerHTML = second < 10 ? `${minute}:0${second}` : `${minute}:${second}`;
            btn.disabled = true; // btn disable to handle if user click on the time of one paragraph running
        } else {
            alert("Time up Remove your hands from keyboard")
            clearInterval(IntervalId);
            input.disabled = true;// immidietly block the input box when the timer ends
            btn.disabled = false; // btn is usable to generate new paragraph
            const typedtext = input.value.trim();
            const words = typedtext.split(" ").filter((word) => { return word !== "" }) // create an array from the user input removing all extra sapces



            const original = Displaytext.innerText.trim().split(" ");

            let correctCount = 0;
            for (let i = 0; i < words.length; i++) {
                if (words[i] === original[i]) {
                    correctCount++;
                }
            }
            const accur = Math.round((correctCount / words.length) * 100);

            Accuracy.innerHTML = `${accur} %`
            const wpm = Math.round(words.length / 2.5)
            Speed.innerHTML = `${wpm} wpm`
            input.value = "";
        }
    }, 1000);

}

btn.addEventListener("click", () => {
    showpara();

    input.value = "";  // clear input
    input.disabled = false; // enable input
    Speed.innerHTML = "0 wpm";  // reset speed
    Timer.innerHTML = "2:30";  // reset timer display
    clearInterval(IntervalId); // clear any previous timer
    time = 150;  // reset time
    bool = false; // reset bool to allow timer to start again
})


input.addEventListener("input", () => {
    if (!bool) {
        Timerfunc();
        bool = true
    }
})

// disable the copy paste feature if someone does
input.onpaste = (e) => e.preventDefault();



