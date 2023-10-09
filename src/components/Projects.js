import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import  ProjectCard from "./ProjectCard";
import projImg1 from "../assets/img/project-img1.png";
import projImg2 from "../assets/img/project-img2.jpg";
import projImg3 from "../assets/img/project-img3.png";
import projImg4 from "../assets/img/project-img4.png";
import projImg22 from "../assets/img/project-img22.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import React, { useState } from 'react';

function Projects() {
  const [currentTab, setCurrentTab] = useState("Experience");
  const [currentText, setCurrentText] = useState("During my internship at Snaplogic and 1thing organization, I worked as an automation test writer using Puppeteer to help Snaplogic write end-to-end web automation tests, and as a web developer collaborated with the UX Designer to revamp the 1thing’s website.");
  const handleTabSelect = (key) => {
    setCurrentTab(key);
    
    let newText = "";
    switch(key) {
      case "Experience":
        newText = "During my internship at Snaplogic and 1thing organization, I worked as an automation test writer using Puppeteer to help Snaplogic write end-to-end web automation tests, and as a web developer collaborated with the UX Designer to revamp the 1thing’s website.";
        break;
      case "Projects":
        newText = "This is some sample for the Projects tab.";
        break;
      case "Education":
        newText = "Here is some explanatory text for the Education tab.";
        break;
      default:
        newText = "No text available for this tab.";
    }
    setCurrentText(newText);
  };
  const experienceCard = [
    {
      title: "Web Developer",
      description: "Collaborated with the UX Designer to implement Figma design and revamp the website",
      imgUrl: projImg1,
    },
    {
      title: "Automation Test Writer",
      description: "Researched and implemented Google puppeteer integration testing framework",
      imgUrl: projImg2,
    },
  ];

  const projectCard = [
    {
      title: "A Customized Recommendation Engine for Twitch Resources",
      description: "Developed a full-stack web application for users to search Twitch resources (stream/video/clip) and provide recommendations.",
      imgUrl: projImg3,
    },
    {
      title: "Starlink: React JS-based Starlink Trajectory Visualization",
      description: "Designed and built a geo-location-based real-time satellite tracking dashboard",
      imgUrl: projImg4,
    },
    // {
    //   title: "Automation Test Writer",
    //   description: "Researched and implemented Google puppeteer integration testing framework",
    //   imgUrl: projImg2,
    // },
  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>{currentTab}</h2>
                <p>{currentText}</p>
                {/* <Tab.Container id="projects-tabs" defaultActiveKey="first"> */}
                <Tab.Container 
                id="projects-tabs" 
                defaultActiveKey="Experience"        
                onSelect={(key) => handleTabSelect(key)}
                
              >
                  <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="Experience">Experience</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="Projects">Projects</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="Education">Education</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                    <Tab.Pane eventKey="Experience">
                      <Row >
                        {
                          experienceCard.map((project, index) => {
                            return ( 

                              <Col size={12} sm={2} md={6} key={index}>
                              <ProjectCard {...project} />
                            </Col>                                               
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="Projects">
                    <Row >
                        {
                          projectCard.map((project, index) => {
                            return (
                              <Col size={12} sm={2} md={6}>
                              <ProjectCard
                                {...project}
                                key={index}
                                />
                              </Col>
                            )
                          })
                        }
                      </Row>                    
                      </Tab.Pane>
                    <Tab.Pane eventKey="Education">
                      <Row>
                        <Col size={12} sm={4}>
                          <p>Northeastern University</p>
                        </Col>
                        <Col>
                          <p> Master of Computer Software Engineering GPA: 3.92</p>
                        </Col>
                        <Col>
                          <p>09/2022 - 12/2024</p>
                        </Col>
                        </Row>

                        <Row>
                        <Col size={12} sm={4}>
                          <p>University Of California,Davis <br></br>Dean’s Honor List for the Spring Quarter 2021 term</p>
                        </Col>
                        <Col>
                          <p> Bachelor of Science: Statistics <br></br>GPA: 3.82</p>
                        </Col>                     
                        <Col>
                          <p>09/2020 - 06/2022</p>
                        </Col>
                        </Row>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2}></img>
    </section>
  )
}

export default Projects; 