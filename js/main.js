window.addEventListener("load", function() {
    setTimeout(function() {
        const tekst = document.querySelector(".hero-content");
        tekst.style.opacity = "1";
        tekst.style.transform = "translateY(0)";
    }, 1000); 
});

//meni
const isInPagesFolder = window.location.pathname.includes("/pages/");
const basePath = isInPagesFolder ? "../" : "";

const menuItems = [
  { text: "About", link: basePath + "index.html#aboutus" },
  { text: "Services", link: basePath + "index.html#service" },
  { text: "Questions", link: basePath + "index.html#faq" },
  { text: "Contact", link: basePath + "index.html#contact" },
  { text: "Author", link: basePath + "pages/author.html" },
  { text: "Zip Fajl", link: basePath + "projekat.zip", download: true }
];

$(document).ready(function() {
  const $navContainer = $("#mainNavbar");
  const $ul = $("<ul>").addClass("navbar-nav ms-auto");

  
  menuItems.forEach(item => {
    const $li = $("<li>").addClass("nav-item");
   const $a = $("<a>")
  .addClass("nav-link")
  .addClass(item.link.includes("#") ? "scroll-link" : "") 
  .attr("href", item.link)
  .text(item.text);
    $li.append($a);
    $ul.append($li);
  });

  $navContainer.append($ul);

  const navLinks = $(".nav-link.scroll-link");
  const sections = $("section");

  
  navLinks.click(function(e) {
    const target = $(this).attr("href");
    if (target.startsWith("#")) {
      e.preventDefault();
      $("html, body").animate({
        scrollTop: $(target).offset().top - 70
      }, 800);
    }
  });

  
  $(window).on("scroll", function() {
    let current = "";

    sections.each(function() {
      const sectionTop = $(this).offset().top - 80; 
      const sectionBottom = sectionTop + $(this).outerHeight();

      if ($(window).scrollTop() >= sectionTop && $(window).scrollTop() < sectionBottom) {
        current = $(this).attr("id");
        return false; 
      }
    });

    navLinks.removeClass("active");
  navLinks.each(function() {
    const href = $(this).attr("href").split("#")[1]; 
    if (href === current) {
      $(this).addClass("active");
    }
  });
});

  
  $(window).trigger("scroll");
});
  
  $(document).ready(function () {

  $("#toggleBtn").click(function () {

    $("#moreText").slideToggle(500);

    if ($(this).text().trim() === "Show More") {
      $(this).text("Show Less");
    } else {
      $(this).text("Show More");
    }

  });

});

// ---------- Servis ----------
const myServices = [
  { category: "General", 
    name: "General Repairs", 
    description: "Fix doors, windows, furniture, and small household issues.", 
    features:["Doors","Windows","Furniture"],
     image: "../assets/img/wrench.png" },
  { category: "Electrical", 
    name: "Electrical & Plumbing", 
    description: "Outlet repairs, wiring, pipes, and faucets.",
     features:["Wiring","Pipes","Faucets"], 
     image: "../assets/img/electrical & plumbing.png" },
  { category: "Painting",
     name: "Painting & Carpentry",
      description: "Wall painting and custom woodwork.", 
      features:["Painting","Woodwork","Furniture"], 
      image: "../assets/img/Painting & Carpentry.png" },
  { category: "Security",
     name: "Home Security",
     description: "Protect your home with smart security systems and 24/7 monitoring.", 
     features:["Alarm System", "Video Surveillance", "Smart Access"],
      image: "../assets/img/security.png" },
  { category: "HVAC", 
    name: "HVAC & Heating",
     description: "Maintain optimal temperature and comfort with smart heating and climate control solutions.",
      features:["Heating Systems", "Air Conditioning", "Ventilation"],
       image: "../assets/img/hvac&heating.png" },
  { category: "Smart Home Setup",
     name: "24/7 Technical Support",
      description: "Professional home service assistance available anytime for maintenance, repairs, and emergency support.", 
      features:["Emergency Assistance", "Maintenance Support", "Expert Technicians"], 
      image: "../assets/img/smarthome.png" }
];

const serviceContainer = document.getElementById("service-list");
const loadBtn = document.getElementById("load-more-services");
const categorySelect = document.getElementById("service-category");

let itemsPerLoad = 2;
let currentIndex = 0;
let filteredServices = [...myServices];

[...new Set(myServices.map(s => s.category))].forEach(cat => {
  const option = document.createElement("option");
  option.value = cat;
  option.textContent = cat;
  categorySelect.appendChild(option);
});

