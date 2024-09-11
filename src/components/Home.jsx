import { useEffect, useState } from "react";
import { Expo, gsap } from "gsap";
import "./home.css";

const Home = () => {
  const [counter, setCounter] = useState(0);

  const reveal = () => {
    const t1 = gsap.timeline();

    t1.to(".follow", {
      width: "100%",
      duration: 1.2,
      delay: 0.5,
      ease: Expo.easeInOut,
    })
      .to(".hide", {
        opacity: 0,
        duration: 0.3,
      })
      .to(".hide", {
        display: "none",
        duration: 0,
      }) // Set display to none immediately after opacity animation
      .to(".follow", {
        height: "100%",
        duration: 0.7,
        ease: Expo.easeInOut,
      })
      .to(".home-content", {
        width: "100%",
        duration: 0.7,
        ease: Expo.easeInOut,
      })
      .to(".line", {
        display: "flex",
      })
      .to(".line", {
        opacity: 1,
        duration: 0.01,
        stagger: 0.1,
        ease: Expo.easeInOut,
      })
      .from(".text", {
        y: 100,
        duration: 0.1,
        stagger: 0.1,
        ease: Expo.easeInOut,
      })
      .to(".text", {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: Expo.easeInOut,
      });
  };

  useEffect(() => {
    const count = setInterval(() => {
      setCounter((counter) =>
        counter < 100
          ? counter + 1
          : (clearInterval(count), setCounter(100, reveal()))
      );
    }, 25);

    return () => clearInterval(count);
  }, []);

  return (
    <div className="home">
      <div className="loading">
        <div className="follow"></div>
        <div
          className="progress-bar hide"
          style={{ width: counter + "%" }}></div>
        <p className="count hide">{counter} %</p>
      </div>

      <div className="home-content">
        <div className="line">
          <div className="text">
            <span>&quot;</span>C<span>O</span>DE<span>R</span>
          </div>
        </div>

        <div className="line">
          <div className="text">
            DESI<span>G</span>N <span>A</span>DDICT<span>N</span>
          </div>
        </div>

        <div className="line">
          <div className="text">
            <span>A</span>BST<span>RA</span>CT<span>N</span>
          </div>
        </div>

        <div className="line">
          <div className="text">
            T<span>H</span>INKE<span>R.&quot;</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
