import React, { Component } from "react";
 
export default class Contact extends Component {
  componentDidMount()
  {
    document.title="Contact"
  }
  render() {
    return (
      <section id="contact" class="contact">
        <div class="container-fluid mt-5" data-aos="fade-up">
          <div class="section-title">
            <h2>Contact</h2>
          </div>
          <div class="row" data-aos="fade-up" data-aos-delay="100">
            <div class="col-lg-6">
              <div class="row">
                <div class="col-md-12">
 
                </div>
                <div class="col-md-6">
                  <div class="info-box mt-4">
                    <i class="bx bx-envelope"></i>
                    <h3>Email Us</h3>
                    <p>
                      <a
                    
                        href="mailto:learntekin@gmail.com"
                      >
                        Email: learntekin@gmail.com
                      </a>
                    </p>{" "}
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="info-box mt-4">
                    <i class="bx bx-phone-call"></i>
                    <h3>Call Us</h3>
                    <p>
                    <a  href="tel: +91-638-242-2474 "> Phone:+91-638-242-2474 </a>
                    </p>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="info-box mt-4">
                  <i class="bi bi-clock flex-shrink-0"></i>
                  <h4>Open Hours:</h4>
                  <p>Mon-Fri: 9AM - 5PM</p>
             
                  </div>
                </div>
                <div class="col-md-6">
                  
                </div>

                
              </div>
            </div>

            
      
              <div class="col-lg-6 mt-4">
            <form action="./contact.php" method="post" role="form" class="php-email-form">
              <div class="row">
                <div class="col-md-6 form-group">
                  <input type="text" name="name" class="form-control" id="name" placeholder="Your Name" required/>
                </div>
                <div class="col-md-6 form-group mt-3 mt-md-0">
                  <input type="email" class="form-control" name="email" id="email" placeholder="Your Email" required/>
                </div>
              </div>
              <div class="form-group mt-3">
                <input type="text" class="form-control" name="subject" id="subject" placeholder="Subject" required/>
              </div>
              <div class="form-group mt-3">
                <textarea class="form-control" name="message" rows="7" placeholder="Message" required></textarea>
              </div>
              <div class="my-3">
                <div class="loading">Loading</div>
                <div class="error-message"></div>
                <div class="sent-message">Your message has been sent. Thank you!</div>
              </div>
              <div class="text-center"><button type="submit">Send Message</button></div>
            </form>
          </div>
            </div>
          </div>
        
      </section>
    );
  }
}
