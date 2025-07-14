import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import "../../App.css";
import NAVIE from "./Navbar";
import Sidebar from "./Sidebar/Sidebar";
import { Navigate } from "react-router";


import User from "../User/User";

import { fetchCounts } from "../../components/actions/actions";


import Employer from "../Employer/Employer";
import Internship from "../Internship/Internship";
import Company from "../Company/Company";
import ApplicationForm from "../ApplicationForm/ApplicationForm";

// Create this component like User

class Home extends Component {
  state = {
    isSidebarOpen: false,
  };

  componentDidMount() {
    this.props.fetchCounts();

    this.interval = setInterval(() => {
      this.props.fetchCounts();
    }, 30000);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  toggleSidebar = () => {
    this.setState((prevState) => ({ isSidebarOpen: !prevState.isSidebarOpen }));
  };

  render() {
    const { user } = this.props;
    const { isSidebarOpen } = this.state;

    if (!user) {
      return <Navigate to="/login" />;
    }

    return (
      <>
        <div className="home-layout">
   *       <Helmet>
            <script src="assets/vendor/purecounter/purecounter.js"></script>
            <script src="assets/vendor/aos/aos.js"></script>
            <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
            <script src="assets/vendor/glightbox/js/glightbox.min.js"></script>
            <script src="assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
            <script src="assets/vendor/swiper/swiper-bundle.min.js"></script>
            <script src="assets/vendor/php-email-form/validate.js"></script>
            <script src="assets/js/main.js" type="text/javascript"></script>
          </Helmet>

          <Sidebar isOpen={isSidebarOpen} toggleSidebar={this.toggleSidebar} />
          <NAVIE />

          <div className={`main-content ${isSidebarOpen ? "open" : ""}`}>
            <Route path="/" render={() => <h1>Welcome, Learn TEK In</h1>} />

            <div className="grid-container">
              
            <Switch>
              
              <Route path="/User" component={User} />
              <Route path="/Company" component={Company} />
              <Route path="/Employer" component={Employer} />
              <Route path="/Internship" component={Internship} />
              <Route path="/ApplicationForm" component={ApplicationForm} />
              
              
              
              
            </Switch>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  counts: state.home.counts,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCounts: () => dispatch(fetchCounts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
