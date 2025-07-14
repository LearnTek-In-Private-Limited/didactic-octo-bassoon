import React, { Component } from "react";
import { useSpring, animated } from "@react-spring/web";
import "./dashboard.css"; // Custom styles

// Card component using React Spring for animation
const AnimatedCard = ({ children, style }) => {
  return <animated.div style={style} className="dashboard-card">{children}</animated.div>;
};

export default class SuccessDashboard extends Component {
  componentDidMount() {
    document.title = "Success Dashboard";
  }

  render() {
    const successMetrics = [
      { label: "Websites", count: "4+", description: "Successfully delivered websites." },
      { label: "Android Apps", count: "2+", description: "High-quality Android applications." },
      { label: "Happy Clients", count: "2+", description: "Satisfied and loyal clients." },
      { label: "Countries Presence", count: "2+", description: "Spread initially with great stuff." },
      { label: "Happy Customers", count: "100+", description: "Satisfied and Genuine customers." },
      { label: "Placed Students", count: "14+", description: "Students placed in top companies." },
      { label: "Years of Experience", count: "1+", description: "Expertise in the industry." },
      { label: "Live Projects", count: "10+", description: "Active projects running successfully." },
      { label: "Billable Projects", count: "2+", description: "Projects generating revenue." },
      { label: "Non-Billable Projects", count: "20+", description: "Projects evolving with idealogy." },
      { label: "Billable Projects", count: "2+", description: "Projects generating revenue." }
    ];

    return (
      <section id="success-dashboard" className="success-dashboard">
        <div className="container-fluid" style={{ textAlign: "center", color: "black" }}>
          <h2>Our Success Metrics</h2>
          <p>Explore the achievements that define our journey.</p>
          <div className="dashboard-grid">
            {successMetrics.map((metric, index) => (
              <AnimatedMetric key={index} metric={metric} />
            ))}
          </div>
        </div>
      </section>
    );
  }
}

// Animated component with spring effects
const AnimatedMetric = ({ metric }) => {
  const animationProps = useSpring({
    opacity: 1,
    transform: "translateY(0px)",
    from: { opacity: 0, transform: "translateY(20px)" },
    delay: 200 * metric.count.length, // Slightly stagger animation based on count length
    config: { tension: 180, friction: 12 }, // Config for smooth spring effect
  });

  return (
    <AnimatedCard style={animationProps}>
      <div className="card-header">
        <h3>{metric.count}</h3>
      </div>
      <div className="card-body">
        <h4>{metric.label}</h4>
        <p>{metric.description}</p>
      </div>
    </AnimatedCard>
  );
};
