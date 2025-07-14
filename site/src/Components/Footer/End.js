import React, { Component } from "react";

export default class End extends Component {
  render() {
    return (
      <div class="container-fluid d-md-flex py-4">
        <div class="me-md-auto text-center text-md-start">
          <div class="copyright">
            ©2023 Learn TEK In, Headquarters: Charlotte, NC |
            <br />
            Branches: Panruti | Villupuram | Cuddalore | Chennai |
          </div>
          <div class="credits">
            <h3> Designed by </h3>
            <a
              className="contact-link"
              target="_blank"
              href="https://www.linkedin.com/company/learntekin"
            >
              <strong> Learn TEK In</strong>
            </a>
          </div>
        </div>
        <div class="social-links text-center text-md-end pt-3 pt-md-0">
          <a
            href="https://www.instagram.com/learntekin"
            target="_blank"
            class="instagram"
          >
            <i class="bx bxl-instagram"></i>
          </a>

          <a
            href="https://www.linkedin.com/groups/14199617/"
            target="_blank"
            class="linkedin"
          >
            <i class="bx bxl-linkedin"></i>
          </a>

          <a
            href="https://www.youtube.com/@learntekindia"
            target="_blank"
            class="youtube"
          >
            <i class="bx bxl-youtube"></i>
          </a>

          <a href="http://wa.me/+916382422474" target="_blank" class="whatsapp">
            <i class="bx bxl-whatsapp"></i>
          </a>

          <a href="https://x.com/LearnTekin" target="_blank" class="twitter">
            <i class="bx bxl-twitter"></i>
          </a>
        </div>
      </div>
    );
  }
}