function displayServices(reset = false){
  if(reset){
    serviceContainer.innerHTML = "";
    currentIndex = 0;
  }

  const nextItems = filteredServices.slice(currentIndex, currentIndex + itemsPerLoad);
  nextItems.forEach(service => {
    const article = document.createElement("article");
    article.className = "col-12 col-md-6 mb-4 d-flex";
    article.innerHTML = `
  <div class="w-100 d-flex flex-column text-center p-3">

      <img src="${service.image}" 
           alt="${service.name}" 
           class="mx-auto mb-3" 
           style="width:80px">

      <h3>${service.name}</h3>

      <p>${service.description}</p>

      <ul class="text-start">
        ${service.features.map(f => `<li>${f}</li>`).join("")}
      </ul>

      <div class="mt-auto">
        <a href="#contact" class="btn btn-danger">
          <i class="fa-solid fa-circle-right"></i>
          Contact Us
        </a>
      </div>

  </div>
`;
    serviceContainer.appendChild(article);
  });

  currentIndex += itemsPerLoad;
  loadBtn.style.display = currentIndex >= filteredServices.length ? "none" : "inline-block";
}

displayServices();


loadBtn.addEventListener("click", e => {
  e.preventDefault();
  displayServices();
});


categorySelect.addEventListener("change", () => {
  const selected = categorySelect.value;
  filteredServices = selected ? myServices.filter(s => s.category === selected) : [...myServices];
  displayServices(true);
});

const faqData = [
  {
    question: "How quickly can you respond?",
    answer: "We usually respond within 24 hours."
  },
  {
    question: "Do you offer emergency services?",
    answer: "Yes, we offer 24/7 emergency repair services."
  },
  {
    question: "Are your technicians licensed?",
    answer: "All of our technicians are fully licensed and insured."
  }
];

$(document).ready(function() {

  const faqData = [
    {
      question: "How quickly can you respond?",
      answer: "We usually respond within 24 hours."
    },
    {
      question: "Do you offer emergency services?",
      answer: "Yes, we offer 24/7 emergency repair services."
    },
    {
      question: "Are your technicians licensed?",
      answer: "All of our technicians are fully licensed and insured."
    }
  ];

  const faqSection = document.getElementById("faq");

  faqSection.innerHTML = `
    <div class="faq-container">
      <h2>Frequently Asked Questions</h2>
      ${faqData.map(item => `
        <div class="faq-item">
          <div class="faq-question">${item.question}</div>
          <div class="faq-answer">${item.answer}</div>
        </div>
      `).join("")}
    </div>
  `;

  $(".faq-question").click(function() {
    const $parentItem = $(this).closest(".faq-item");

    $(".faq-item").not($parentItem)
      .removeClass("active")
      .find(".faq-answer").slideUp(200);

    $parentItem.toggleClass("active");
    $parentItem.find(".faq-answer").slideToggle(200);
  });

});



 
 $(document).ready(function() {
  function showError(inputId, message) {
    const $input = $("#" + inputId);
    const $errorDiv = $("#error" + inputId);
    $errorDiv.text(message).addClass("active");
    $input.addClass("error-input");
  }

  function clearError(inputId) {
    const $input = $("#" + inputId);
    const $errorDiv = $("#error" + inputId);
    $errorDiv.text("").removeClass("active");
    $input.removeClass("error-input");
  }

  $("#myForm").submit(function(e) {
    e.preventDefault();
    
    ['FirstName','LastName','Email','Phone','Select','Gender'].forEach(clearError);

    let valid = true;

    const firstName = $("#firstName").val().trim();
    const lastName = $("#lastName").val().trim();
    const email = $("#email").val().trim();
    const phone = $("#phone").val().trim();
    const option = $("#optionSelect").val();
    const gender = $("input[name='gender']:checked");

    const namePattern = /^[A-ZČĆŠĐŽ][a-zčćšđž]+$/;
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    const phonePattern = /^[0-9]{6,15}$/;

    if (!firstName) { 
      showError('FirstName','First Name is required'); 
      valid = false; 
    } else if (!namePattern.test(firstName)) { 
      showError('FirstName','Must start with a capital letter and include only letters'); 
      valid = false; 
    }

    if (!lastName) { 
      showError('LastName','Last Name is required'); 
      valid = false; 
    } else if (!namePattern.test(lastName)) { 
      showError('LastName','Must start with a capital letter and include only letters'); 
      valid = false; 
    }

    if (!email) { 
      showError('Email','Email is required'); 
      valid = false; 
    } else if (!emailPattern.test(email)) { 
      showError('Email','Email must be in the format: name@domain.com'); 
      valid = false; 
    }

    if (!phone) { 
      showError('Phone','Phone number is required'); 
      valid = false; 
    } else if (!phonePattern.test(phone)) { 
      showError('Phone','Phone must be 6-15 digits'); 
      valid = false; 
    }

    if (!option) { 
      showError('Select','Please select an option'); 
      valid = false; 
    }

    if (!gender.length) { 
      showError('Gender','Please select gender'); 
      valid = false; 
    }

    if (valid) {
  $(this)[0].reset();
}
  });
});



  const $backToTopBtn = $("#backToTop");
  $(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
      $backToTopBtn.show();
    } else {
      $backToTopBtn.hide();
    }
  });

  $backToTopBtn.click(function() {
    $("html, body").animate({ scrollTop: 0 }, "smooth");
  });
