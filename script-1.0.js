// --- GENERAL
gsap.defaults({
    ease: "circ.out",
    duration: 0.8,
});
  
let easeIn = "circ.in";
let easeInOut = "circ.inOut";
  
let durationS = 0.4;
let durationL = 1.2;
let durationXL = 1.6;
  
const breakpoints = {
    mobile: 479,
    mobileLandscape: 767,
    tablet: 991,
}; 
  
let mm = gsap.matchMedia();
  
gsap.set('[data-visibility]', {visibility: "visible"});
  
function relaodBreakpoints() {
    function getCurrentBreakpoint() {
        const width = window.innerWidth;
        if (width <= breakpoints.mobile) return "mobile";
        if (width <= breakpoints.mobileLandscape) return "mobileLandscape";
        if (width <= breakpoints.tablet) return "tablet";
        return "desktop";
    }
  
    let currentBreakpoint = getCurrentBreakpoint();
  
    function checkAndReload() {
        const newBreakpoint = getCurrentBreakpoint();
        if (newBreakpoint !== currentBreakpoint) {
            currentBreakpoint = newBreakpoint;
            location.reload();
        }
    }
  
    window.addEventListener("resize", checkAndReload);
    window.addEventListener("load", checkAndReload);
}

const specialChars = '!@#$%^&*()_+{}:"<>?[];,./';

function scrambleText(element, originalText, specialChars) {
    const duration = 0.5;
    const scrambleLength = originalText.length;
    
    gsap.to(element, {
        duration: duration,
        ease: "none",
        onUpdate: function() {
            const progress = this.progress();
            let scrambledText = '';
            
            for (let i = 0; i < scrambleLength; i++) {
                if (progress < 0.5) {
                    // Scramble with special characters
                    scrambledText += specialChars[Math.floor(Math.random() * specialChars.length)];
                } else {
                    // Reveal original character
                    scrambledText += originalText[i];
                }
            }
            
            element.textContent = scrambledText;
        },
        onComplete: function() {
            element.textContent = originalText;
        }
    });
}
  
function initScroller() {
    let scrollW = document.querySelector('[page-scroll="wrapper"]')
    if(scrollW === null) {return}
    let scroller = document.querySelector('[page-scroll="indicator"]')
  
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: () => `+=${document.documentElement.scrollHeight - window.innerHeight}`,
            scrub: 1.2,
            markers: false
        }
    });
  
    tl.to(scroller, {
        y: "95vh",
        ease: "none"
    });
}

function initHomeHero() {
  let title = document.querySelector('[data-home-hero="title"]')
  if(title === null) {return}

  let subtitle = document.querySelector('[data-home-hero="subtitle"]')
  let btn = document.querySelector('[data-home-hero="btn"]')
  let visual = document.querySelectorAll('[data-home-hero="visual"]')

  const originalStyle = window.getComputedStyle(title);
  const background = originalStyle.background;
  const backgroundClip = originalStyle.backgroundClip;
  const webkitBackgroundClip = originalStyle.webkitBackgroundClip;
  const webkitTextFillColor = originalStyle.webkitTextFillColor;
  
  let splitedTitle = new SplitType(title, {
    types: "lines",
    tagName: "span",
  });

  let splitedSubtitle = new SplitType(subtitle, {
    types: "lines",
    tagName: "span",
  });

  // Appliquer le style de gradient à chaque ligne
  splitedTitle.lines.forEach(line => {
    line.style.background = background;
    line.style.backgroundClip = backgroundClip;
    line.style.webkitBackgroundClip = webkitBackgroundClip;
    line.style.webkitTextFillColor = webkitTextFillColor;
  });

  let tl = gsap.timeline()

  tl.from(splitedTitle.lines, {opacity: 0.01, stagger: 0.2, ease: "none", duration: durationL}, 0.3);
  tl.from(splitedSubtitle.lines, {opacity: 0.01,  ease: "none", duration: durationL, stagger: 0.2}, ">-0.5");
  tl.from(btn, {opacity: 0.01, yPercent: 100}, "< 0.3")
  tl.from(visual, {opacity: 0.01, ease: "none", duration: durationL}, "< 0.2")
}

function initHomeFeatures() {
    let sections = document.querySelectorAll('.home-features__w')
    if(sections.length === 0) {return}

    sections.forEach((section) => {
      let title = section.querySelector('.h3')
      let subtitle = section.querySelector('.text-large.is--home-features-subtitle')
      let visual = section.querySelector('.home-features__visual')
      
      const originalStyle = window.getComputedStyle(title);
      const background = originalStyle.background;
      const backgroundClip = originalStyle.backgroundClip;
      const webkitBackgroundClip = originalStyle.webkitBackgroundClip;
      const webkitTextFillColor = originalStyle.webkitTextFillColor;
        
      let splitedTitle = new SplitType(title, {
          types: "lines",
          tagName: "span",
      });

      let splitedSubtitle = new SplitType(subtitle, {
          types: "lines",
          tagName: "span",
      });

      // Appliquer le style de gradient à chaque ligne
      splitedTitle.lines.forEach(line => {
          line.style.background = background;
          line.style.backgroundClip = backgroundClip;
          line.style.webkitBackgroundClip = webkitBackgroundClip;
          line.style.webkitTextFillColor = webkitTextFillColor;
      });

      let tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
        }
        })

        mm.add("(min-width: 480px)", () => {
            tl.from(splitedTitle.lines, {opacity: 0.01, stagger: 0.2, ease: "none", duration: durationL}, 0.3);
            tl.from(splitedSubtitle.lines, {opacity: 0.01,  ease: "none", duration: durationL, stagger: 0.2}, ">-0.5");
            tl.from(visual, {opacity: 0.01, ease: "none", duration: durationL}, "< 0.2")
        })
        
    })
}

