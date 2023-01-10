// import React from "react";
// import { createRoot } from 'react-dom/client';

// import Slider from "./react/components/Slider";
import "./assets/styles/reset.css";
import "./assets/styles/desktop-style.css";
import "./assets/styles/tablet-style.css";
import "./assets/styles/mobile-style.css";

import BlackLogo from "./assets/images/logo-black.svg";
import Notification from "./assets/images/notification.svg";
import NoNotification from "./assets/images/no-notification.svg";
import getToken from "./services/getToken";
import api from "./services/api";

// get token if user is connected
localStorage.setItem("unycos-test-token", "token");
const token = getToken();
loadHeader(token);

function loadHeader(token) {
    if (token) {
        // check if user is connected
        let { name, notifications } = api.getUserInfo(token);
        // ensure name doesn't overflow element
        if (name.length > 6) {
            name = name.slice(0, 4) + '...';
        }

        toggleElement("register-link");
        toggleElement("login-link");

        createUserPanel(name, notifications);
        
        toggleClassOnElement("header nav", "disconnected-user");
        toggleClassOnElement("header nav", "connected-user");

        // add user-panel toggle event handler
        const userPanelToggler = document.getElementById("user-panel-toggler");
        userPanelToggler.addEventListener('click', handleUserPanelToggle, true);

        // add whatsapp redirector hover effect
        if (window.matchMedia("(max-width: 480px)").matches) {
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
    }
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
                    <li><a href="http://localhost:9004/mis-cursos">${handleMediaQuery("Tus cursos", "Mis cursos")}</a></li>
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

    if (window.matchMedia("(max-width: 480px)").matches) {
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

function handleMediaQuery(desktopOutput, mobileOutput) {
    return !window.matchMedia("(max-width: 480px)").matches ? desktopOutput : mobileOutput;
}

// render Slider as a react component
/*const container = document.querySelector('.slider-react');
const root = createRoot(container);
root.render(<Slider />);*/