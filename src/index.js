import React from "react";
import { createRoot } from 'react-dom/client';

import Slider from "./react/components/Slider";
//import general styles
import "./assets/styles/reset.css";
import "./assets/styles/index.css";
// import <header> styles
import "./assets/styles/Header/desktop.css";
import "./assets/styles/Header/tablet.css";
import "./assets/styles/Header/mobile.css";
// import <main> styles
import "./assets/styles/Main/desktop.css";
import "./assets/styles/Main/mobile.css";

// import images
import BlackLogo from "./assets/images/logo-black.svg";
import Notification from "./assets/images/notification.svg";
import NoNotification from "./assets/images/no-notification.svg";
import LikeIcon from "./assets/images/like-icon.svg";
import StarIcon from "./assets/images/star-icon.svg";

import getToken from "./services/getToken";
import api from "./services/api";

// get device type
const deviceType = window.matchMedia("(max-width: 480px)").matches ? "mobile" : "desktop";

// get token if user is connected
localStorage.setItem("unycos-test-token", "token");
const token = getToken();

// load page
loadHeader(token);

function loadHeader(token) {
    // check if user is connected
    const { data } = api.getUserInfo(token);
    // if user is connected
    if (data) {
        // ensure name doesn't overflow element
        if (data.name.length > 6) {
            data.name = data.name.slice(0, 4) + '...';
        }

        // header with connected user doesnt have register link and login link
        toggleElement("register-link");
        toggleElement("login-link");

        createUserPanel(data.name, data.notifications);
        
        toggleClassOnElement("header nav", "disconnected-user");
        toggleClassOnElement("header nav", "connected-user");

        // add user-panel toggle event handler
        const userPanelToggler = document.getElementById("user-panel-toggler");
        userPanelToggler.addEventListener('click', handleUserPanelToggle, true);

        // add whatsapp redirector hover effect
        if (deviceType === "mobile") {
            const whatsappRedirector = document.getElementById("whatsapp-redirector");
            whatsappRedirector.addEventListener("mouseover", () => {
                whatsappRedirector.firstElementChild.style.color = "#C5AF19";
                whatsappRedirector.lastElementChild.style.color = "#C5AF19";
            });
            whatsappRedirector.addEventListener("mouseout", () => {
                whatsappRedirector.firstElementChild.style.color = "#858479";
                whatsappRedirector.lastElementChild.style.color = "#858479";
            });
        }

        loadMain();
    }
}

function loadMain() {
    // render Slider as a react component
    const container = document.querySelector('.slider-react');
    const root = createRoot(container);
    root.render(<Slider />);

    handleLessonsOrHighlights();

    handleMoreCoursesPosition();
    
    handleStudentsRatingPosition();
}

function handleStudentsRatingPosition() {
    const div = document.createElement("div");
    div.setAttribute("id", "students-rating");

    const mobileH3 = "Los estudiantes le dan a Unycos una calificación promedio de 4.7 de 5 estrellas."
    const desktopH3 = "98.7% de valoraciones positivas <span>/ total de 726 valoraciones</span>";

    div.innerHTML = `
        <img src=${outputByDeviceType(StarIcon, LikeIcon)}>
        <h3>${outputByDeviceType(mobileH3, desktopH3)}</h3>
        <h4>100% de garantía de satisfacción. 30 días de garantía de devolución de dinero.</h4>
    `;

    const element = document.querySelector(outputByDeviceType(".highlights", "#comments h2"));
    element.insertAdjacentElement("afterend", div);
}

function handleMoreCoursesPosition() {
    const section = document.createElement("section");
    section.setAttribute("id", "mas-cursos");
    section.innerHTML = `
        <h2>Más cursos</h2>
        <nav>
            <ul>
                <li>
                    <h3>Marcus Cooper<br><span><span>enseña</span> piragüismo</span></h3>
                </li>
                <li>
                    <h3>Ismael Cala<br><span><span>enseña</span> desarrolo personal</span></h3>
                </li>
                <li>
                    <h3>Lewis Amarante<br><span><span>enseña</span> maquillaje</span></h3>
                </li>
            </ul>
        </nav>
    `;

    const element = document.querySelector(outputByDeviceType("#comments", ".lessons"));
    element.insertAdjacentElement("afterend", section);
}