function initHomeHeroSVG() {
    let wrapper = document.querySelector('#home-hero-svg')
    if(wrapper === null) {return}
    
    fetch(wrapper.data)
        .then(response => response.text())
        .then(svgText => {
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
            const svgElement = svgDoc.querySelector('svg');
            svgElement.id = 'home-hero-svg';
            wrapper.replaceWith(svgElement);
            svgElement.style.width='100%';
            svgElement.style.height='100%';

            let btn = document.querySelector('.home-hero__visual-btn')
            
            setTimeout(() => {
                let networkLogo = svgElement.querySelector('[filter="url(#filter3_i_2916_19867)"]');
                let networkLogoMask = svgElement.querySelector('[mask="url(#mask0_2916_19867)"]')
                let networkLogoLine = svgElement.querySelector('[d="M673 193C673 195.916 675.363 198.28 678.277 198.28C681.192 198.28 683.555 195.916 683.555 193C683.555 190.084 681.192 187.72 678.277 187.72C675.363 187.72 673 190.084 673 193Z"]');
                let terminalLogo = {
                    fill: svgElement.querySelector('[fill="url(#paint4_radial_2916_19867)"]'),
                    stroke: svgElement.querySelector('[stroke="#181818"]'),
                    stroke2: svgElement.querySelector('[stroke="url(#paint5_radial_2916_19867)"]'),
                    fill2: svgElement.querySelector('[fill="black"]'),
                    filter: svgElement.querySelector('[filter="url(#filter0_dddddiiiiii_2916_19867)"]'),
                    fill3: svgElement.querySelector('[fill="#0F0F0F"]'),
                    fill4: svgElement.querySelector('[fill="#2E74FF"]'),
                    fill5: svgElement.querySelector('[fill="url(#paint6_radial_2779_27401)"]'),
                    stroke3: svgElement.querySelector('[stroke="url(#paint7_linear_2779_27401)"]'),
                    stroke4: svgElement.querySelector('[stroke="url(#paint8_linear_2779_27401)"]'),
                    fill6: svgElement.querySelector('[fill="url(#paint9_linear_2779_27401)"]'),
                    fill7: svgElement.querySelector('[fill="url(#paint10_linear_2779_27401)"]'),
                    filter2: svgElement.querySelector('[filter="url(#filter1_f_2916_19867)"]'),
                    filter3: svgElement.querySelector('[filter="url(#filter2_f_2916_19867)"]'),
                }

                let brands = {
                    fill: svgElement.querySelectorAll('[fill="#C6C6C6"]'),
                    fill2: svgElement.querySelectorAll('[fill="#2E74FF"]'),
                }

                let aria = svgElement.querySelector('[fill="url(#paint19_radial_2916_19867)"]')
                let ariaText = svgElement.querySelector('[d="M386.141 322.617C385.601 322.617 385.131 322.514 384.731 322.307C384.331 322.1 384.021 321.804 383.801 321.417C383.581 321.03 383.471 320.56 383.471 320.007H384.521C384.521 320.554 384.665 320.977 384.951 321.277C385.238 321.57 385.631 321.717 386.131 321.717C386.558 321.717 386.901 321.62 387.161 321.427C387.421 321.227 387.551 320.95 387.551 320.597C387.551 320.357 387.478 320.164 387.331 320.017C387.191 319.87 387.001 319.75 386.761 319.657C386.528 319.564 386.271 319.48 385.991 319.407C385.711 319.334 385.428 319.254 385.141 319.167C384.861 319.074 384.601 318.957 384.361 318.817C384.128 318.677 383.938 318.49 383.791 318.257C383.651 318.024 383.581 317.727 383.581 317.367C383.581 316.987 383.681 316.65 383.881 316.357C384.088 316.057 384.371 315.824 384.731 315.657C385.098 315.484 385.528 315.397 386.021 315.397C386.501 315.397 386.931 315.487 387.311 315.667C387.691 315.84 387.995 316.09 388.221 316.417C388.455 316.737 388.575 317.124 388.581 317.577H387.521C387.515 317.31 387.441 317.084 387.301 316.897C387.168 316.704 386.988 316.557 386.761 316.457C386.541 316.35 386.295 316.297 386.021 316.297C385.628 316.297 385.308 316.39 385.061 316.577C384.815 316.764 384.691 317.017 384.691 317.337C384.691 317.564 384.761 317.744 384.901 317.877C385.048 318.01 385.238 318.12 385.471 318.207C385.711 318.287 385.971 318.364 386.251 318.437C386.538 318.504 386.821 318.584 387.101 318.677C387.381 318.764 387.638 318.884 387.871 319.037C388.111 319.184 388.301 319.384 388.441 319.637C388.588 319.884 388.661 320.2 388.661 320.587C388.661 321 388.551 321.36 388.331 321.667C388.111 321.967 387.811 322.2 387.431 322.367C387.051 322.534 386.621 322.617 386.141 322.617ZM392.355 322.617C391.762 322.617 391.245 322.47 390.805 322.177C390.365 321.877 390.022 321.457 389.775 320.917C389.535 320.377 389.415 319.74 389.415 319.007C389.415 318.267 389.535 317.627 389.775 317.087C390.022 316.547 390.365 316.13 390.805 315.837C391.245 315.544 391.762 315.397 392.355 315.397C392.949 315.397 393.465 315.544 393.905 315.837C394.345 316.13 394.685 316.547 394.925 317.087C395.172 317.627 395.295 318.267 395.295 319.007C395.295 319.74 395.172 320.377 394.925 320.917C394.685 321.457 394.345 321.877 393.905 322.177C393.465 322.47 392.949 322.617 392.355 322.617ZM392.355 321.717C392.722 321.717 393.042 321.607 393.315 321.387C393.589 321.167 393.802 320.854 393.955 320.447C394.109 320.04 394.185 319.56 394.185 319.007C394.185 318.447 394.109 317.967 393.955 317.567C393.802 317.16 393.589 316.847 393.315 316.627C393.042 316.407 392.722 316.297 392.355 316.297C391.995 316.297 391.675 316.407 391.395 316.627C391.122 316.847 390.909 317.16 390.755 317.567C390.602 317.974 390.525 318.454 390.525 319.007C390.525 319.56 390.602 320.04 390.755 320.447C390.909 320.854 391.122 321.167 391.395 321.387C391.675 321.607 391.995 321.717 392.355 321.717ZM398.659 322.617C398.066 322.617 397.549 322.47 397.109 322.177C396.669 321.877 396.326 321.457 396.079 320.917C395.839 320.377 395.719 319.74 395.719 319.007C395.719 318.267 395.839 317.627 396.079 317.087C396.326 316.547 396.669 316.13 397.109 315.837C397.549 315.544 398.066 315.397 398.659 315.397C399.253 315.397 399.769 315.544 400.209 315.837C400.649 316.13 400.989 316.547 401.229 317.087C401.476 317.627 401.599 318.267 401.599 319.007C401.599 319.74 401.476 320.377 401.229 320.917C400.989 321.457 400.649 321.877 400.209 322.177C399.769 322.47 399.253 322.617 398.659 322.617ZM398.659 321.717C399.026 321.717 399.346 321.607 399.619 321.387C399.893 321.167 400.106 320.854 400.259 320.447C400.413 320.04 400.489 319.56 400.489 319.007C400.489 318.447 400.413 317.967 400.259 317.567C400.106 317.16 399.893 316.847 399.619 316.627C399.346 316.407 399.026 316.297 398.659 316.297C398.299 316.297 397.979 316.407 397.699 316.627C397.426 316.847 397.213 317.16 397.059 317.567C396.906 317.974 396.829 318.454 396.829 319.007C396.829 319.56 396.906 320.04 397.059 320.447C397.213 320.854 397.426 321.167 397.699 321.387C397.979 321.607 398.299 321.717 398.659 321.717ZM402.373 322.497V315.517H403.693L406.603 321.117L406.523 318.957V315.517H407.543V322.497H406.233L403.303 316.957L403.393 319.047V322.497H402.373Z"]')

                let nautilus = svgElement.querySelector('[fill="url(#paint22_radial_2916_19867)"]')
                let nautilusText= svgElement.querySelector('[d="M1085.14 322.617C1084.6 322.617 1084.13 322.514 1083.73 322.307C1083.33 322.1 1083.02 321.804 1082.8 321.417C1082.58 321.03 1082.47 320.56 1082.47 320.007H1083.52C1083.52 320.554 1083.67 320.977 1083.95 321.277C1084.24 321.57 1084.63 321.717 1085.13 321.717C1085.56 321.717 1085.9 321.62 1086.16 321.427C1086.42 321.227 1086.55 320.95 1086.55 320.597C1086.55 320.357 1086.48 320.164 1086.33 320.017C1086.19 319.87 1086 319.75 1085.76 319.657C1085.53 319.564 1085.27 319.48 1084.99 319.407C1084.71 319.334 1084.43 319.254 1084.14 319.167C1083.86 319.074 1083.6 318.957 1083.36 318.817C1083.13 318.677 1082.94 318.49 1082.79 318.257C1082.65 318.024 1082.58 317.727 1082.58 317.367C1082.58 316.987 1082.68 316.65 1082.88 316.357C1083.09 316.057 1083.37 315.824 1083.73 315.657C1084.1 315.484 1084.53 315.397 1085.02 315.397C1085.5 315.397 1085.93 315.487 1086.31 315.667C1086.69 315.84 1087 316.09 1087.22 316.417C1087.46 316.737 1087.58 317.124 1087.58 317.577H1086.52C1086.52 317.31 1086.44 317.084 1086.3 316.897C1086.17 316.704 1085.99 316.557 1085.76 316.457C1085.54 316.35 1085.3 316.297 1085.02 316.297C1084.63 316.297 1084.31 316.39 1084.06 316.577C1083.82 316.764 1083.69 317.017 1083.69 317.337C1083.69 317.564 1083.76 317.744 1083.9 317.877C1084.05 318.01 1084.24 318.12 1084.47 318.207C1084.71 318.287 1084.97 318.364 1085.25 318.437C1085.54 318.504 1085.82 318.584 1086.1 318.677C1086.38 318.764 1086.64 318.884 1086.87 319.037C1087.11 319.184 1087.3 319.384 1087.44 319.637C1087.59 319.884 1087.66 320.2 1087.66 320.587C1087.66 321 1087.55 321.36 1087.33 321.667C1087.11 321.967 1086.81 322.2 1086.43 322.367C1086.05 322.534 1085.62 322.617 1085.14 322.617ZM1091.36 322.617C1090.76 322.617 1090.25 322.47 1089.81 322.177C1089.37 321.877 1089.02 321.457 1088.78 320.917C1088.54 320.377 1088.42 319.74 1088.42 319.007C1088.42 318.267 1088.54 317.627 1088.78 317.087C1089.02 316.547 1089.37 316.13 1089.81 315.837C1090.25 315.544 1090.76 315.397 1091.36 315.397C1091.95 315.397 1092.47 315.544 1092.91 315.837C1093.35 316.13 1093.69 316.547 1093.93 317.087C1094.17 317.627 1094.3 318.267 1094.3 319.007C1094.3 319.74 1094.17 320.377 1093.93 320.917C1093.69 321.457 1093.35 321.877 1092.91 322.177C1092.47 322.47 1091.95 322.617 1091.36 322.617ZM1091.36 321.717C1091.72 321.717 1092.04 321.607 1092.32 321.387C1092.59 321.167 1092.8 320.854 1092.96 320.447C1093.11 320.04 1093.19 319.56 1093.19 319.007C1093.19 318.447 1093.11 317.967 1092.96 317.567C1092.8 317.16 1092.59 316.847 1092.32 316.627C1092.04 316.407 1091.72 316.297 1091.36 316.297C1091 316.297 1090.68 316.407 1090.4 316.627C1090.12 316.847 1089.91 317.16 1089.76 317.567C1089.6 317.974 1089.53 318.454 1089.53 319.007C1089.53 319.56 1089.6 320.04 1089.76 320.447C1089.91 320.854 1090.12 321.167 1090.4 321.387C1090.68 321.607 1091 321.717 1091.36 321.717ZM1097.66 322.617C1097.07 322.617 1096.55 322.47 1096.11 322.177C1095.67 321.877 1095.33 321.457 1095.08 320.917C1094.84 320.377 1094.72 319.74 1094.72 319.007C1094.72 318.267 1094.84 317.627 1095.08 317.087C1095.33 316.547 1095.67 316.13 1096.11 315.837C1096.55 315.544 1097.07 315.397 1097.66 315.397C1098.26 315.397 1098.77 315.544 1099.21 315.837C1099.65 316.13 1099.99 316.547 1100.23 317.087C1100.48 317.627 1100.6 318.267 1100.6 319.007C1100.6 319.74 1100.48 320.377 1100.23 320.917C1099.99 321.457 1099.65 321.877 1099.21 322.177C1098.77 322.47 1098.26 322.617 1097.66 322.617ZM1097.66 321.717C1098.03 321.717 1098.35 321.607 1098.62 321.387C1098.9 321.167 1099.11 320.854 1099.26 320.447C1099.42 320.04 1099.49 319.56 1099.49 319.007C1099.49 318.447 1099.42 317.967 1099.26 317.567C1099.11 317.16 1098.9 316.847 1098.62 316.627C1098.35 316.407 1098.03 316.297 1097.66 316.297C1097.3 316.297 1096.98 316.407 1096.7 316.627C1096.43 316.847 1096.22 317.16 1096.06 317.567C1095.91 317.974 1095.83 318.454 1095.83 319.007C1095.83 319.56 1095.91 320.04 1096.06 320.447C1096.22 320.854 1096.43 321.167 1096.7 321.387C1096.98 321.607 1097.3 321.717 1097.66 321.717ZM1101.38 322.497V315.517H1102.7L1105.61 321.117L1105.53 318.957V315.517H1106.55V322.497H1105.24L1102.31 316.957L1102.4 319.047V322.497H1101.38Z"]')

                networkLogoLine.setAttribute('d', 'M673 193C673 195.916 675.363 198.28 678.277 198.28C681.192 198.28 683.555 195.916 683.555 193C683.555 190.084 681.192 187.72 678.277 187.72C675.363 187.72 673 190.084 673 194Z')
                

                // Créer un tableau avec tous les éléments de terminalLogo
                const terminalElements = Object.values(terminalLogo).filter(el => el !== null);
                const brandsElements = Object.values(brands).filter(el => el !== null);
                
                let followingPath1 = document.querySelector('[stroke="url(#paint3_linear_2916_19867)"]');
                followingPath1.setAttribute('d', 'M607 181H579C577.741 181 576.555 181.593 575.8 182.6L556.8 207.933C556.281 208.626 556 209.468 556 210.333V238.284C556 239.077 556.236 239.852 556.677 240.51L623.812 340.726C624.554 341.835 625.801 342.5 627.135 342.5H668.812C669.891 342.5 670.925 342.936 671.678 343.71L687.866 360.335C688.593 361.082 689 362.083 689 363.126V401.5');
                let pathLength = followingPath1.getTotalLength();

                let followingPath2 = document.querySelector('[stroke="url(#paint2_linear_2916_19867)"]');
                followingPath2.setAttribute('d', 'M993 241.5H919.64C918.303 241.5 917.054 242.168 916.312 243.281L873.172 307.992C872.733 308.649 872.5 309.421 872.5 310.211V427.963C872.5 428.952 872.133 429.907 871.47 430.642L846.191 458.679C845.433 459.52 844.353 460 843.22 460H789.5');
                let pathLength2 = followingPath2.getTotalLength();

                let followingPath3 = document.querySelector('[stroke="url(#paint1_linear_2916_19867)"]');
                followingPath3.setAttribute('d', 'M1078 291V344.976C1078 346.248 1078.61 347.445 1079.63 348.199L1118.44 376.723C1119.13 377.228 1119.96 377.5 1120.81 377.5H1173.97C1174.95 377.5 1175.91 377.136 1176.64 376.478L1208.17 348.192C1209.02 347.433 1209.5 346.351 1209.5 345.215V160.174C1209.5 159.103 1209.07 158.077 1208.31 157.325L1176.67 126.151C1175.92 125.413 1174.91 125 1173.86 125H831.5');
                let pathLength3 = followingPath3.getTotalLength();

                let followingPath4 = document.querySelector('[stroke="url(#paint0_linear_2916_19867)"]');
                followingPath4.setAttribute('d', 'M362 291V344.976C362 346.248 361.394 347.445 360.369 348.199L321.557 376.723C320.87 377.228 320.04 377.5 319.188 377.5H266.031C265.045 377.5 264.094 377.136 263.36 376.478L231.829 348.192C230.983 347.433 230.5 346.351 230.5 345.215V160.174C230.5 159.103 230.93 158.077 231.693 157.325L263.332 126.151C264.08 125.413 265.089 125 266.14 125H608.5');
                let pathLength4 = followingPath3.getTotalLength();

                gsap.set(followingPath1, {strokeDasharray: `0 ${pathLength}`,strokeDashoffset: 0});
                gsap.set(followingPath2, {strokeDasharray: `0 ${pathLength2}`,strokeDashoffset: -pathLength2});
                gsap.set(followingPath3, {strokeDasharray: `0 ${pathLength3}`,strokeDashoffset: -pathLength3});
                gsap.set(followingPath4, {strokeDasharray: `0 ${pathLength3}`,strokeDashoffset: -pathLength4});

                
                let tl = gsap.timeline()
                let dashTl = gsap.timeline({repeat: -1})

                tl.from(networkLogo, { opacity: 0, duration: durationL, ease: "none"}, 2.5)
                tl.from(networkLogoMask, { opacity: 0, transformOrigin: "50% 50%", duration: durationL, ease: "none"}, "<1")
                tl.to(networkLogoMask, { opacity: 0, duration: durationL, ease: "none"}, ">1")
                tl.from(terminalElements, { opacity: 0, duration: durationL, ease: "none"}, 6.6) 
                //gsap.set([terminalElements[7], terminalElements[8]], { opacity: 0})
                tl.to([terminalElements[7], terminalElements[8]], { opacity: 0.5} )
                gsap.set(brandsElements, { filter: 'grayscale(100%)', duration: durationL, ease: "none"}, 8) 
                
                dashTl.to(followingPath1, { strokeDasharray: `40 ${pathLength}`, willChange: 'transform', force3D: true}, 4.5)
                dashTl.to(followingPath1, { strokeDashoffset: -pathLength, duration: 2, ease: "none", willChange: 'transform', force3D: true}, "<0.2")
                dashTl.to(followingPath2, { strokeDasharray: `40 ${pathLength2}`, willChange: 'transform', force3D: true}, 7.8)
                dashTl.to(networkLogoMask, { opacity: 1, duration: durationL, ease: "none", repeat: -1, yoyo: true, repeatDelay: 1}, "<")
                dashTl.to(followingPath2, { strokeDashoffset: 40, duration: 2, ease: "none", willChange: 'transform', force3D: true}, "<")
                dashTl.to(followingPath3, { strokeDasharray: `40 ${pathLength3}`, willChange: 'transform', force3D: true}, "<")
                dashTl.to(followingPath3, { strokeDashoffset: 40, duration: 2.5, ease: "none", willChange: 'transform', force3D: true}, "<")
                dashTl.to(followingPath4, { strokeDasharray: `40 ${pathLength4}`, willChange: 'transform', force3D: true}, "<")
                dashTl.to(followingPath4, { strokeDashoffset: 40, duration: 2.5, ease: "none", willChange: 'transform', force3D: true}, "<")

                aria.addEventListener('mouseenter', () => {
                    gsap.to(ariaText, { filter: 'grayscale(0%)'})
                    gsap.to(aria, { opacity: 1})
                })

                aria.addEventListener('mouseleave', () => {
                    gsap.to(ariaText, { filter: 'grayscale(100%)'})
                    gsap.to(aria, { opacity: 0})
                })

                nautilus.addEventListener('mouseenter', () => {
                    gsap.to(nautilusText, { filter: 'grayscale(0%)'})
                    gsap.to(nautilus, { opacity: 1})
                })

                nautilus.addEventListener('mouseleave', () => {
                    gsap.to(nautilusText, { filter: 'grayscale(100%)'})
                    gsap.to(nautilus, { opacity: 0})
                })


                networkLogo.addEventListener('mouseenter', () => {
                  gsap.to(networkLogoMask, { opacity: 1})
                })

                networkLogo.addEventListener('mouseenter', () => {
                  gsap.to(networkLogoMask, { opacity: 0})
                })

                let isTerminalHovering = false;
                let isTimelineActive = true;
                
                // Écoutez la fin de votre timeline
                tl.eventCallback("onComplete", () => {
                    isTimelineActive = false;
                });
                
                terminalElements[7].style.cursor = 'pointer';
                terminalElements[8].style.cursor = 'pointer';
                
                function handleHoverEffect() {
                    if (!isTimelineActive) {
                        gsap.to([terminalElements[7], terminalElements[8]], { opacity: 1 });
                    }
                }
                
                function handleLeaveEffect() {
                    if (!isTimelineActive) {
                        gsap.to([terminalElements[7], terminalElements[8]], { opacity: 0.5 });
                    }
                }
                
                function handleScrambleText() {
                    let textElement = btn.querySelector('.text-xsmall');
                    let originalText = textElement.textContent;
                    scrambleText(textElement, originalText, specialChars);
                }
                
                // Événements pour terminalElements[7]
                terminalElements[7].addEventListener('mouseenter', () => {
                    isTerminalHovering = true;
                    handleHoverEffect();
                    btn.dispatchEvent(new Event('mouseenter'));
                });
                
                terminalElements[7].addEventListener('mouseleave', () => {
                    isTerminalHovering = false;
                    handleLeaveEffect();
                    btn.dispatchEvent(new Event('mouseleave'));
                });
                
                // Événements pour terminalElements[8]
                terminalElements[8].addEventListener('mouseenter', () => {
                    isTerminalHovering = true;
                    handleHoverEffect();
                    btn.dispatchEvent(new Event('mouseenter'));
                });
                
                terminalElements[8].addEventListener('mouseleave', () => {
                    isTerminalHovering = false;
                    handleLeaveEffect();
                    btn.dispatchEvent(new Event('mouseleave'));
                });
                
                // Événements pour le bouton
                btn.addEventListener('mouseenter', () => {
                    handleHoverEffect();
                    handleScrambleText();
                });
                
                btn.addEventListener('mouseleave', () => {
                    handleLeaveEffect();
                });

                terminalElements[7].addEventListener('click', () => {
                    btn.click()
                })

                terminalElements[8].addEventListener('click', () => {
                    btn.click()
                })


            }, 50);
        })
        .catch(error => console.error("Erreur lors du chargement du SVG:", error))
}

