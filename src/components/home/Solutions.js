import React, { useEffect, useState } from 'react'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

import $ from "jquery"
import "jquery-ui-pack/jquery-ui"

function Banner() {
    const [alerted, setAlerted] = useState("Done ")
    const [countResetabble, setCountResetabble] = useState(0)
    const [counter, setCounter] = useState(0);
    const [txtDisplay, setTxtDisplay] = useState("Technology & design studio")

    var time_taken = 3100;
    var each_after = 5000;

    //start anim status
    const swin = window.innerWidth





    // $('#item').html('counted..: ' + counter)


    // $('#item').animate({ left: width_to_slide }, time_taken, 'easeInQuad');


    const txtChanger = () => {
        if (countResetabble == 1) {
            setTxtDisplay("Stock_djuma")
        } else if (countResetabble == 2) {
            setTxtDisplay("Stock_djuma")
        } else if (countResetabble == 3) {
            setTxtDisplay("Stock_djuma")
        } else if (countResetabble == 4) {
            setTxtDisplay("Stock_djuma")

        } else if (countResetabble == 5) {
            setTxtDisplay("Stock_djuma")
        } else if (countResetabble == 6) {
            setTxtDisplay("Stock_djuma")
        }
    }


    useEffect(() => {
        const interval = setInterval(() => {
            setCounter((prevCounter) => prevCounter + 1);
            txtChanger()
            if (counter % 8 == 0) {
                setCountResetabble((c) => c + 1)
                const slideWidth = $('#item').width()

                const leftPos = swin - slideWidth / 2
                const width_to_slide = swin - slideWidth;
                setAlerted(" reached 5")
                $('#item').css('left', -swin)
                $('#item').animate({ left: width_to_slide }, time_taken, 'easeInOutQuint');


            }
            if (countResetabble == 7) {
                setCountResetabble(0)
            }


        }, 1000);


        // $('#item').animate({left: width_to_slide}, time_taken, 'easeInQuad');

        return () => clearInterval(interval);
    }, [counter]);



    return (
        <div className=" gBanner border border-dark ">
            {/* <div id='slide1'
                style={{ width: "100px", 
                height: "50px", 
                backgroundColor: "#000",

                 color: "#fff" }} className='abs'>Animated</div> */}

            <div className='overlay'>

            </div>
            <h1 id="item"
                style={{ left: -swin }}
                className='bannerTitle  lg_txt_45 md_txt_30 sm_txt_24   sm_mt_100'> {txtDisplay}  </h1>
            <p>
                <button className='btn  bannerMore'>More...</button>
            </p>
        </div>

    )

 


}

export default Banner
