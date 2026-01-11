const isInPagesFolder = window.location.pathname.includes("/pages/");
const basePath = isInPagesFolder ? "../" : "";

const menuItems = [
  { text: "Home", link: basePath + "index.html" },
  { text: "About", link: basePath + "index.html#aboutus" },
  { text: "Services", link: basePath + "index.html#services" },
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
    const $a = $("<a>").addClass("nav-link").attr("href", item.link).text(item.text);
    $li.append($a);
    $ul.append($li);
  });

  $navContainer.append($ul);

  
  const $aboutSection = $("#aboutus");

if ($aboutSection.length) {  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          $aboutSection.addClass("show"); 
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe($aboutSection[0]); 
}
 

  
  $(".toggle-service").click(function() {
    const targetId = $(this).data("target");
    const $text = $("#" + targetId);

    if ($text.is(":visible")) {
      $text.hide();
      $(this).text("Learn More");
    } else {
      $text.show();
      $(this).text("Learn Less");
    }
  });

  $(".faq-item .faq-question").click(function() {
    const $parentItem = $(this).closest(".faq-item");
    $(".faq-item").not($parentItem).removeClass("active");
    $parentItem.toggleClass("active");
  });

  $("#myForm").submit(function(e) {
    e.preventDefault();
    $(".error").text("");

    const firstName = $("#firstName").val().trim();
    const lastName = $("#lastName").val().trim();
    const email = $("#email").val().trim();
    const phone = $("#phone").val().trim();
    const option = $("#optionSelect").val();
    const gender = $("input[name='gender']:checked");

    let valid = true;
    const namePattern = /^[A-ZČĆŠĐŽ][a-zčćšđž]+$/;

    if (!firstName) {
      $("#errorFirstName").text("First Name is required");
      valid = false;
    } else if (!namePattern.test(firstName)) {
      $("#errorFirstName").text("First Name must start with a capital letter and can include Serbian characters");
      valid = false;
    }

    if (!lastName) {
      $("#errorLastName").text("Last Name is required");
      valid = false;
    } else if (!namePattern.test(lastName)) {
      $("#errorLastName").text("Last Name must start with a capital letter and can include Serbian characters");
      valid = false;
    }

    if (!email) {
      $("#errorEmail").text("Email is required");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      $("#errorEmail").text("Email must be in the format: name@domain.com");
      valid = false;
    }

    if (!phone) {
      $("#errorPhone").text("Phone number is required");
      valid = false;
    } else if (!/^[0-9]{6,15}$/.test(phone)) {
      $("#errorPhone").text("Phone must be 6-15 digits");
      valid = false;
    }

    if (!option) {
      $("#errorSelect").text("Please select an option");
      valid = false;
    }

    if (!gender.length) {
      $("#errorGender").text("Please select gender");
      valid = false;
    }

    if (valid) {
      alert(`Form submitted successfully!\nName: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\nOption: ${option}\nGender: ${gender.val()}`);
    }
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
});