function initHomeHeroSVGMobile() {
    let wrapper = document.querySelector('#home-hero-svg-mobile')
    if(wrapper === null) {return}
    
    fetch(wrapper.data)
        .then(response => response.text())
        .then(svgText => {
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
            const svgElement = svgDoc.querySelector('svg');
            svgElement.id = 'home-hero-svg-mobile';
            wrapper.replaceWith(svgElement);
            svgElement.style.width='100%';
            svgElement.style.height='100%';

            let btn = document.querySelector('.home-hero__visual-btn')
            
            
            setTimeout(() => {
                let networkLogo = svgElement.querySelector('[filter="url(#filter3_i_2900_24211)"]');
                let terminalLogo = {
                    fill: svgElement.querySelector('[fill="url(#paint2_radial_2900_24211)"]'),
                    stroke: svgElement.querySelector('[stroke="#181818"]'),
                    stroke2: svgElement.querySelector('[stroke="url(#paint3_radial_2900_24211)"]'),
                    fill2: svgElement.querySelector('[fill="black"]'),
                    filter: svgElement.querySelector('[filter="url(#filter0_dddddiiiiii_2900_24211)"]'),
                    fill3: svgElement.querySelector('[fill="#0F0F0F"]'),
                    fill4: svgElement.querySelector('[fill="#2E74FF"]'),
                    fill5: svgElement.querySelector('[fill="url(#paint4_radial_2900_24211)"]'),
                    stroke3: svgElement.querySelector('[stroke="url(#paint5_linear_2900_24211)"]'),
                    stroke4: svgElement.querySelector('[stroke="url(#paint6_linear_2900_24211)"]'),
                    fill6: svgElement.querySelector('[fill="url(#paint7_linear_2900_24211)"]'),
                    fill7: svgElement.querySelector('[fill="url(#paint8_linear_2900_24211)"]'),
                    filter2: svgElement.querySelector('[filter="url(#filter1_f_2900_24211)"]'),
                    filter3: svgElement.querySelector('[filter="url(#filter2_f_2900_24211)"]'),
                }

                let brands = {
                    fill: svgElement.querySelectorAll('[fill="#C6C6C6"]'),
                    fill2: svgElement.querySelectorAll('[fill="#2E74FF"]'),
                }

                let terminalBtn = document.querySelector('[fill="url(#paint2_radial_2900_24211)"]')
                // Créer un tableau avec tous les éléments de terminalLogo
                const terminalElements = Object.values(terminalLogo).filter(el => el !== null);
                const brandsElements = Object.values(brands).filter(el => el !== null);

                gsap.set(terminalElements, { yPercent: 2, scale: 0.9, transformOrigin: "50% 50%"})
                
                let followingPath1 = document.querySelector('[stroke="url(#paint1_linear_2900_24211)"]');
                followingPath1.setAttribute('d', 'M139.347 421.929H127.292C126.75 421.929 126.239 422.184 125.914 422.618L117.734 433.525C117.51 433.824 117.389 434.186 117.389 434.559V446.593C117.389 446.934 117.491 447.268 117.681 447.552L146.586 490.7C146.906 491.177 147.442 491.464 148.017 491.464H165.961C166.426 491.464 166.871 491.652 167.195 491.985L174.165 499.143C174.478 499.464 174.653 499.895 174.653 500.344V516.866');
                let pathLength = followingPath1.getTotalLength();

                let followingPath2 = document.querySelector('[stroke="url(#paint0_linear_2900_24211)"]');
                followingPath2.setAttribute('d', 'M305.542 447.978H273.957C273.381 447.978 272.844 448.266 272.524 448.745L253.95 476.607C253.761 476.889 253.661 477.222 253.661 477.562V528.261C253.661 528.687 253.503 529.097 253.217 529.414L242.333 541.485C242.007 541.847 241.542 542.054 241.054 542.054H217.925');
                let pathLength2 = followingPath2.getTotalLength();

                /*let followingPath3 = document.querySelector('[stroke="url(#paint1_linear_2779_27401)"]');
                followingPath3.setAttribute('d', 'M1078 291V344.976C1078 346.248 1078.61 347.445 1079.63 348.199L1118.44 376.723C1119.13 377.228 1119.96 377.5 1120.81 377.5H1173.97C1174.95 377.5 1175.91 377.136 1176.64 376.478L1208.17 348.192C1209.02 347.433 1209.5 346.351 1209.5 345.215V160.174C1209.5 159.103 1209.07 158.077 1208.31 157.325L1176.67 126.151C1175.92 125.413 1174.91 125 1173.86 125H831.5');
                let pathLength3 = followingPath3.getTotalLength();

                let followingPath4 = document.querySelector('[stroke="url(#paint0_linear_2779_27401)"]');
                followingPath4.setAttribute('d', 'M362 291V344.976C362 346.248 361.394 347.445 360.369 348.199L321.557 376.723C320.87 377.228 320.04 377.5 319.188 377.5H266.031C265.045 377.5 264.094 377.136 263.36 376.478L231.829 348.192C230.983 347.433 230.5 346.351 230.5 345.215V160.174C230.5 159.103 230.93 158.077 231.693 157.325L263.332 126.151C264.08 125.413 265.089 125 266.14 125H608.5');
                let pathLength4 = followingPath3.getTotalLength();*/

                gsap.set(followingPath1, {strokeDasharray: `0 ${pathLength}`,strokeDashoffset: 0});
                gsap.set(followingPath2, {strokeDasharray: `0 ${pathLength2}`,strokeDashoffset: -pathLength2});
                /*gsap.set(followingPath3, {strokeDasharray: `0 ${pathLength3}`,strokeDashoffset: -pathLength3});
                gsap.set(followingPath4, {strokeDasharray: `0 ${pathLength3}`,strokeDashoffset: -pathLength4});*/

              
                let tl = gsap.timeline()
                let dashTl = gsap.timeline({repeat: -1})

                tl.from(networkLogo, { opacity: 0, duration: durationL, ease: "none"}, 2.5)
                tl.from(terminalElements, { opacity: 0, duration: durationL, ease: "none"}, 6.6) 
                tl.from(brandsElements, { filter: 'grayscale(100%)', duration: durationL, ease: "none"}, 8) 

                dashTl.to(followingPath1, { strokeDasharray: `40 ${pathLength}`, willChange: 'transform', force3D: true}, 4.5)
                dashTl.to(followingPath1, { strokeDashoffset: -pathLength, duration: 2, ease: "none", willChange: 'transform', force3D: true}, "<0.2")
                dashTl.to(followingPath2, { strokeDasharray: `40 ${pathLength2}`, willChange: 'transform', force3D: true}, 7.8)
                dashTl.to(followingPath2, { strokeDashoffset: 40, duration: 2, ease: "none", willChange: 'transform', force3D: true}, "<")
                /*dashTl.to(followingPath3, { strokeDasharray: `40 ${pathLength3}`, willChange: 'transform', force3D: true}, "<")
                dashTl.to(followingPath3, { strokeDashoffset: 40, duration: 2.5, ease: "none", willChange: 'transform', force3D: true}, "<")
                dashTl.to(followingPath4, { strokeDasharray: `40 ${pathLength4}`, willChange: 'transform', force3D: true}, "<")
                dashTl.to(followingPath4, { strokeDashoffset: 40, duration: 2.5, ease: "none", willChange: 'transform', force3D: true}, "<")*/

                terminalBtn.addEventListener('click', () => {btn.click()})
            }, 50);
        })
        .catch(error => console.error("Erreur lors du chargement du SVG:", error))

    
}

