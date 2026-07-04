const menuButton = document.getElementById("menu-button");
const navLinks = document.getElementById("nav-links");
const closeMenu = document.getElementById("close-menu");

menuButton.addEventListener("click", () => {
    navLinks.classList.remove("-translate-x-full");
    navLinks.classList.add("translate-x-0");
});

closeMenu.addEventListener("click", () => {
    navLinks.classList.remove("translate-x-0");
    navLinks.classList.add("-translate-x-full");
});

const filterButtons = document.querySelectorAll("#creation-filters button[data-filter]");
const subfilterGroups = document.querySelectorAll("[data-subfilter-group]");
const subfilterButtons = document.querySelectorAll("#creation-subfilters button[data-subfilter]");
const creationSections = document.querySelectorAll(".creation-section");
const creationSubsections = document.querySelectorAll(".creation-subsection");

function setActiveButton(buttons, activeButton) {
    buttons.forEach((button) => {
        button.classList.remove("bg-indigo-600", "text-white");
        button.classList.add("border", "border-slate-700", "text-slate-200");
    });

    if (activeButton) {
        activeButton.classList.remove("border", "border-slate-700", "text-slate-200");
        activeButton.classList.add("bg-indigo-600", "text-white");
    }
}

function showSubfilterGroup(category) {
    subfilterGroups.forEach((group) => {
        const groupCategory = group.dataset.subfilterGroup;
        if (groupCategory === category) {
            group.classList.remove("hidden");
        } else {
            group.classList.add("hidden");
        }
    });
}

function filterSections(category) {
    creationSections.forEach((section) => {
        if (category === "all") {
            section.classList.remove("hidden");
        } else {
            if (section.dataset.section === category) {
                section.classList.remove("hidden");
            } else {
                section.classList.add("hidden");
            }
        }
    });
}

function filterSubsections(subsection) {
    const activeSection = document.querySelector(".creation-section:not(.hidden)");
    if (!activeSection) return;

    if (subsection === "all") {
        creationSubsections.forEach((item) => {
            if (item.closest(".creation-section") === activeSection) {
                item.classList.remove("hidden");
            }
        });
        return;
    }

    creationSubsections.forEach((item) => {
        if (item.closest(".creation-section") === activeSection) {
            if (item.dataset.subsection === subsection) {
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden");
            }
        }
    });
}

function resetSubfilterButtons(group) {
    group.querySelectorAll("button[data-subfilter]").forEach((button) => {
        button.classList.remove("bg-indigo-600", "text-white");
        button.classList.add("border", "border-slate-700", "text-slate-200");
        if (button.dataset.subfilter === "all") {
            button.classList.remove("border", "border-slate-700", "text-slate-200");
            button.classList.add("bg-indigo-600", "text-white");
        }
    });
}

function handleMainFilterClick(filterValue) {
    filterSections(filterValue);

    if (filterValue === "graphic" || filterValue === "textile") {
        showSubfilterGroup(filterValue);
        const visibleGroup = document.querySelector(`[data-subfilter-group="${filterValue}"]`);
        if (visibleGroup) {
            resetSubfilterButtons(visibleGroup);
            filterSubsections("all");
        }
    } else {
        subfilterGroups.forEach((group) => group.classList.add("hidden"));
        creationSubsections.forEach((item) => item.classList.remove("hidden"));
    }
}

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        setActiveButton(filterButtons, button);
        handleMainFilterClick(button.dataset.filter);
    });
});

subfilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const activeGroup = button.closest("[data-subfilter-group]");
        resetSubfilterButtons(activeGroup);
        button.classList.remove("border", "border-slate-700", "text-slate-200");
        button.classList.add("bg-indigo-600", "text-white");
        filterSubsections(button.dataset.subfilter);
    });
});

// Initialize default filter state
const defaultFilter = document.querySelector("#creation-filters button[data-filter='all']");
if (defaultFilter) {
    setActiveButton(filterButtons, defaultFilter);
    handleMainFilterClick("all");
}

// Scroll to Top Button Functionality
// Get the button:
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement. scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// ==================== SMOOTH ANIMATIONS ====================
// Add animation styles dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes slideInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out forwards;
    opacity: 0;
  }

  .animate-fade-in-left {
    animation: fadeInLeft 0.6s ease-out forwards;
    opacity: 0;
  }

  .animate-fade-in-right {
    animation: fadeInRight 0.6s ease-out forwards;
    opacity: 0;
  }

  .animate-scale-in {
    animation: scaleIn 0.5s ease-out forwards;
    opacity: 0;
  }

  .animate-slide-down {
    animation: slideInDown 0.5s ease-out forwards;
    opacity: 0;
  }

  .animation-delay-100 { animation-delay: 0.1s; }
  .animation-delay-200 { animation-delay: 0.2s; }
  .animation-delay-300 { animation-delay: 0.3s; }
  .animation-delay-400 { animation-delay: 0.4s; }
  .animation-delay-500 { animation-delay: 0.5s; }
`;
document.head.appendChild(style);

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Apply animations on page load
document.addEventListener('DOMContentLoaded', function() {
  // Animate sections
  const sections = document.querySelectorAll('section');
  sections.forEach((section, index) => {
    section.classList.add('animate-fade-in-up');
    section.style.animationDelay = (index * 0.15) + 's';
    observer.observe(section);
  });

  // Animate headings
  const headings = document.querySelectorAll('h1, h2, h3');
  headings.forEach((heading, index) => {
    heading.classList.add('animate-fade-in-up');
    heading.style.animationDelay = (index * 0.1) + 's';
    observer.observe(heading);
  });

  // Animate paragraphs
  const paragraphs = document.querySelectorAll('p');
  paragraphs.forEach((para, index) => {
    if (!para.classList.contains('animated')) {
      para.classList.add('animate-fade-in-up');
      para.style.animationDelay = (index * 0.05) + 's';
      observer.observe(para);
    }
  });

  // Animate buttons with stagger
  const buttons = document.querySelectorAll('button');
  buttons.forEach((btn, index) => {
    btn.classList.add('animate-scale-in');
    btn.style.animationDelay = (index * 0.1) + 's';
    observer.observe(btn);
  });

  // Animate image cards with scale effect
  const cards = document.querySelectorAll('.creation-subsection');
  cards.forEach((card, index) => {
    card.classList.add('animate-scale-in');
    card.style.animationDelay = (index * 0.08) + 's';
    observer.observe(card);
  });

  // Animate images
  const images = document.querySelectorAll('img');
  images.forEach((img, index) => {
    img.classList.add('animate-fade-in-up');
    img.style.animationDelay = (index * 0.05) + 's';
    observer.observe(img);
  });

  // Animate nav links
  const navLinks = document.querySelectorAll('nav a, nav button');
  navLinks.forEach((link, index) => {
    link.classList.add('animate-slide-down');
    link.style.animationDelay = (index * 0.08) + 's';
    observer.observe(link);
  });

  // Animate filter buttons
  const filterBtns = document.querySelectorAll('[data-filter], [data-subfilter]');
  filterBtns.forEach((btn, index) => {
    btn.classList.add('animate-fade-in-left');
    btn.style.animationDelay = (index * 0.06) + 's';
    observer.observe(btn);
  });
});



