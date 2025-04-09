document.addEventListener("DOMContentLoaded", () => {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    })
  
    // Preloader
    const preloader = document.querySelector(".preloader")
    window.addEventListener("load", () => {
      setTimeout(() => {
        preloader.classList.add("hidden")
      }, 1000)
    })
  
    // Custom cursor
    const cursorDot = document.querySelector(".cursor-dot")
    const cursorOutline = document.querySelector(".cursor-outline")
  
    if (window.matchMedia("(pointer: fine)").matches) {
      document.addEventListener("mousemove", (e) => {
        cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
        cursorOutline.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      })
  
      // Cursor hover effect
      const links = document.querySelectorAll("a, button, .btn, input, textarea")
      links.forEach((link) => {
        link.addEventListener("mouseenter", () => {
          cursorOutline.style.width = "60px"
          cursorOutline.style.height = "60px"
          cursorOutline.style.borderColor = "var(--secondary)"
        })
        link.addEventListener("mouseleave", () => {
          cursorOutline.style.width = "40px"
          cursorOutline.style.height = "40px"
          cursorOutline.style.borderColor = "var(--primary)"
        })
      })
    }
  
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
    const mobileMenu = document.querySelector(".mobile-menu")
    const mobileMenuClose = document.querySelector(".mobile-menu-close")
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")
  
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenuBtn.classList.toggle("active")
      mobileMenu.classList.toggle("active")
      document.body.classList.toggle("no-scroll")
    })
  
    mobileMenuClose.addEventListener("click", () => {
      mobileMenuBtn.classList.remove("active")
      mobileMenu.classList.remove("active")
      document.body.classList.remove("no-scroll")
    })
  
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenuBtn.classList.remove("active")
        mobileMenu.classList.remove("active")
        document.body.classList.remove("no-scroll")
      })
    })
  
    // DOM Elements
    const themeSwitch = document.getElementById("theme-switch")
    const dropArea = document.getElementById("dropArea")
    const fileInput = document.getElementById("file-input")
    const pdfList = document.getElementById("pdf-list")
    const noFilesMessage = document.querySelector(".no-files-message")
    const mergeBtn = document.getElementById("merge-btn")
    const clearBtn = document.getElementById("clear-btn")
    const loadingOverlay = document.getElementById("loading-overlay")
    const successAnimation = document.getElementById("success-animation")
    const fileCount = document.getElementById("file-count")
    const creatorLink = document.getElementById("creator-link")
    const creatorCard = document.getElementById("creator-card")
    const closeCard = document.getElementById("close-card")
    const uploadBtn = document.querySelector(".upload-btn")
  
    // Declare global variables (assuming they are loaded globally)
    let particlesJS
    let gsap
    let PDFLib
    let download
  
    // Initialize particles.js
    if (window.particlesJS) {
      particlesJS = window.particlesJS // Assign the global function to the local variable
      particlesJS("particles-js", {
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: "#6d28d9",
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#000000",
            },
            polygon: {
              nb_sides: 5,
            },
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false,
            },
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#6d28d9",
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "grab",
            },
            onclick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 1,
              },
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
            push: {
              particles_nb: 4,
            },
            remove: {
              particles_nb: 2,
            },
          },
        },
        retina_detect: true,
      })
    }
  
    // State
    let pdfFiles = []
    let animationTimeout
  
    // Theme Toggle
    const themeToggle = document.querySelector(".theme-toggle")
    const body = document.body
  
    // Check for saved theme preference
    if (localStorage.getItem("theme") === "dark") {
      body.classList.add("dark-mode")
    }
  
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode")
  
      if (body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark")
      } else {
        localStorage.setItem("theme", "light")
      }
    })
  
    themeSwitch.addEventListener("change", () => {
      if (themeSwitch.checked) {
        document.body.classList.remove("light-mode")
        document.body.classList.add("dark-mode")
        localStorage.setItem("theme", "dark")
  
        // Update particles color for dark mode
        if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
          window.pJSDom[0].pJS.particles.color.value = "#8b5cf6"
          window.pJSDom[0].pJS.particles.line_linked.color = "#8b5cf6"
          window.pJSDom[0].pJS.fn.particlesRefresh()
        }
      } else {
        document.body.classList.remove("dark-mode")
        document.body.classList.add("light-mode")
        localStorage.setItem("theme", "light")
  
        // Update particles color for light mode
        if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
          window.pJSDom[0].pJS.particles.color.value = "#6d28d9"
          window.pJSDom[0].pJS.particles.line_linked.color = "#6d28d9"
          window.pJSDom[0].pJS.fn.particlesRefresh()
        }
      }
    })
  
    // Load saved theme preference
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      themeSwitch.checked = true
      document.body.classList.remove("light-mode")
      document.body.classList.add("dark-mode")
    } else {
      document.body.classList.add("light-mode")
    }
  
    // Creator Card
    creatorLink.addEventListener("click", () => {
      creatorCard.classList.add("active")
  
      // Add GSAP animation if available
      if (window.gsap) {
        gsap = window.gsap // Assign the global function to the local variable
        gsap.from(".creator-avatar", {
          duration: 0.8,
          y: -50,
          opacity: 0,
          ease: "back.out(1.7)",
          delay: 0.2,
        })
  
        gsap.from(".creator-name", {
          duration: 0.8,
          y: 30,
          opacity: 0,
          ease: "back.out(1.7)",
          delay: 0.4,
        })
  
        gsap.from(".creator-detail", {
          duration: 0.5,
          x: -30,
          opacity: 1,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.6,
        })
      }
    })
  
    closeCard.addEventListener("click", () => {
      creatorCard.classList.remove("active")
    })
  
    // Close creator card when clicking outside
    creatorCard.addEventListener("click", (e) => {
      if (e.target === creatorCard) {
        creatorCard.classList.remove("active")
      }
    })
  
    // File Upload Handlers
    dropArea.addEventListener("dragover", (e) => {
      e.preventDefault()
      dropArea.classList.add("drag-over")
    })
  
    dropArea.addEventListener("dragleave", () => {
      dropArea.classList.remove("drag-over")
    })
  
    dropArea.addEventListener("drop", (e) => {
      e.preventDefault()
      dropArea.classList.remove("drag-over")
  
      const files = Array.from(e.dataTransfer.files).filter((file) => file.type === "application/pdf")
      if (files.length > 0) {
        handleFiles(files)
  
        // Add animation for drop
        const uploadIcon = document.querySelector(".upload-icon")
        if (uploadIcon) {
          uploadIcon.style.transform = "scale(1.2)"
          setTimeout(() => {
            uploadIcon.style.transform = ""
          }, 300)
        }
      }
    })
  
    // MODIFIED: Only make the entire drop area clickable on desktop/larger screens
    // COMPLETELY REMOVE THIS EVENT LISTENER to avoid any conflicts
    // if (window.innerWidth > 768) {
    //   dropArea.addEventListener("click", (e) => {
    //     // Make sure we're not clicking on the upload button itself
    //     if (!e.target.closest('.upload-btn')) {
    //       fileInput.click();
    //     }
    //   });
    // }
  
    // MODIFIED: Make sure the upload button is the ONLY element that triggers the file input
    uploadBtn.addEventListener("click", (e) => {
      e.preventDefault() // Prevent default behavior
      e.stopPropagation() // Stop event from bubbling up
      fileInput.click()
    })
  
    fileInput.addEventListener("change", () => {
      const files = Array.from(fileInput.files)
      if (files.length > 0) {
        handleFiles(files)
      }
    })
  
    // Handle selected files
    function handleFiles(files) {
      files.forEach((file) => {
        if (!pdfFiles.some((f) => f.name === file.name && f.size === file.size)) {
          pdfFiles.push(file)
        }
      })
  
      updatePdfList()
      updateButtonStates()
      updateFileCount()
  
      // Animate the file counter
      const counterElement = document.querySelector(".file-counter")
      if (counterElement) {
        counterElement.style.transform = "scale(1.2)"
        counterElement.style.backgroundColor = "#5b21b6"
  
        setTimeout(() => {
          counterElement.style.transform = ""
          counterElement.style.backgroundColor = ""
        }, 300)
      }
    }
  
    // Update file count
    function updateFileCount() {
      fileCount.textContent = pdfFiles.length
    }
  
    // Update the PDF list UI with animations
    function updatePdfList() {
      pdfList.innerHTML = ""
  
      if (pdfFiles.length === 0) {
        noFilesMessage.style.display = "block"
        return
      }
  
      noFilesMessage.style.display = "none"
  
      pdfFiles.forEach((file, index) => {
        const listItem = document.createElement("li")
        listItem.className = "pdf-item"
        listItem.style.animationDelay = `${index * 0.1}s`
  
        const fileSize = formatFileSize(file.size)
  
        listItem.innerHTML = `
          <div class="pdf-info">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="pdf-icon">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <path d="M9 15v-2h6v2"></path>
            </svg>
            <div class="pdf-details">
              <div class="pdf-name">${file.name}</div>
              <div class="pdf-size">${fileSize}</div>
            </div>
          </div>
          <div class="pdf-actions">
            ${
              index > 0
                ? `
              <button class="move-btn move-up" title="Move Up">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              </button>
            `
                : ""
            }
            ${
              index < pdfFiles.length - 1
                ? `
              <button class="move-btn move-down" title="Move Down">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            `
                : ""
            }
            <button class="remove-btn" title="Remove">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        `
  
        // Add event listeners for buttons
        listItem.addEventListener("animationend", () => {
          listItem.style.opacity = 1
          listItem.style.transform = "translateX(0)"
        })
  
        pdfList.appendChild(listItem)
  
        // Add event listeners after appending to DOM
        const moveUpBtn = listItem.querySelector(".move-up")
        if (moveUpBtn) {
          moveUpBtn.addEventListener("click", () => {
            moveFile(index, index - 1)
          })
        }
  
        const moveDownBtn = listItem.querySelector(".move-down")
        if (moveDownBtn) {
          moveDownBtn.addEventListener("click", () => {
            moveFile(index, index + 1)
          })
        }
  
        const removeBtn = listItem.querySelector(".remove-btn")
        removeBtn.addEventListener("click", () => {
          removeFile(index)
        })
      })
  
      // Add GSAP animations if available
      if (window.gsap) {
        gsap = window.gsap // Assign the global function to the local variable
        gsap.from(".pdf-item", {
          duration: 0.5,
          x: -30,
          opacity: 0,
          stagger: 0.1,
          ease: "power2.out",
        })
      }
    }
  
    // Move file in the list with animation
    function moveFile(fromIndex, toIndex) {
      const file = pdfFiles[fromIndex]
      pdfFiles.splice(fromIndex, 1)
      pdfFiles.splice(toIndex, 0, file)
  
      // Animate the movement
      const items = document.querySelectorAll(".pdf-item")
      if (items[fromIndex] && items[toIndex] && window.gsap) {
        gsap = window.gsap // Assign the global function to the local variable
        const fromItem = items[fromIndex]
        const toItem = items[toIndex]
  
        gsap.to(fromItem, {
          duration: 0.3,
          y: fromIndex > toIndex ? -fromItem.offsetHeight : toItem.offsetHeight,
          ease: "power2.inOut",
          onComplete: () => {
            updatePdfList()
          },
        })
  
        gsap.to(toItem, {
          duration: 0.3,
          y: fromIndex > toIndex ? fromItem.offsetHeight : -toItem.offsetHeight,
          ease: "power2.inOut",
        })
      } else {
        updatePdfList()
      }
    }
  
    // Remove file from the list with animation
    function removeFile(index) {
      const item = document.querySelectorAll(".pdf-item")[index]
  
      if (item && window.gsap) {
        gsap = window.gsap // Assign the global function to the local variable
        gsap.to(item, {
          duration: 0.3,
          x: 100,
          opacity: 0,
          ease: "power2.in",
          onComplete: () => {
            pdfFiles.splice(index, 1)
            updatePdfList()
            updateButtonStates()
            updateFileCount()
          },
        })
      } else {
        pdfFiles.splice(index, 1)
        updatePdfList()
        updateButtonStates()
        updateFileCount()
      }
    }
  
    // Format file size with animation
    function formatFileSize(bytes) {
      if (bytes === 0) return "0 Bytes"
  
      const k = 1024
      const sizes = ["Bytes", "KB", "MB", "GB"]
      const i = Math.floor(Math.log(bytes) / Math.log(k))
  
      return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    }
  
    // Update button states based on file list
    function updateButtonStates() {
      if (pdfFiles.length > 0) {
        mergeBtn.disabled = false
        clearBtn.disabled = false
  
        // Add pulse animation to merge button
        mergeBtn.classList.add("pulse-animation")
        setTimeout(() => {
          mergeBtn.classList.remove("pulse-animation")
        }, 1000)
      } else {
        mergeBtn.disabled = true
        clearBtn.disabled = true
      }
    }
  
    // Add pulse animation class
    const style = document.createElement("style")
    style.textContent = `
      @keyframes pulse-animation {
        0% {
          box-shadow: 0 0 0 0 rgba(109, 40, 217, 0.7);
        }
        70% {
          box-shadow: 0 0 0 10px rgba(109, 40, 217, 0);
        }
        100% {
          box-shadow: 0 0 0 0 rgba(109, 40, 217, 0);
        }
      }
      
      .pulse-animation {
        animation: pulse-animation 1s cubic-bezier(0.24, 0, 0.38, 1) 1;
      }
    `
    document.head.appendChild(style)
  
    // Clear all files with animation
    clearBtn.addEventListener("click", () => {
      const items = document.querySelectorAll(".pdf-item")
  
      if (items.length && window.gsap) {
        gsap = window.gsap // Assign the global function to the local variable
        gsap.to(items, {
          duration: 0.3,
          x: 100,
          opacity: 0,
          stagger: 0.05,
          ease: "power2.in",
          onComplete: () => {
            pdfFiles = []
            updatePdfList()
            updateButtonStates()
            updateFileCount()
          },
        })
      } else {
        pdfFiles = []
        updatePdfList()
        updateButtonStates()
        updateFileCount()
      }
    })
  
    // Merge PDFs with advanced animations
    mergeBtn.addEventListener("click", async () => {
      if (pdfFiles.length === 0) return
  
      try {
        loadingOverlay.classList.remove("hidden")
  
        // Simulate loading for better UX
        await new Promise((resolve) => setTimeout(resolve, 1000))
  
        // Use the correct PDFLib reference from the global scope
        if (!window.PDFLib) {
          throw new Error("PDFLib is not loaded. Please check your script imports.")
        }
        PDFLib = window.PDFLib
        const { PDFDocument } = PDFLib
  
        // Check if PDFLib is available
        if (!PDFDocument) {
          throw new Error("PDF-LIB is not loaded. Please check your script imports.")
        }
  
        const mergedPdf = await PDFDocument.create()
  
        for (const pdfFile of pdfFiles) {
          const fileData = await readFileAsArrayBuffer(pdfFile)
          const pdf = await PDFDocument.load(fileData)
          const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
          copiedPages.forEach((page) => {
            mergedPdf.addPage(page)
          })
        }
  
        const mergedPdfBytes = await mergedPdf.save()
  
        // Create a timestamp for the filename
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
  
        // Hide loading and show success
        loadingOverlay.classList.add("hidden")
        successAnimation.classList.remove("hidden")
  
        // Download the file
        if (typeof download === "undefined") {
          download = (data, filename, contentType) => {
            const blob = new Blob([data], { type: contentType })
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.style.display = "none"
            a.href = url
            a.download = filename
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
            document.body.removeChild(a)
          }
        }
        download(mergedPdfBytes, `merged-pdf-${timestamp}.pdf`, "application/pdf")
  
        // Auto-hide success animation after 2 seconds
        clearTimeout(animationTimeout)
        animationTimeout = setTimeout(() => {
          successAnimation.classList.add("hidden")
        }, 2000)
      } catch (error) {
        console.error("Error merging PDFs:", error)
        loadingOverlay.classList.add("hidden")
        showNotification("Error merging PDFs. Please try again.", "error")
      }
    })
  
    // Read file as ArrayBuffer
    function readFileAsArrayBuffer(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsArrayBuffer(file)
      })
    }
  
    // Show notification with animation
    function showNotification(message, type) {
      const notification = document.createElement("div")
      notification.className = `notification ${type}`
  
      notification.innerHTML = `
        <div class="notification-icon">
          ${
            type === "success"
              ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>`
              : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>`
          }
        </div>
        <div class="notification-content">
          <p>${message}</p>
        </div>
      `
  
      document.body.appendChild(notification)
  
      // Add notification styles
      const notificationStyle = document.createElement("style")
      notificationStyle.textContent = `
        .notification {
          position: fixed;
          bottom: 20px;
          right: 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          border-radius: 8px;
          color: white;
          font-weight: 500;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transform: translateX(100%);
          opacity: 0;
          transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          z-index: 1001;
          max-width: 350px;
        }
        
        .notification.show {
          transform: translateX(0);
          opacity: 1;
        }
        
        .notification.success {
          background-color: var(--success-color);
        }
        
        .notification.error {
          background-color: var(--error-color);
        }
        
        .notification-icon {
          flex-shrink: 0;
        }
        
        .notification-content {
          flex: 1;
        }
      `
      document.head.appendChild(notificationStyle)
  
      // Animate in
      setTimeout(() => {
        notification.classList.add("show")
      }, 10)
  
      // Animate out
      setTimeout(() => {
        notification.classList.remove("show")
        setTimeout(() => {
          document.body.removeChild(notification)
        }, 500)
      }, 4000)
    }
  
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll("button, .upload-btn")
    buttons.forEach((button) => {
      button.addEventListener("click", function (e) {
        if (this.disabled) return
  
        const rect = this.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
  
        const ripple = document.createElement("span")
        ripple.className = "ripple-effect"
        ripple.style.left = `${x}px`
        ripple.style.top = `${y}px`
  
        this.appendChild(ripple)
  
        setTimeout(() => {
          ripple.remove()
        }, 600)
      })
    })
  
    // Add ripple effect styles
    const rippleStyle = document.createElement("style")
    rippleStyle.textContent = `
      button, .upload-btn {
        position: relative;
        overflow: hidden;
      }
      
      .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.4);
        width: 100px;
        height: 100px;
        margin-top: -50px;
        margin-left: -50px;
        animation: ripple 0.6s linear;
        transform: scale(0);
        pointer-events: none;
      }
      
      @keyframes ripple {
        to {
          transform: scale(2.5);
          opacity: 0;
        }
      }
    `
    document.head.appendChild(rippleStyle)
  
    // Initialize animations on page load
    if (window.gsap) {
      gsap = window.gsap // Assign the global function to the local variable
      gsap.from(".app-header", {
        duration: 1,
        y: -50,
        opacity: 0,
        ease: "power3.out",
      })
  
      gsap.from(".intro-section", {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: "power3.out",
        delay: 0.3,
      })
  
      gsap.from(".upload-section", {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: "power3.out",
        delay: 0.5,
      })
  
      gsap.from(".pdf-list-container", {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: "power3.out",
        delay: 0.7,
      })
  
      gsap.from(".action-buttons", {
        duration: 1,
        y: 30,
        opacity: 1,
        ease: "power3.out",
        delay: 0.9,
      })
  
      gsap.from(".app-footer", {
        duration: 1,
        y: 30,
        opacity: 1,
        ease: "power3.out",
        delay: 1.1,
      })
    }
  
    // Back to Top Button
    const backToTopBtn = document.querySelector(".back-to-top")
  
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add("visible")
      } else {
        backToTopBtn.classList.remove("visible")
      }
    })
  
    backToTopBtn.addEventListener("click", (e) => {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        if (this.getAttribute("href") !== "#") {
          e.preventDefault()
          const targetId = this.getAttribute("href")
          const targetElement = document.querySelector(targetId)
  
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 80,
              behavior: "smooth",
            })
          }
        }
      })
    })
  
    // Form Submission
    const contactForm = document.getElementById("contactForm")
    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault()
  
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]')
        const originalText = submitBtn.innerHTML
  
        submitBtn.innerHTML = "<span>Sending...</span>"
        submitBtn.disabled = true
  
        setTimeout(() => {
          submitBtn.innerHTML =
            '<span>Message Sent!</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'
  
          // Reset form
          contactForm.reset()
  
          // Reset button after 3 seconds
          setTimeout(() => {
            submitBtn.innerHTML = originalText
            submitBtn.disabled = false
          }, 3000)
        }, 2000)
      })
    }
  
    // Duplicate clients for infinite scroll effect
    const clientsTrack = document.querySelector(".clients-track")
    if (clientsTrack) {
      const clientLogos = document.querySelectorAll(".client-logo")
      clientLogos.forEach((logo) => {
        const clone = logo.cloneNode(true)
        clientsTrack.appendChild(clone)
      })
    }
  
    // Stat counter animation
    const statNumbers = document.querySelectorAll(".stat-number")
  
    function animateValue(obj, start, end, duration) {
      let startTimestamp = null
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp
        const progress = Math.min((timestamp - startTimestamp) / duration, 1)
        obj.innerHTML = Math.floor(progress * (end - start) + start)
        if (progress < 1) {
          window.requestAnimationFrame(step)
        }
      }
      window.requestAnimationFrame(step)
    }
  
    // Intersection Observer for stat counters
    const observerOptions = {
      threshold: 0.5,
    }
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target
          const endValue = Number.parseInt(target.textContent.replace(/\+/g, ""))
          animateValue(target, 0, endValue, 2000)
          observer.unobserve(target)
        }
      })
    }, observerOptions)
  
    statNumbers.forEach((stat) => {
      observer.observe(stat)
    })
  
    // Parallax effect for hero section
    const heroSection = document.querySelector(".hero")
    if (heroSection) {
      window.addEventListener("scroll", () => {
        const scrollPosition = window.pageYOffset
        heroSection.style.backgroundPositionY = scrollPosition * 0.5 + "px"
      })
    }
  
    // Reveal animations for hero text
    const revealText = document.querySelectorAll(".reveal-text, .reveal-text-delay")
    revealText.forEach((text) => {
      text.style.opacity = "1"
      text.style.transform = "translateY(0)"
    })
  })
  