function handleLessonsOrHighlights() {
    toggleClassOnElement("main section:nth-child(10)", 
        outputByDeviceType("highlights", "lessons"));
    insertHtmlOnElement("main section:nth-child(10) h2", 
        outputByDeviceType("Destaques del curso", "Lesson plan"));
    insertHtmlOnElement("main section:nth-child(10) ul li:first-child h3", 
        outputByDeviceType("Bases biomecánicas de la natación", "Presentación"));
    insertHtmlOnElement("main section:nth-child(10) ul li:nth-child(3) h3", 
        outputByDeviceType("Preparación física", "Natación: Aspectos generales"));
    insertHtmlOnElement("main section:nth-child(10) ul li:nth-child(5) h3", 
        outputByDeviceType("Nutrición y suplementos", "Bases biomecânicas de la natación"));
    insertHtmlOnElement("main section:nth-child(10) ul li:nth-child(7) h3", 
        outputByDeviceType("Análisis de competición", "Estilos de natación"));
}

function createUserPanel(name, notifications) {
    insertHtmlOnElement("header ul", `
        <li id="user-panel-toggler">
            <h2>Hola, <span>  ${name}</span></h2>
            <ion-icon name="chevron-down-outline"></ion-icon>
            <ion-icon name="menu-outline"></ion-icon>
            <nav id="user-panel" class="closed">
                <div>
                    <ion-icon name="arrow-back-outline"></ion-icon>
                </div>
                <img class="logo" href="localhost:9004" src="${BlackLogo}">
                <h2>Hola, <span>  ${name}</span></h2>
                <img id="notifications" href="localhost:9004/user/notifications" src="${notifications.length > 0 ? Notification : NoNotification}">
                <div class="dividing-line"></div>
                <ul>
                    <li><a href="http://localhost:9004/panel-de-control">Panel de Control</a></li>
                    <li><a href="http://localhost:9004/mis-cursos">${outputByDeviceType("Mis cursos", "Tus cursos")}</a></li>
                    <li><a href="http://localhost:9004/perfil">Perfil</a></li>
                    <li><a href="http://localhost:9004/ajustes">Ajustes</a></li>
                    <li><a href="http://localhost:9004/cursos">Todos los cursos</a></li>
                    <li><a href="http://localhost:9004/cuenta">Cuenta</a></li>
                    <div class="dividing-line"></div>
                    <li>
                        <h3>Contáctanos por whatsapp</h3>
                        <div id="whatsapp-redirector" href="https://wa.me/34653467360?text=">
                            <ion-icon name="logo-whatsapp"></ion-icon>
                            <a href="https://wa.me/34653467360?text=">+34 653 46 73 60</a>
                        </div>
                    </li>
                    <div class="dividing-line"></div>
                    <li><a href="http://localhost:9004/log-in">Cerrar Sesión</a></li>
                </ul>
            </nav>
        </li>
    `);
}

function handleUserPanelToggle() {
    const userPanel = document.getElementById("user-panel");

    if (deviceType === "mobile") {
        const header = document.querySelector("header");
        const headerShadow = document.getElementById("header-shadow");

        if(userPanel.classList.contains("closed")) {
            userPanel.parentElement.removeEventListener("click", handleUserPanelToggle, true);
            userPanel.classList.toggle("closed");
            userPanel.firstElementChild.firstElementChild.addEventListener("click", handleUserPanelToggle, true);

            header.style.zIndex = "2";
            headerShadow.style.zIndex = "1";
        }
        else {
            userPanel.firstElementChild.firstElementChild.removeEventListener("click", handleUserPanelToggle, true);
            userPanel.classList.toggle("closed");
            userPanel.parentElement.addEventListener("click", handleUserPanelToggle, true);

            setTimeout(200, () => {
                header.style.zIndex = "1";
                headerShadow.style.zIndex = "2";
            });
        }
    }
    else {
        userPanel.classList.toggle("closed")
    }
}

// utils
function toggleElement(elementId) {
    const element = document.getElementById(elementId);
    element.classList.toggle("hidden");
}

function insertHtmlOnElement(selectors, html) {
    const element = document.querySelector(selectors);
    element.innerHTML += html;
};

function toggleClassOnElement(selectors, classList) {
    const element = document.querySelector(selectors);
    element.classList.toggle(classList);
}

function outputByDeviceType(mobileOutput, desktopOutput) {
    return deviceType === "mobile" ? mobileOutput : desktopOutput;
}