function initHomeFeaturesSVG1() {
    let wrapper = document.querySelector('#home-features-svg-1')
    if(wrapper === null) {return}
    
    fetch(wrapper.data)
        .then(response => response.text())
        .then(svgText => {
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
            const svgElement = svgDoc.querySelector('svg');
            svgElement.id = 'home-features-svg-1';
            wrapper.replaceWith(svgElement);

            mm.add("(max-width: 479px)", () => {
                gsap.set(svgElement, {rotateZ: "-90deg", yPercent: 50});  
            })
            
            setTimeout(() => {
                //let networkLogo = svgElement.querySelector('[filter="url(#filter3_i_2779_27401)"]');
                let networkLogo = {
                    clipPath: svgElement.querySelector('[clip-path="url(#clip0_2858_26399)"]'),
                }
                let networkLogoMask = svgElement.querySelector('[mask="url(#mask0_2858_26399)"]')

                // Créer un tableau avec tous les éléments de terminalLogo
                const networkElements = Object.values(networkLogo).filter(el => el !== null);

                mm.add("(max-width: 479px)", () => {
                    gsap.set(networkElements, {rotateZ: "90deg", xPercent: 102.5, scale: 1});  
                })
                
                let followingPath1 = document.querySelector('[stroke="url(#paint0_linear_2858_26399)"]');
                followingPath1.setAttribute('d', 'M643.301 238.61H586.012C584.274 238.61 582.622 237.857 581.482 236.545L559.499 211.243C558.55 210.152 558.028 208.754 558.028 207.308V167.723C558.028 166.424 557.607 165.161 556.828 164.123L539.82 141.445C538.686 139.934 536.908 139.045 535.02 139.045H389');
                let pathLength1 = followingPath1.getTotalLength();

                let followingPath2 = document.querySelector('[stroke="url(#paint1_linear_2858_26399)"]');
                followingPath2.setAttribute('d', 'M796.222 238.61H853.512C855.25 238.61 856.902 237.857 858.041 236.545L880.025 211.243C880.974 210.152 881.496 208.754 881.496 207.308V167.723C881.496 166.424 881.917 165.161 882.696 164.123L899.704 141.445C900.838 139.934 902.616 139.045 904.504 139.045H1050');
                let pathLength2 = followingPath2.getTotalLength();

                let followingPath3 = document.querySelector('[stroke="url(#paint2_linear_2858_26399)"]');
                followingPath3.setAttribute('d', 'M643.301 284.819H586.012C584.274 284.819 582.622 285.573 581.482 286.884L559.499 312.186C558.55 313.278 558.028 314.676 558.028 316.122V355.707C558.028 357.005 557.607 358.268 556.828 359.307L539.82 381.985C538.686 383.496 536.908 384.385 535.02 384.385H391');
                let pathLength3 = followingPath3.getTotalLength();

                let followingPath4 = document.querySelector('[stroke="url(#paint3_linear_2858_26399)"]');
                followingPath4.setAttribute('d', 'M796.222 284.819H853.512C855.25 284.819 856.902 285.573 858.041 286.884L880.025 312.186C880.974 313.278 881.496 314.676 881.496 316.122V355.707C881.496 357.005 881.917 358.268 882.696 359.307L899.704 381.985C900.838 383.496 902.616 384.385 904.504 384.385H1050.5');
                let pathLength4 = followingPath3.getTotalLength();

                let followingPath5 = document.querySelector('[stroke="url(#paint4_linear_2858_26399)"]');
                followingPath5.setAttribute('d', 'M644 261L285 261');
                let pathLength5 = followingPath3.getTotalLength();

                let followingPath6 = document.querySelector('[stroke="url(#paint5_linear_2858_26399)"]');
                followingPath6.setAttribute('d', 'M795 261L1154 261');
                let pathLength6 = followingPath3.getTotalLength();

                gsap.set(followingPath1, {strokeDasharray: `0 ${pathLength1}`,strokeDashoffset: -pathLength1});
                gsap.set(followingPath2, {strokeDasharray: `0 ${pathLength2}`,strokeDashoffset: -pathLength2});
                gsap.set(followingPath3, {strokeDasharray: `0 ${pathLength3}`,strokeDashoffset: -pathLength3});
                gsap.set(followingPath4, {strokeDasharray: `0 ${pathLength3}`,strokeDashoffset: -pathLength4});
                gsap.set(followingPath5, {strokeDasharray: `0 ${pathLength3}`,strokeDashoffset: -pathLength5});
                gsap.set(followingPath6, {strokeDasharray: `0 ${pathLength3}`,strokeDashoffset: -pathLength6});
                
                let tl = gsap.timeline({paused: true})
                let dashTl = gsap.timeline({paused: true, repeat: -1, repeatDelay: 0.5})

                tl.from(networkElements, { filter: "grayscale(100%)", opacity: 0.5, duration: durationL, ease: "none"}, 2)
                tl.from(networkLogoMask, { opacity: 0, transformOrigin: "50% 50%", duration: durationL, ease: "none"}, "<1")
                tl.to(networkLogoMask, { opacity: 0, duration: durationL, ease: "none"}, ">1")

                dashTl.to(followingPath1, { strokeDasharray: `40 ${pathLength1}`, willChange: 'transform', force3D: true})
                dashTl.to(followingPath1, { strokeDashoffset: 40, duration: 3, ease: "none", willChange: 'transform', force3D: true}, "<")
                dashTl.to(followingPath2, { strokeDasharray: `40 ${pathLength2}`, willChange: 'transform', force3D: true},"<")
                dashTl.to(followingPath2, { strokeDashoffset: 40, duration: 3, ease: "none", willChange: 'transform', force3D: true}, "<")
                dashTl.to(followingPath3, { strokeDasharray: `40 ${pathLength3}`, willChange: 'transform', force3D: true}, "<")
                dashTl.to(followingPath3, { strokeDashoffset: 40, duration: 3, ease: "none", willChange: 'transform', force3D: true}, "<")
                dashTl.to(followingPath4, { strokeDasharray: `40 ${pathLength4}`, willChange: 'transform', force3D: true}, "<")
                dashTl.to(followingPath4, { strokeDashoffset: 40, duration: 3, ease: "none", willChange: 'transform', force3D: true}, "<")
                dashTl.to(followingPath5, { strokeDasharray: `40 ${pathLength4}`, willChange: 'transform', force3D: true}, "<")
                dashTl.to(followingPath5, { strokeDashoffset: 40, duration: 3, ease: "none", willChange: 'transform', force3D: true}, "<")
                dashTl.to(followingPath6, { strokeDasharray: `40 ${pathLength4}`, willChange: 'transform', force3D: true}, "<")
                dashTl.to(followingPath6, { strokeDashoffset: 40, duration: 3, ease: "none", willChange: 'transform', force3D: true}, "<")

                ScrollTrigger.create({
                    trigger: svgElement,
                    start: "top 80%",
                    onEnter: () => {
                        tl.play();
                        dashTl.play();
                    },
                    onLeave: () => {
                        tl.pause();
                        dashTl.pause();
                    },
                    onEnterBack: () => {
                        tl.play();
                        dashTl.play();
                    },
                    onLeaveBack: () => {
                        tl.pause();
                        dashTl.pause();
                    }, 
                    
                });
            }, 50);
        })
        .catch(error => console.error("Erreur lors du chargement du SVG:", error))
}

