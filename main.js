
const tl = gsap.timeline();

gsap.registerPlugin(MotionPathPlugin);
gsap.registerPlugin(ScrollTrigger);

tl.from('.hat', {duration: 1.5, opacity:0.02, scale:1.3, ease:"elastic"});

tl.to(".hat", {
  rotation:360,
  x: -400,
  duration: 5,
  ease: "back"
});

ScrollTrigger.create({
  animation:tl,
  trigger: ".hat",
  start: 20,
  end:"+=320",
  scrub: 1,
  pin: true,
});

const reports = document.getElementsByClassName("reports")[0];
let report;

fetch("http://localhost:3000/whatsanapikey")
  .then(res => res.json())
  .then(data => {
    console.log(data);
    data.forEach(report => {
      let tweetId = report.reported_tweet;
      let tweetedBy = report.tweeted_by;
      let reportedBy = report.reported_by;
      report = `<div class="report-card">
            <div class="card-details">
              <h3><a href="https://twitter.com/${tweetedBy}/status/${tweetId}">The Tweet!</a></h3><br />
              <h3>Tweeted By:   <a href="http://twitter.com/@${tweetedBy}">${tweetedBy}</a></h3><br />
                <h3>Reported By:   <a href="https://twitter.com/@${reportedBy}">${reportedBy}</a></h3>
              </div>
          </div>`
          reports.innerHTML += report;
      console.log(reportedBy);
    });
  });
