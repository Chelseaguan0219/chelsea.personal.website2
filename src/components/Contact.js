import { useState,useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import "../App.js";


function Contact() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const formInitialDetails = {
    firstName: "",
    lastName:  "",
    email:  "",
    phone:  "",
    message:  "",
  };
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Send');
  const [status, setStatus] = useState({});

  const onFormUpdate = (category, value) => {
      setFormDetails({
        ...formDetails,
        [category]: value
      })
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setButtonText("Sending...");
  //   try {
  //     //let response = await fetch("/api/contact"
  //     let response = await fetch(`${apiUrl}/api/contact`, { 
  //       method: "POST",
  //       headers: {
  //         'Content-Type': 'application/json;charset=utf-8',
  //       },
  //       body: JSON.stringify(formDetails),
        
  //     });
  //     setButtonText("Send");
  //     let result = await response.json();
  //     console.log("API response:", result);
  //     setFormDetails(formInitialDetails);
  //     if (result.code === 200) {
  //       setStatus({ success: true, message: 'Message sent successfully'});
  //     } 
  //     else {
  //       setStatus({ success: false, message: 'Something went wrong, please try again later.'});
  //     }
  //   } catch (error) {
  //     console.error('Fetch error:', error);
  //     setStatus({ success: false, message: 'Something went wrong, please try again later.'});
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Sending...");
    try {
      let response = await fetch(`${apiUrl}/api/contact`, { 
        method: "POST",
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
           Accept: "application/json",
        },
        body: JSON.stringify(formDetails),
        
      });
      console.log("Raw API response:", response); // Log the raw response
  
      if (response.ok) {
        let result = await response.json(); // Parse JSON only if response is ok
        console.log("Parsed API response:", result); // Log the parsed JSON response
        setButtonText("Send");
        setFormDetails(formInitialDetails);
        if (result.code === 200) {
          setStatus({ success: true, message: 'Message sent successfully'});
        }
      } else {
        console.error("API responded with HTTP", response.status); // Log if API responded with an error status
        setButtonText("Send");
        // setStatus({ success: false, message: `Something went wrong, server responded with ${response.status}`});
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setButtonText("Send");
      // setStatus({ success: false, message: 'Something went wrong, please try again later.'});
    }
  };
  
  
  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <img className={isVisible ? "animate__animated animate__zoomIn" : ""} src={contactImg} alt="Contact Us"/>
              }
            </TrackVisibility>
          </Col>
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <h2>Contact Me</h2>
                <form onSubmit={handleSubmit}>
                  <Row>
                    <Col size={12} sm={6} className="px-1">
                      <input type="text" value={formDetails.firstName} placeholder="First Name" onChange={(e) => onFormUpdate('firstName', e.target.value)} />
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input type="text" value={formDetails.lastName} placeholder="Last Name" onChange={(e) => onFormUpdate('lastName', e.target.value)}/>
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input type="email" value={formDetails.email} placeholder="Email Address" onChange={(e) => onFormUpdate('email', e.target.value)} />
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input type="tel" value={formDetails.phone} placeholder="Phone No." onChange={(e) => onFormUpdate('phone', e.target.value)}/>
                    </Col>
                    <Col size={12} className="px-1">
                      <textarea rows="6" value={formDetails.message} placeholder="Message" onChange={(e) => onFormUpdate('message', e.target.value)}></textarea>
                      <button type="submit"><span>{buttonText}</span></button>
                    </Col>
                    {
                      status.message &&
                      <Row>
                       <p className={status.success === false ? "danger" : "success"}>{status.message}</p>             
                      </Row>
                    }
                  </Row>
                </form>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Contact;