function initHomeFeaturesSVG2() {
    let wrapper = document.querySelector('#home-features-svg-2')
    if(wrapper === null) {return}
    
    fetch(wrapper.data)
        .then(response => response.text())
        .then(svgText => {
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
            const svgElement = svgDoc.querySelector('svg');
            svgElement.id = 'home-hero-svg';
            wrapper.replaceWith(svgElement);
            
            setTimeout(() => {
                //let networkLogo = svgElement.querySelector('[filter="url(#filter3_i_2779_27401)"]');
                let networkLogo = {
                    clipPath: svgElement.querySelector('[clip-path="url(#clip0_2864_34569)"]'),
                }
                let networkLogoMask = svgElement.querySelector('[mask="url(#mask0_2864_34569)"]')

                // Créer un tableau avec tous les éléments de terminalLogo
                const networkElements = Object.values(networkLogo).filter(el => el !== null);
                
                let followingPath1 = document.querySelector('[stroke="url(#paint0_linear_2864_34569)"]');
                followingPath1.setAttribute('d', 'M283 284H713');
                let pathLength1 = followingPath1.getTotalLength();

                let followingPath2 = document.querySelector('[stroke="url(#paint1_linear_2864_34569)"]');
                followingPath2.setAttribute('d', 'M734 284L1159 284');
                let pathLength2 = followingPath2.getTotalLength();

                let followingPath3 = document.querySelector('[stroke="url(#paint2_linear_2864_34569)"]');
                followingPath3.setAttribute('d', 'M747 236L1158 236');
                let pathLength3 = followingPath3.getTotalLength();

                let followingPath4 = document.querySelector('[stroke="url(#paint3_linear_2864_34569)"]');
                followingPath4.setAttribute('d', 'M283 236H720');
                let pathLength4 = followingPath3.getTotalLength();

                gsap.set(followingPath1, {strokeDasharray: `0 ${pathLength1}`,strokeDashoffset: 0});
                gsap.set(followingPath2, {strokeDasharray: `0 ${pathLength2}`,strokeDashoffset: -pathLength2});
                gsap.set(followingPath3, {strokeDasharray: `0 ${pathLength3}`,strokeDashoffset: 0});
                gsap.set(followingPath4, {strokeDasharray: `0 ${pathLength3}`,strokeDashoffset: -pathLength4});
                
                let tl = gsap.timeline({paused: true})
                let dashTl = gsap.timeline({paused: true, repeat: -1, yoyo: true})

                tl.from(networkElements, { filter: "grayscale(100%)", opacity: 0.5, duration: durationL, ease: "none"}, 1)
                tl.from(networkLogoMask, { opacity: 0, transformOrigin: "50% 50%", duration: durationL, ease: "none"}, "<1")
                tl.to(networkLogoMask, { opacity: 0, duration: durationL, ease: "none"}, ">1")

                mm.add("(max-width: 479px)", () => {
                  gsap.set(networkElements, {visibility: "hidden"})
                  gsap.set(svgElement.querySelectorAll('[fill="#161616"]'), {visibility: "hidden"})
                  gsap.set(svgElement.querySelectorAll('[fill="#868686"]'), {visibility: "hidden"})
                  gsap.set(svgElement.querySelector('[fill="url(#paint4_linear_2864_34569)"]'), {visibility: "hidden"})
                  gsap.set(svgElement.querySelectorAll('[stroke="#282828"]'), {visibility: "hidden"})
                  gsap.set(svgElement, {rotateZ: -90, scaleY: 2, yPercent: 60})
                })

                dashTl.to(followingPath1, { strokeDasharray: `40 ${pathLength1}`, willChange: 'transform', force3D: true}, 2)
                dashTl.to(followingPath1, { strokeDashoffset: -pathLength1, duration: 4, ease: "none", willChange: 'transform', force3D: true}, "<")
                dashTl.to(followingPath2, { strokeDasharray: `40 ${pathLength2}`, willChange: 'transform', force3D: true},"<")
                dashTl.to(followingPath2, { strokeDashoffset: 40, duration: 4, ease: "none", willChange: 'transform', force3D: true}, "<")
                dashTl.to(followingPath3, { strokeDasharray: `40 ${pathLength3}`, willChange: 'transform', force3D: true}, "<")
                dashTl.to(followingPath3, { strokeDashoffset: -pathLength3, duration: 4, ease: "none", willChange: 'transform', force3D: true}, "<")
                dashTl.to(followingPath4, { strokeDasharray: `40 ${pathLength4}`, willChange: 'transform', force3D: true}, "<")
                dashTl.to(followingPath4, { strokeDashoffset: 40, duration: 4, ease: "none", willChange: 'transform', force3D: true}, "<")

                ScrollTrigger.create({
                    trigger: svgElement,
                    start: "top 80%",
                    onEnter: () => {
                        tl.play();
                        dashTl.play();
                    },
                    onLeave: () => {
                        tl.pause();
                        dashTl.pause();
                    },
                    onEnterBack: () => {
                        tl.play();
                        dashTl.play();
                    },
                    onLeaveBack: () => {
                        tl.pause();
                        dashTl.pause();
                    }
                });

            }, 50);
        })
        .catch(error => console.error("Erreur lors du chargement du SVG:", error))
}

function initFooter() {
    let prefooter = document.querySelector('[data-footer="prefooter"]');
    if(prefooter === null) {return}
    let footer = document.querySelector('[data-footer="footer"]');

    let tl = gsap.timeline({
        scrollTrigger: {
         trigger: prefooter,
         start: "top 80%", 
        }
    })

    tl.from(prefooter, {opacity: 0, duration: durationL, ease: "none"})
    tl.from(prefooter, {yPercent: 10, duration: durationL}, "<")
}

document.addEventListener('DOMContentLoaded', function() {
    function initGlobal() {
        relaodBreakpoints();
        initScroller();
        document.fonts.ready.then(() => {
            initHomeHero();
            initHomeFeatures();
            initHomeHeroSVG();
            initHomeHeroSVGMobile();
            initHomeFeaturesSVG1();
            initHomeFeaturesSVG2();
            initFooter();
        })
    }
  
    initGlobal();
})